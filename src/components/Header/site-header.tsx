import { Icons } from "@/components/Header/icons"
import { MainNav } from "@/components/Header/main-nav"
import { siteConfig } from "@/config/site"
import { useFeatureFlags } from "@/features/featureFlags"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"

function isActivePath(pathname: string, href: string) {
	if (href === "/") return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

const socialLinkClassName =
	"grid size-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

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
		<header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/90 shadow-[0_1px_8px_rgba(15,23,42,0.04)] backdrop-blur-xl">
			<div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 sm:h-[4.5rem] sm:gap-4 sm:px-6 lg:px-8">
				<div className="flex min-w-0 items-center justify-self-start">
					<Link
						to="/"
						className="group flex min-w-0 items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
						onClick={() => setMobileOpen(false)}
					>
						<Icons.logo className="size-9 shrink-0 transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:transform-none sm:size-10" />
						<span className="flex min-w-0 flex-col leading-none">
							<span className="truncate text-sm font-bold tracking-[0.08em] text-slate-950 sm:text-[15px]">
								KAIHOR
							</span>
							<span className="mt-1 hidden truncate text-[11px] font-medium text-slate-500 sm:block">
								ชมรมค่ายหอ
							</span>
						</span>
					</Link>
				</div>

				<div className="hidden justify-self-center md:block">
					<MainNav items={visibleNavItems} showLogo={false} />
				</div>

				<div className="flex items-center justify-end gap-1 justify-self-end">
					<nav
						className="hidden items-center gap-1 md:flex"
						aria-label="Social links"
					>
						<a
							href={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
							className={socialLinkClassName}
						>
							<Icons.facebook className="size-[18px]" />
							<span className="sr-only">Facebook</span>
						</a>
						<a
							href={siteConfig.links.instagram}
							target="_blank"
							rel="noreferrer"
							className={socialLinkClassName}
						>
							<Icons.instagram className="size-[18px]" />
							<span className="sr-only">Instagram</span>
						</a>
					</nav>

					<button
						type="button"
						className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:hidden"
						aria-controls="mobile-navigation"
						aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((open) => !open)}
					>
						{mobileOpen ? (
							<FiX className="size-5" aria-hidden />
						) : (
							<FiMenu className="size-5" aria-hidden />
						)}
					</button>
				</div>
			</div>

			{mobileOpen ? (
				<div
					id="mobile-navigation"
					className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-[0_8px_16px_rgba(15,23,42,0.06)] md:hidden"
				>
					<nav className="flex flex-col gap-1" aria-label="เมนูหลัก">
						{visibleNavItems.map((item) =>
							item.href ? (
								<Link
									key={item.href}
									to={item.href}
									aria-current={
										isActivePath(location.pathname, item.href)
											? "page"
											: undefined
									}
									className={cn(
										"flex min-h-11 items-center rounded-xl px-4 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
										isActivePath(location.pathname, item.href) &&
											"bg-blue-50 font-semibold text-blue-700",
									)}
									onClick={() => setMobileOpen(false)}
								>
									{item.title}
								</Link>
							) : null,
						)}
					</nav>
					<div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
						<a
							href={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
							className={socialLinkClassName}
							onClick={() => setMobileOpen(false)}
						>
							<Icons.facebook className="size-[18px]" />
							<span className="sr-only">Facebook</span>
						</a>
						<a
							href={siteConfig.links.instagram}
							target="_blank"
							rel="noreferrer"
							className={socialLinkClassName}
							onClick={() => setMobileOpen(false)}
						>
							<Icons.instagram className="size-[18px]" />
							<span className="sr-only">Instagram</span>
						</a>
					</div>
				</div>
			) : null}

			{mobileOpen ? (
				<button
					type="button"
					aria-label="ปิดเมนู"
					className="fixed inset-0 top-16 z-[-1] bg-slate-950/20 backdrop-blur-[1px] md:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			) : null}
		</header>
	)
}
