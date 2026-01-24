import { Icons } from "@/components/Header/icons"
import { MainNav } from "@/components/Header/main-nav"
import { buttonVariants } from "@/components/Header/ui/button"
import { siteConfig } from "@/config/site"
import { Link } from "react-router-dom"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<Link
							to={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.facebook className="h-5 w-5" />
								<span className="sr-only">Facebook</span>
							</div>
						</Link>
						<Link
							to={siteConfig.links.instagram}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.instagram className="h-5 w-5" />
								<span className="sr-only">Instagram</span>
							</div>
						</Link>
					</nav>
				</div>
			</div>
		</header>
	)
}
