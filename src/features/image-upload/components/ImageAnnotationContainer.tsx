"use client";

import { FC, useState, useCallback } from "react";
import clsx from "clsx";
import { ImageSelector } from "./ImageSelector";
import { ImageAnnotation } from "./ImageAnnotation";
import { Marker } from "../types";

interface ImageAnnotatorContainerProps {
  width?: string;
  height?: string;
  className?: string;
}

export const ImageAnnotatorContainer: FC<ImageAnnotatorContainerProps> = ({
  width = "w-[600px]",
  height = "h-[400px]",
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState<Marker[]>([]);

  const handleMarkersChange = useCallback((markers: Marker[]) => {
    setCurrentMarkers(markers);
  }, []);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700",
        width,
        height,
        className,
      )}
    >
      {!imageUrl ? (
        <ImageSelector
          // onImageSelect={handleImageSelect}
          width="w-full" // 親のサイズに合わせる
          height="h-full" // 親のサイズに合わせる
        />
      ) : (
        <ImageAnnotation
          imageUrl={imageUrl}
          onMarkersChange={handleMarkersChange}
          className="w-full h-full" // 親のサイズに合わせる
        />
      )}
    </div>
  );
};

export default ImageAnnotatorContainer;
