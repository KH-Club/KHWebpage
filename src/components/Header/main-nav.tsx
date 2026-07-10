import { Icons } from "@/components/Header/icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/nav"
import { Link, useLocation } from "react-router-dom"

interface MainNavProps {
	items?: NavItem[]
	showLogo?: boolean
}

function isActivePath(pathname: string, href: string) {
	if (href === "/") return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav({ items, showLogo = true }: MainNavProps) {
	const location = useLocation()

	return (
		<div className="flex min-w-0 items-center gap-6 md:gap-10">
			{showLogo ? (
				<Link to="/" className="flex min-w-0 items-center space-x-2">
					<Icons.logo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
					<span className="truncate font-bold">{siteConfig.name}</span>
				</Link>
			) : null}
			{items?.length ? (
				<nav className="hidden gap-6 md:flex" aria-label="Main navigation">
					{items.map((item) =>
						item.href ? (
							<Link
								key={item.href}
								to={item.href}
								className={cn(
									"flex items-center border-b-2 border-transparent pb-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-base lg:text-lg",
									isActivePath(location.pathname, item.href) &&
										"border-blue-600 text-blue-700",
									item.disabled && "pointer-events-none opacity-50",
								)}
							>
								{item.title}
							</Link>
						) : null,
					)}
				</nav>
			) : null}
		</div>
	)
}
