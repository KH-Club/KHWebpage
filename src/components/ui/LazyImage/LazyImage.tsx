import { memo, useState, ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  aspectRatio?: "square" | "video" | "auto"
  wrapperClassName?: string
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  fallbackSrc = "/camps/homepagebackground.jpg",
  className,
  wrapperClassName,
  aspectRatio = "auto",
  ...props
}: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], wrapperClassName)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  )
})

export default LazyImage
