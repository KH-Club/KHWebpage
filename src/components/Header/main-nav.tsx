import { Icons } from "@/components/Header/icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/nav"
import { Link, useLocation } from "react-router-dom"

interface MainNavProps {
	items?: NavItem[]
}

function isActivePath(pathname: string, href: string) {
	if (href === "/") return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav({ items }: MainNavProps) {
	const location = useLocation()

	return (
		<div className="flex min-w-0 items-center gap-6 md:gap-10">
			<Link to="/" className="flex min-w-0 items-center space-x-2">
				<Icons.logo className="h-8 w-8 shrink-0 md:h-6 md:w-6" />
				<span className="truncate font-bold">{siteConfig.name}</span>
			</Link>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex" aria-label="Main navigation">
					{items?.map(
						(item) =>
							item.href && (
								<Link
									key={item.href}
									to={item.href}
									className={cn(
										"flex items-center border-b-2 border-transparent pb-1 text-sm font-medium text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-base lg:text-lg",
										isActivePath(location.pathname, item.href) &&
											"border-blue-600 text-blue-700",
										item.disabled && "cursor-not-allowed opacity-80",
									)}
								>
									{item.title}
								</Link>
							),
					)}
				</nav>
			) : null}
		</div>
	)
}
