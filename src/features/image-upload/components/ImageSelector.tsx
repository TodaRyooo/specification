"use client";

import MarkerBlock from "@/features/image-upload/components/MarkerBlock";
import { Marker } from "@/features/image-upload/types/marker";
import { markModeAtom } from "@/lib/jotai/atom";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";

interface ImageSelectorProps {
  width?: string;
  height?: string;
}

// interface MarkerBlockProps {
//   id: number;
//   x: string;
//   y: string;
// }

const ImageSelector: FC<ImageSelectorProps> = ({
  width = "w-fit",
  height = "h-fit",
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const isMarkMode = useAtomValue(markModeAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (image) return;
    inputRef.current?.click();
  }, [image]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImage(url);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleClickAddMarker = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !isMarkMode) return;

      const rect = containerRef.current.getBoundingClientRect();

      const [clX, clY] = [e.clientX, e.clientY];
      const [x, y] = [clX - rect.left, clY - rect.top];

      const newMarker: Marker = { id: markers.length + 1, x, y };

      setMarkers((prev) => [...prev, newMarker]);
    },
    [markers, isMarkMode],
  );

  return (
    <div
      className={clsx(
        "relative border border-white border-solid",
        image ? "w-fit" : width,
        image ? "h-fit" : height,
        !image && "cursor-pointer",
      )}
      onClick={handleClick}
    >
      {markers.length > 0 &&
        markers.map(({ id, x, y }) => (
          <MarkerBlock key={id} id={id} x={x} y={y} />
        ))}

      {image ? (
        <div
          ref={containerRef}
          className="w-full h-full"
          onClick={handleClickAddMarker}
        >
          <img
            src={image}
            alt="selected image"
            draggable={false}
            className="w-full h-full object-contain select-none"
          />
        </div>
      ) : (
        <>
          <p>クリックして画像を選択</p>
          <input
            className="hidden"
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default ImageSelector;
