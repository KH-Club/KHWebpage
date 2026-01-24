import { ReactElement, ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

interface WrapperProps {
  children: ReactNode
}

/**
 * Custom render function that wraps components with necessary providers
 */
function AllProviders({ children }: WrapperProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from testing library
export * from "@testing-library/react"
export { userEvent } from "@testing-library/user-event"

// Override render with custom render
export { customRender as render }
