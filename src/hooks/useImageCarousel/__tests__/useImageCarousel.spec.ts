import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useImageCarousel } from "../useImageCarousel"

const testImages = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg"
]

describe("useImageCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should initialize with first image", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    expect(result.current.currentIndex).toBe(0)
    expect(result.current.currentImage).toBe(testImages[0])
    expect(result.current.totalImages).toBe(3)
  })

  it("should go to next image", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.next()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(result.current.currentImage).toBe(testImages[1])
  })

  it("should wrap around to first image after last", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.next()
      result.current.next()
      result.current.next()
    })

    expect(result.current.currentIndex).toBe(0)
    expect(result.current.currentImage).toBe(testImages[0])
  })

  it("should go to previous image", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.next()
      result.current.prev()
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it("should wrap around to last image when going prev from first", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.prev()
    })

    expect(result.current.currentIndex).toBe(2)
    expect(result.current.currentImage).toBe(testImages[2])
  })

  it("should go to specific index", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.goTo(2)
    })

    expect(result.current.currentIndex).toBe(2)
    expect(result.current.currentImage).toBe(testImages[2])
  })

  it("should not go to invalid index", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        autoPlay: false
      })
    )

    act(() => {
      result.current.goTo(10)
    })

    expect(result.current.currentIndex).toBe(0)

    act(() => {
      result.current.goTo(-1)
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it("should auto-play and advance images", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        intervalMs: 1000,
        autoPlay: true
      })
    )

    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isPlaying).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.currentIndex).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.currentIndex).toBe(2)
  })

  it("should pause auto-play", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        intervalMs: 1000,
        autoPlay: true
      })
    )

    act(() => {
      result.current.pause()
    })

    expect(result.current.isPlaying).toBe(false)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it("should resume auto-play", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: testImages,
        intervalMs: 1000,
        autoPlay: false
      })
    )

    expect(result.current.isPlaying).toBe(false)

    act(() => {
      result.current.play()
    })

    expect(result.current.isPlaying).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.currentIndex).toBe(1)
  })

  it("should handle empty images array", () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        images: [],
        autoPlay: false
      })
    )

    expect(result.current.currentIndex).toBe(0)
    expect(result.current.currentImage).toBe("")
    expect(result.current.totalImages).toBe(0)
  })

  it("should reset index when images array changes", () => {
    const { result, rerender } = renderHook(
      ({ images }) => useImageCarousel({ images, autoPlay: false }),
      { initialProps: { images: testImages } }
    )

    act(() => {
      result.current.goTo(2)
    })

    expect(result.current.currentIndex).toBe(2)

    rerender({ images: ["/new1.jpg", "/new2.jpg"] })

    expect(result.current.currentIndex).toBe(0)
  })
})
