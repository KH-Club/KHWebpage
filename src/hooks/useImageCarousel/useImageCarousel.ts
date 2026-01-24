import { useState, useEffect, useCallback, useRef } from "react"

interface UseImageCarouselOptions {
  images: string[]
  intervalMs?: number
  autoPlay?: boolean
}

interface UseImageCarouselReturn {
  currentIndex: number
  currentImage: string
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  isPlaying: boolean
  play: () => void
  pause: () => void
  totalImages: number
}

/**
 * Hook for managing image carousel with auto-play
 */
export function useImageCarousel({
  images,
  intervalMs = 5000,
  autoPlay = true
}: UseImageCarouselOptions): UseImageCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalImages = images.length

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalImages)
  }, [totalImages])

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalImages) % totalImages)
  }, [totalImages])

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index)
    }
  }, [totalImages])

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Handle auto-play interval
  useEffect(() => {
    if (isPlaying && totalImages > 1) {
      intervalRef.current = setInterval(next, intervalMs)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPlaying, intervalMs, next, totalImages])

  // Reset to first image if images array changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  return {
    currentIndex,
    currentImage: images[currentIndex] || "",
    next,
    prev,
    goTo,
    isPlaying,
    play,
    pause,
    totalImages
  }
}

export default useImageCarousel
