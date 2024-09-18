import { SiteHeader } from "@/components/Header/site-header"
import { useRoutes } from "react-router-dom"
import ErrorBoundary from "@/layouts/ErrorBoundary"
import Home from "@/pages/Homepage/page";
import SiteFooter from "@/components/Footer/Footer";
import ActivityPage from "@/pages/Activitypage/page";
import CampPage from "./pages/Camppage/page";
import ContactPage from "./pages/Contactpage/page";
import CampDetailPage from "./pages/CampDetailpage/page";


const routes = [
  { path: "/", element: <Home /> },
  { path: "/activity", element: <ActivityPage /> },
  { path: "/camp", element: <CampPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/camp/:campID", element: <CampDetailPage /> }
]

function App() {
  const children = useRoutes(routes)

  return (
    <ErrorBoundary>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </ErrorBoundary>
  )
}

export default App
