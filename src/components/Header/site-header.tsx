import { Icons } from "@/components/Header/icons"
import { MainNav } from "@/components/Header/main-nav"
import { buttonVariants } from "@/components/Header/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/nav"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const mobileNavItems: NavItem[] = siteConfig.mainNav

function isActivePath(pathname: string, href: string) {
	if (href === "/") return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setIsMenuOpen(false)
	}, [location.pathname])

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center justify-between gap-3">
				<MainNav items={siteConfig.mainNav} />
				<div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
					<nav
						className="flex items-center space-x-1"
						aria-label="Social links"
					>
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
				<button
					type="button"
					aria-controls="mobile-navigation"
					aria-expanded={isMenuOpen}
					aria-label={
						isMenuOpen ? "Close navigation menu" : "Open navigation menu"
					}
					onClick={() => setIsMenuOpen((current) => !current)}
					className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:hidden"
				>
					{isMenuOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</button>
			</div>
			{isMenuOpen && (
				<div
					id="mobile-navigation"
					className="border-t bg-background md:hidden"
				>
					<div className="container space-y-4 py-4">
						<nav className="grid gap-1" aria-label="Mobile navigation">
							{mobileNavItems.map((item) =>
								item.href ? (
									<Link
										key={item.href}
										to={item.href}
										className={cn(
											"rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
											isActivePath(location.pathname, item.href) &&
												"bg-blue-50 text-blue-700",
											item.disabled && "pointer-events-none opacity-50",
										)}
									>
										{item.title}
									</Link>
								) : null,
							)}
						</nav>
						<div className="flex items-center gap-1 border-t pt-4">
							<Link
								to={siteConfig.links.facebook}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.facebook className="h-5 w-5" />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link
								to={siteConfig.links.instagram}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.instagram className="h-5 w-5" />
								<span className="sr-only">Instagram</span>
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
