import {
	memo,
	useState,
	useEffect,
	useRef,
	useCallback,
	ImgHTMLAttributes,
} from "react"
import { cn } from "@/lib/utils"

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	fallbackSrc?: string
	aspectRatio?: "square" | "video" | "auto"
	wrapperClassName?: string
	showLoadingSpinner?: boolean
}

const aspectRatioClasses = {
	square: "aspect-square",
	video: "aspect-video",
	auto: "",
}

export const LazyImage = memo(function LazyImage({
	src,
	alt,
	fallbackSrc = "/camps/homepagebackground.jpg",
	className,
	wrapperClassName,
	aspectRatio = "auto",
	showLoadingSpinner = true,
	...props
}: LazyImageProps) {
	const imgRef = useRef<HTMLImageElement>(null)
	const [imgSrc, setImgSrc] = useState(src)
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	// Check if image is already cached/loaded
	const checkIfLoaded = useCallback(() => {
		const img = imgRef.current
		if (img && img.complete && img.naturalWidth > 0) {
			setIsLoading(false)
		}
	}, [])

	// Reset loading state when src changes
	useEffect(() => {
		setImgSrc(src)
		setIsLoading(true)
		setHasError(false)

		// Check immediately if the image is already cached
		// Use requestAnimationFrame to ensure the img element has updated its src
		requestAnimationFrame(() => {
			checkIfLoaded()
		})
	}, [src, checkIfLoaded])

	// Also check on mount in case the image loads very quickly
	useEffect(() => {
		checkIfLoaded()
	}, [checkIfLoaded])

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
		<div
			className={cn(
				"relative overflow-hidden bg-gray-100",
				aspectRatioClasses[aspectRatio],
				wrapperClassName,
			)}
		>
			{/* Loading Skeleton */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					{/* Shimmer effect */}
					<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

					{/* Loading spinner and icon */}
					{showLoadingSpinner && (
						<div className="flex flex-col items-center gap-2">
							{/* Image icon */}
							<svg
								className="h-10 w-10 text-gray-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							{/* Spinner */}
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
						</div>
					)}
				</div>
			)}

			{/* Actual Image */}
			<img
				ref={imgRef}
				src={imgSrc}
				alt={alt}
				loading="lazy"
				onError={handleError}
				onLoad={handleLoad}
				className={cn(
					"transition-opacity duration-500",
					isLoading ? "opacity-0" : "opacity-100",
					className,
				)}
				{...props}
			/>
		</div>
	)
})

export default LazyImage
