import { SiteHeader } from "@/components/Header/site-header"
import { useRoutes } from "react-router-dom"
import ErrorBoundary from "./layouts/ErrorBoundary"
import Home from "@/pages/Homepage/page";
const routes = [{ path: "/", element: <Home /> }]

function App() {
  const children = useRoutes(routes)

  return (
    <ErrorBoundary>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
    </ErrorBoundary>
  )
}

export default App
