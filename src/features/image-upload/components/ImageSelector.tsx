"use client";

import MarkerBlock from "@/features/image-upload/components/MarkerBlock";
import clsx from "clsx";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";

interface ImageSelectorProps {
  width?: string;
  height?: string;
}

const ImageSelector: FC<ImageSelectorProps> = ({
  width = "w-fit",
  height = "h-fit",
}) => {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

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
      {/* {markers.length > 0 && */}
      {/* markers.map(({ id, x, y }) => ( */}
      {/* <MarkerBlock key={id} id={id} x={x} y={y} /> */}
      {/* ))} */}

      <p>クリックして画像を選択</p>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageSelector;
