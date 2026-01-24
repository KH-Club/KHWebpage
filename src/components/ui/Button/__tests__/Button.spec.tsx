import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../Button"

describe("Button component", () => {
  it("should render children text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText("Click me"))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>)

    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("should show loading state", () => {
    render(<Button isLoading>Click me</Button>)

    expect(screen.getByText("Loading...")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("should apply primary variant by default", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-blue-500")
  })

  it("should apply secondary variant", () => {
    render(<Button variant="secondary">Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-gray-200")
  })

  it("should apply ghost variant", () => {
    render(<Button variant="ghost">Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-transparent")
  })

  it("should apply custom className", () => {
    render(<Button className="custom-class">Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("should apply medium size by default", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("px-6", "py-3")
  })

  it("should apply small size", () => {
    render(<Button size="sm">Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("px-4", "py-2")
  })

  it("should apply large size", () => {
    render(<Button size="lg">Click me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("px-8", "py-4")
  })
})
