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
		<div className="flex min-w-0 items-center gap-6">
			{showLogo ? (
				<Link to="/" className="flex min-w-0 items-center space-x-2">
					<Icons.logo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
					<span className="truncate font-bold">{siteConfig.name}</span>
				</Link>
			) : null}
			{items?.length ? (
				<nav
					className="hidden items-center gap-1 rounded-full bg-slate-100/80 p-1 md:flex"
					aria-label="Main navigation"
				>
					{items.map((item) => {
						if (!item.href) return null
						const isActive = isActivePath(location.pathname, item.href)

						return (
							<Link
								key={item.href}
								to={item.href}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"relative flex h-9 items-center rounded-full px-4 text-sm font-medium text-slate-600 transition-[background-color,color,box-shadow] duration-200 hover:bg-white/70 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
									isActive &&
										"bg-white font-semibold text-blue-700 shadow-sm after:absolute after:-bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-blue-600",
									item.disabled && "pointer-events-none opacity-50",
								)}
							>
								{item.title}
							</Link>
						)
					})}
				</nav>
			) : null}
		</div>
	)
}
