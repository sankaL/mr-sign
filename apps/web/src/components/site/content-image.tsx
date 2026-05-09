import type { GeneratedImageAsset } from "@mrsign/content";
import Image from "next/image";

type ContentImageProps = {
  asset: GeneratedImageAsset;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ContentImage({
  asset,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ContentImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={asset.path}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
