import { SiteHeader } from "@/components/Header/site-header"
import { useRoutes } from "react-router-dom"
import ErrorBoundary from "./layouts/ErrorBoundary"
import Home from "@/pages/Homepage/page";
import SiteFooter from "./components/Footer/Footer";
const routes = [
  { path: "/", element: <Home /> },
  { path: "/about" , element : <></>},
  { path: "/camp" , element : <></>}
]

function App() {
  const children = useRoutes(routes)

  return (
    <ErrorBoundary>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter/>
      </div>
    </ErrorBoundary>
  )
}

export default App
