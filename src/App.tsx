import { lazy, Suspense } from "react"
import { SiteHeader } from "@/components/Header/site-header"
import { useRoutes } from "react-router-dom"
import ErrorBoundary from "@/layouts/ErrorBoundary"
import SiteFooter from "@/components/Footer/Footer"

// Lazy load pages for better performance (code splitting)
const Home = lazy(() => import("@/pages/Homepage/page"))
const ActivityPage = lazy(() => import("@/pages/Activitypage/page"))
const CampPage = lazy(() => import("@/pages/Camppage/page"))
const ContactPage = lazy(() => import("@/pages/Contactpage/page"))
const CampDetailPage = lazy(() => import("@/pages/CampDetailpage/page"))

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
)

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
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
        <SiteHeader />
        <main className="w-full max-w-full flex-1">
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </main>
        <SiteFooter />
      </div>
    </ErrorBoundary>
  )
}

export default App
