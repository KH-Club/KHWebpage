import { memo, useMemo } from "react"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { Icons } from "@/components/Header/icons"
import { siteConfig } from "@/config/site"
import { useFeatureFlags } from "@/features/featureFlags"
import type { FeatureFlagKey } from "@/types/featureFlag"

interface FooterLink {
	label: string
	href: string
	featureFlag?: FeatureFlagKey
}

const footerLinks: FooterLink[] = [
	{ label: "หน้าแรก", href: "/" },
	{ label: "เรื่องราวค่าย", href: "/camp" },
	{ label: "แผนที่ความทรงจำ", href: "/map" },
	{
		label: "ข่าวและกิจกรรม",
		href: "/news-activities",
		featureFlag: "news_activities",
	},
	{ label: "ติดต่อเรา", href: "/contact" },
]

const locationUrl = "https://maps.app.goo.gl/yzn4sUwz9ZWhAqzu9"
const email = "khclub.chula@gmail.com"

const SiteFooter = memo(function SiteFooter() {
	const { isEnabled, isLoading } = useFeatureFlags()
	const visibleLinks = useMemo(
		() =>
			footerLinks.filter(
				(link) =>
					!link.featureFlag || (!isLoading && isEnabled(link.featureFlag)),
			),
		[isEnabled, isLoading],
	)
	const currentYear = new Date().getFullYear()

	return (
		<footer className="relative overflow-hidden border-t-2 border-blue-500 bg-[#0B1B2B] text-slate-100">
			<div
				className="pointer-events-none absolute -right-8 top-8 select-none text-[10rem] font-bold leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[14rem]"
				aria-hidden
			>
				KH
			</div>

			<div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1fr] lg:gap-14">
					<section aria-labelledby="footer-brand-heading">
						<Link
							to="/"
							className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B1B2B]"
						>
							<Icons.logo className="size-11 shrink-0" />
							<span className="flex flex-col leading-none">
								<span
									id="footer-brand-heading"
									className="text-base font-bold tracking-[0.08em] text-white"
								>
									KAIHOR
								</span>
								<span className="mt-1.5 text-xs font-medium text-slate-400">
									ชมรมค่ายหอ
								</span>
							</span>
						</Link>

						<p className="mt-5 max-w-md text-pretty text-sm leading-7 text-slate-300 sm:text-base">
							ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย ร่วมเดินทาง
							ลงมือทำ และเติบโตไปกับชุมชนทั่วประเทศไทย
						</p>

						<nav
							className="mt-6 flex items-center gap-2"
							aria-label="โซเชียลมีเดีย"
						>
							<a
								href={siteConfig.links.facebook}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook ของชมรมค่ายหอ"
								className="grid size-11 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-blue-400/70 hover:bg-blue-400/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
							>
								<Icons.facebook className="size-5" aria-hidden />
							</a>
							<a
								href={siteConfig.links.instagram}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram ของชมรมค่ายหอ"
								className="grid size-11 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-blue-400/70 hover:bg-blue-400/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
							>
								<Icons.instagram className="size-5" aria-hidden />
							</a>
						</nav>
					</section>

					<nav aria-labelledby="footer-navigation-heading">
						<h2
							id="footer-navigation-heading"
							className="text-sm font-semibold text-white"
						>
							สำรวจเว็บไซต์
						</h2>
						<ul className="mt-4 flex flex-col gap-1">
							{visibleLinks.map((link) => (
								<li key={link.href}>
									<Link
										to={link.href}
										className="inline-flex min-h-10 items-center rounded-lg py-2 text-sm text-slate-300 transition-colors hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<section aria-labelledby="footer-contact-heading">
						<h2
							id="footer-contact-heading"
							className="text-sm font-semibold text-white"
						>
							ติดต่อชมรม
						</h2>
						<div className="mt-5 flex flex-col gap-5">
							<a
								href={`mailto:${email}`}
								className="group flex items-start gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
							>
								<span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-blue-300">
									<Mail className="size-4" aria-hidden />
								</span>
								<span className="min-w-0">
									<span className="block text-xs font-medium text-slate-400">
										อีเมล
									</span>
									<span className="mt-1 block break-all text-sm text-slate-200 transition-colors group-hover:text-blue-300">
										{email}
									</span>
								</span>
							</a>

							<a
								href={locationUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-start gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
							>
								<span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-blue-300">
									<MapPin className="size-4" aria-hidden />
								</span>
								<span className="min-w-0">
									<span className="flex items-center gap-1 text-xs font-medium text-slate-400">
										ห้องชมรม
										<ArrowUpRight className="size-3" aria-hidden />
									</span>
									<span className="mt-1 block max-w-sm text-sm leading-6 text-slate-200 transition-colors group-hover:text-blue-300">
										ชั้น 2 โรงอาหารหอพักนิสิต จุฬาลงกรณ์มหาวิทยาลัย
									</span>
								</span>
							</a>
						</div>
					</section>
				</div>

				<div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
					<p>© {currentYear} KaiHor Club. สงวนลิขสิทธิ์</p>
					<p>ค่ายอาสา · ความทรงจำ · การเติบโต</p>
				</div>
			</div>
		</footer>
	)
})

export default SiteFooter
