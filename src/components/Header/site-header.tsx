import { Icons } from "@/components/Header/icons"
import { MainNav } from "@/components/Header/main-nav"
import { buttonVariants } from "@/components/Header/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useFeatureFlags } from "@/features/featureFlags"
import { useEffect, useMemo, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"

function isActivePath(pathname: string, href: string) {
	if (href === "/") return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const location = useLocation()
	const { isEnabled, isLoading } = useFeatureFlags()
	const visibleNavItems = useMemo(
		() =>
			siteConfig.mainNav.filter(
				(item) =>
					!item.featureFlag || (!isLoading && isEnabled(item.featureFlag)),
			),
		[isEnabled, isLoading],
	)

	useEffect(() => {
		setMobileOpen(false)
	}, [location.pathname])

	return (
		<header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-background/95 backdrop-blur-md">
			<div className="container flex h-14 items-center justify-between gap-3 sm:h-16">
				<div className="flex min-w-0 items-center gap-3">
					<Link
						to="/"
						className="flex min-w-0 items-center gap-2"
						onClick={() => setMobileOpen(false)}
					>
						<Icons.logo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
						<span className="truncate text-base font-bold text-slate-900 sm:text-lg">
							{siteConfig.name}
						</span>
					</Link>
					<div className="hidden md:block">
						<MainNav items={visibleNavItems} showLogo={false} />
					</div>
				</div>

				<nav
					className="hidden items-center space-x-1 md:flex"
					aria-label="Social links"
				>
					<Link to={siteConfig.links.facebook} target="_blank" rel="noreferrer">
						<div className={buttonVariants({ size: "icon", variant: "ghost" })}>
							<Icons.facebook className="h-5 w-5" />
							<span className="sr-only">Facebook</span>
						</div>
					</Link>
					<Link
						to={siteConfig.links.instagram}
						target="_blank"
						rel="noreferrer"
					>
						<div className={buttonVariants({ size: "icon", variant: "ghost" })}>
							<Icons.instagram className="h-5 w-5" />
							<span className="sr-only">Instagram</span>
						</div>
					</Link>
				</nav>

				<button
					type="button"
					className="grid h-11 w-11 place-items-center rounded-2xl text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
					aria-controls="mobile-navigation"
					aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
					aria-expanded={mobileOpen}
					onClick={() => setMobileOpen((open) => !open)}
				>
					{mobileOpen ? (
						<FiX className="h-5 w-5" aria-hidden />
					) : (
						<FiMenu className="h-5 w-5" aria-hidden />
					)}
				</button>
			</div>

			{mobileOpen ? (
				<div
					id="mobile-navigation"
					className="border-t border-slate-100 bg-white p-4 shadow-lg md:hidden"
				>
					<nav className="flex flex-col gap-1" aria-label="เมนูหลัก">
						{visibleNavItems.map((item) =>
							item.href ? (
								<Link
									key={item.href}
									to={item.href}
									className={cn(
										"flex min-h-11 items-center rounded-2xl px-3 text-base font-medium text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
										isActivePath(location.pathname, item.href) &&
											"bg-blue-50 text-blue-700",
									)}
									onClick={() => setMobileOpen(false)}
								>
									{item.title}
								</Link>
							) : null,
						)}
					</nav>
					<div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
						<Link
							to={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
							className="grid h-11 w-11 place-items-center rounded-2xl hover:bg-slate-50"
							onClick={() => setMobileOpen(false)}
						>
							<Icons.facebook className="h-5 w-5" />
							<span className="sr-only">Facebook</span>
						</Link>
						<Link
							to={siteConfig.links.instagram}
							target="_blank"
							rel="noreferrer"
							className="grid h-11 w-11 place-items-center rounded-2xl hover:bg-slate-50"
							onClick={() => setMobileOpen(false)}
						>
							<Icons.instagram className="h-5 w-5" />
							<span className="sr-only">Instagram</span>
						</Link>
					</div>
				</div>
			) : null}

			{mobileOpen ? (
				<button
					type="button"
					aria-label="ปิดเมนู"
					className="fixed inset-0 top-14 z-[-1] bg-slate-900/20 md:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			) : null}
		</header>
	)
}
