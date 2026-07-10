import {
	CSSProperties,
	MouseEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import { createPortal } from "react-dom"
import {
	ArrowRight,
	Calendar,
	ChevronLeft,
	ChevronRight,
	GraduationCap,
	MapPin,
	MessageCircle,
	Quote,
	X,
} from "lucide-react"
import { LazyImage } from "@/components/ui"
import { useAlumniStudentVoices } from "@/hooks"
import { cn } from "@/lib/utils"
import { AlumniStudentVoice } from "@/types/alumniStudentVoice"

const enterStyle = (delayMs: number): CSSProperties => ({
	animationDelay: `${delayMs}ms`,
})

const getInitials = (name: string) => {
	const words = name.trim().split(/\s+/).filter(Boolean)

	if (words.length > 1) {
		return words
			.slice(0, 2)
			.map((word) => word[0])
			.join("")
	}

	return name.trim().slice(0, 2)
}

const getStoryContext = (voice: AlumniStudentVoice) => {
	const role = voice.role ? `จากบทบาท ${voice.role}` : "จากการร่วมเดินทาง"
	const moment = voice.campYear ? `ใน ${voice.campYear}` : "กับค่ายหอ"

	return `${role} ${moment} ความทรงจำของ ${voice.name} ยังเดินทางต่อผ่านผู้คน งานอาสา และบทเรียนที่เกิดขึ้นระหว่างทาง เรื่องเล่านี้คือร่องรอยเล็ก ๆ ของการลงมือทำที่ยังชัดเจน แม้วันค่ายจะจบลงแล้ว`
}

const CampVoicesAtmosphere = memo(function CampVoicesAtmosphere() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
			<Quote className="absolute -right-10 top-16 h-56 w-56 rotate-6 text-[#2478A8]/[0.045] sm:h-72 sm:w-72" />
			<Quote className="absolute -left-16 bottom-8 h-44 w-44 -rotate-12 text-[#69B7D9]/[0.045]" />
			<svg
				viewBox="0 0 1200 520"
				preserveAspectRatio="none"
				className="absolute inset-x-0 top-[18%] h-[68%] w-full opacity-[0.17]"
			>
				<path
					d="M-30 330 C120 190 230 420 390 275 S650 90 780 240 S1000 390 1230 135"
					fill="none"
					stroke="#69B7D9"
					strokeWidth="1.5"
					strokeDasharray="5 10"
				/>
				{[
					[142, 252],
					[388, 276],
					[779, 240],
					[1048, 316],
				].map(([cx, cy]) => (
					<circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#2478A8" />
				))}
			</svg>
		</div>
	)
})

const CampVoicesHeader = memo(function CampVoicesHeader() {
	return (
		<header
			className="camp-voice-enter grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)]"
			style={enterStyle(0)}
		>
			<div>
				<div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#2478A8]">
					<MessageCircle className="h-4 w-4" strokeWidth={1.8} aria-hidden />
					<span>CAMP VOICES</span>
				</div>
				<h2
					id="camp-voices-heading"
					className="mt-4 max-w-4xl text-balance text-[clamp(2.35rem,5vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#102033]"
				>
					เสียงที่ยังอยู่หลังค่ายจบ
				</h2>
			</div>
			<p className="max-w-[44rem] text-pretty text-base leading-8 text-[#334B5F] sm:text-lg">
				เรื่องเล่าจากคนที่เคยร่วมเดินทาง ลงมือทำ และเติบโตไปกับค่ายหอ
			</p>
		</header>
	)
})

interface VoicePortraitProps {
	voice: AlumniStudentVoice
	variant: "featured" | "compact" | "modal"
}

const VoicePortrait = memo(function VoicePortrait({
	voice,
	variant,
}: VoicePortraitProps) {
	const isCompact = variant === "compact"
	const wrapperClassName = isCompact
		? "h-12 w-12 shrink-0 rounded-full ring-1 ring-[#A7CEE5]"
		: variant === "modal"
			? "h-[32svh] min-h-[220px] max-h-[300px] w-full sm:h-full sm:max-h-none sm:min-h-[38rem] sm:rounded-none"
			: "aspect-[4/5] h-full min-h-[22rem] w-full rounded-[22px] sm:min-h-[28rem]"

	if (voice.image) {
		return (
			<LazyImage
				src={voice.image}
				alt={voice.imageAlt}
				wrapperClassName={wrapperClassName}
				className="h-full w-full object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
			/>
		)
	}

	if (isCompact) {
		return (
			<div
				role="img"
				aria-label={`อวาตาร์สำรองของ ${voice.name}`}
				className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2478A8] to-[#159A9C] text-sm font-semibold text-white ring-2 ring-white"
				data-testid="camp-voice-fallback-avatar"
			>
				<span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/15" />
				{getInitials(voice.name)}
			</div>
		)
	}

	return (
		<div
			role="img"
			aria-label={`อวาตาร์สำรองของ ${voice.name}`}
			className={cn(
				"relative flex overflow-hidden bg-gradient-to-br from-[#0E4F79] via-[#2478A8] to-[#159A9C] text-white",
				wrapperClassName,
			)}
			data-testid="camp-voice-fallback-avatar"
		>
			<div className="absolute right-[-18%] top-[-10%] h-[52%] w-[52%] rounded-full border border-white/20" />
			<div className="absolute bottom-[-15%] left-[-12%] h-[48%] w-[48%] rounded-full bg-white/10" />
			<Quote className="absolute right-[9%] top-[8%] h-12 w-12 text-white/20" />
			<div className="relative m-auto text-center">
				<span className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
					{getInitials(voice.name)}
				</span>
				<p className="mt-3 text-xs font-medium tracking-[0.15em] text-white/70">
					CAMP MEMORY
				</p>
			</div>
		</div>
	)
})

interface VoiceCardProps {
	voice: AlumniStudentVoice
	onOpen: () => void
}

const FeaturedVoiceCard = memo(function FeaturedVoiceCard({
	voice,
	onOpen,
}: VoiceCardProps) {
	return (
		<article
			className="camp-voice-enter group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/[0.78] shadow-[0_22px_60px_-42px_rgba(14,79,121,0.65)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#A7CEE5] hover:shadow-[0_28px_70px_-40px_rgba(14,79,121,0.72)]"
			style={enterStyle(120)}
		>
			<button
				type="button"
				onClick={onOpen}
				aria-label={`เปิดเรื่องราวของ ${voice.name}`}
				className="grid w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2478A8] md:grid-cols-[minmax(17rem,0.82fr)_minmax(0,1.18fr)]"
			>
				<div className="p-3 sm:p-4 md:p-5 md:pr-0">
					<VoicePortrait voice={voice} variant="featured" />
				</div>

				<div className="relative flex min-h-full flex-col justify-between overflow-hidden px-6 pb-7 pt-8 sm:px-9 sm:pb-10 md:p-12 lg:px-16">
					<Quote className="absolute -right-5 top-1 h-40 w-40 text-[#2478A8]/[0.055] transition-colors duration-300 group-hover:text-[#2478A8]/[0.1]" />
					<div className="relative">
						<p className="text-xs font-semibold tracking-[0.16em] text-[#2478A8]">
							เรื่องเด่นจากค่าย
						</p>
						<blockquote className="mt-6 max-w-[18ch] text-balance text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.3] tracking-[-0.025em] text-[#102033]">
							“{voice.quote}”
						</blockquote>
					</div>

					<div className="relative mt-10 border-t border-[#D7E6EF] pt-6">
						<div className="flex flex-wrap items-end justify-between gap-5">
							<div>
								<h3 className="text-xl font-semibold text-[#102033] sm:text-2xl">
									{voice.name}
								</h3>
								<p className="mt-1 text-sm font-medium text-[#2478A8]">
									{voice.role}
								</p>
								<p className="mt-2 text-sm leading-6 text-[#526A7C]">
									{[voice.relation, voice.campYear].filter(Boolean).join(" · ")}
								</p>
							</div>
							<span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0E4F79] px-5 text-sm font-semibold text-white">
								อ่านเรื่องราว
								<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
							</span>
						</div>
					</div>
				</div>
			</button>
		</article>
	)
})

const CompactVoiceCard = memo(function CompactVoiceCard({
	voice,
	onOpen,
	index,
}: VoiceCardProps & { index: number }) {
	return (
		<article
			className="camp-voice-enter group relative overflow-hidden rounded-[24px] border border-white/80 bg-white/[0.82] shadow-[0_16px_42px_-36px_rgba(14,79,121,0.75)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#A7CEE5] hover:shadow-[0_24px_50px_-34px_rgba(14,79,121,0.72)]"
			style={enterStyle(210 + index * 80)}
		>
			<button
				type="button"
				onClick={onOpen}
				aria-label={`เปิดเรื่องราวของ ${voice.name}`}
				className="relative flex h-full min-h-[18rem] w-full flex-col p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2478A8] sm:p-8"
			>
				<Quote className="absolute right-4 top-3 h-20 w-20 text-[#2478A8]/[0.045] transition-colors duration-300 group-hover:text-[#2478A8]/[0.09]" />
				<blockquote className="relative max-w-[25ch] text-pretty text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.45] tracking-[-0.02em] text-[#102033]">
					“{voice.quote}”
				</blockquote>

				<div className="relative mt-auto flex items-end justify-between gap-4 border-t border-[#D7E6EF] pt-6">
					<div className="flex min-w-0 items-center gap-3">
						<VoicePortrait voice={voice} variant="compact" />
						<div className="min-w-0">
							<h3 className="truncate text-lg font-semibold text-[#102033]">
								{voice.name}
							</h3>
							<p className="mt-0.5 truncate text-sm text-[#526A7C]">
								{[voice.relation, voice.role, voice.campYear]
									.filter(Boolean)
									.join(" · ")}
							</p>
						</div>
					</div>
					<span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#A7CEE5] text-[#0E4F79] transition-colors group-hover:border-[#2478A8] group-hover:bg-[#EAF5FF]">
						<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</span>
				</div>
			</button>
		</article>
	)
})

interface StoryModalProps {
	voices: AlumniStudentVoice[]
	selectedIndex: number | null
	onClose: () => void
	onPrevious: () => void
	onNext: () => void
}

const StoryModal = memo(function StoryModal({
	voices,
	selectedIndex,
	onClose,
	onPrevious,
	onNext,
}: StoryModalProps) {
	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const voice = selectedIndex === null ? undefined : voices[selectedIndex]

	useEffect(() => {
		if (!voice) return

		const previousActive = document.activeElement as HTMLElement | null
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		closeButtonRef.current?.focus()

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose()
			if (event.key === "ArrowLeft") onPrevious()
			if (event.key === "ArrowRight") onNext()
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = previousOverflow
			previousActive?.focus()
		}
	}, [onClose, onNext, onPrevious, voice])

	if (!voice || selectedIndex === null || typeof document === "undefined") {
		return null
	}

	const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) onClose()
	}

	return createPortal(
		<div
			role="presentation"
			onMouseDown={handleBackdropClick}
			className="camp-voice-modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#071D2C]/65 backdrop-blur-sm sm:items-center sm:p-6"
		>
			<section
				role="dialog"
				aria-modal="true"
				aria-label={`เรื่องราวของ ${voice.name}`}
				className="camp-voice-modal relative grid h-[100svh] w-full overflow-hidden bg-[#F7FBFD] shadow-2xl sm:max-h-[min(90vh,50rem)] sm:w-[min(94vw,66rem)] sm:rounded-[28px] md:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]"
			>
				<div className="group relative overflow-hidden md:min-h-[38rem]">
					<VoicePortrait voice={voice} variant="modal" />
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071D2C]/45 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#071D2C]/10" />
				</div>

				<div className="relative min-h-0 overflow-y-auto px-6 pb-24 pt-8 sm:px-10 sm:pb-28 sm:pt-10 md:px-12">
					<Quote className="absolute right-5 top-3 h-28 w-28 text-[#2478A8]/[0.055]" />
					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						aria-label="ปิดเรื่องราว"
						className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/85 text-[#334B5F] shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-[#102033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
					>
						<X className="h-5 w-5" aria-hidden />
					</button>

					<p className="relative text-xs font-semibold tracking-[0.16em] text-[#2478A8]">
						เสียงจากเจ้าของเรื่อง
					</p>
					<h2
						id={`camp-story-title-${voice.id}`}
						className="relative mt-3 text-3xl font-bold tracking-[-0.03em] text-[#102033] sm:text-4xl"
					>
						{voice.name}
					</h2>
					<blockquote className="relative mt-7 text-pretty text-2xl font-semibold leading-[1.45] tracking-[-0.02em] text-[#102033] sm:text-3xl">
						“{voice.quote}”
					</blockquote>
					<p className="mt-7 max-w-[65ch] text-pretty text-[15px] leading-8 text-[#334B5F] sm:text-base">
						{getStoryContext(voice)}
					</p>

					<dl className="mt-8 space-y-3 border-y border-[#D7E6EF] py-6 text-sm">
						{voice.role ? (
							<div className="flex items-start gap-3">
								<GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
								<div>
									<dt className="text-[#526A7C]">บทบาท</dt>
									<dd className="mt-0.5 font-medium text-[#102033]">
										{voice.role}
									</dd>
								</div>
							</div>
						) : null}
						{voice.campYear ? (
							<div className="flex items-start gap-3">
								<Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
								<div>
									<dt className="text-[#526A7C]">ช่วงเวลาค่าย</dt>
									<dd className="mt-0.5 font-medium text-[#102033]">
										{voice.campYear}
									</dd>
								</div>
							</div>
						) : null}
						{voice.relation ? (
							<div className="flex items-start gap-3">
								<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
								<div>
									<dt className="text-[#526A7C]">ความเกี่ยวข้อง</dt>
									<dd className="mt-0.5 font-medium text-[#102033]">
										{voice.relation}
									</dd>
								</div>
							</div>
						) : null}
					</dl>

					<div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#D7E6EF] bg-[#F7FBFD]/95 px-5 py-4 backdrop-blur-md sm:px-8">
						<button
							type="button"
							onClick={onPrevious}
							className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#0E4F79] transition hover:bg-[#EAF5FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
						>
							<ChevronLeft className="h-4 w-4" aria-hidden />
							เรื่องก่อนหน้า
						</button>
						<span className="text-xs font-medium tabular-nums text-[#526A7C]">
							{selectedIndex + 1} / {voices.length}
						</span>
						<button
							type="button"
							onClick={onNext}
							className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#0E4F79] transition hover:bg-[#EAF5FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
						>
							เรื่องถัดไป
							<ChevronRight className="h-4 w-4" aria-hidden />
						</button>
					</div>
				</div>
			</section>
		</div>,
		document.body,
	)
})

const CampVoicesLoading = memo(function CampVoicesLoading() {
	return (
		<div className="space-y-5" aria-label="Loading camp voices">
			<div className="grid min-h-[32rem] animate-pulse overflow-hidden rounded-[28px] border border-white/80 bg-white/70 md:grid-cols-[0.82fr_1.18fr]">
				<div className="m-5 rounded-[22px] bg-[#DCEAF2]" />
				<div className="space-y-5 px-8 py-12">
					<div className="h-3 w-28 rounded bg-[#DCEAF2]" />
					<div className="h-8 w-4/5 rounded bg-[#DCEAF2]" />
					<div className="h-8 w-3/5 rounded bg-[#DCEAF2]" />
				</div>
			</div>
			<div className="grid gap-5 md:grid-cols-2">
				{[0, 1].map((item) => (
					<div
						key={item}
						className="h-64 animate-pulse rounded-[24px] border border-white/80 bg-white/70 p-8"
					>
						<div className="h-6 w-4/5 rounded bg-[#DCEAF2]" />
						<div className="mt-4 h-6 w-2/3 rounded bg-[#DCEAF2]" />
					</div>
				))}
			</div>
		</div>
	)
})

const CampVoices = memo(function CampVoices() {
	const { voices, isLoading, error } = useAlumniStudentVoices()
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const closeStory = useCallback(() => setSelectedIndex(null), [])
	const showPreviousStory = useCallback(() => {
		setSelectedIndex((current) => {
			if (current === null || voices.length === 0) return current
			return (current - 1 + voices.length) % voices.length
		})
	}, [voices.length])
	const showNextStory = useCallback(() => {
		setSelectedIndex((current) => {
			if (current === null || voices.length === 0) return current
			return (current + 1) % voices.length
		})
	}, [voices.length])

	return (
		<section
			id="camp-voices-section"
			aria-labelledby="camp-voices-heading"
			className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F9FCFE_0%,#EDF7FC_48%,#F8FCFE_100%)] py-20 sm:py-24 lg:py-32"
		>
			<CampVoicesAtmosphere />
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
				<CampVoicesHeader />

				<div className="mt-12 sm:mt-16">
					{isLoading ? (
						<CampVoicesLoading />
					) : error ? (
						<div className="rounded-[20px] border border-red-100 bg-white/75 p-6 text-center text-red-700 shadow-sm">
							ไม่สามารถโหลดเสียงจากค่ายได้ในขณะนี้
						</div>
					) : voices.length === 0 ? (
						<div className="rounded-[20px] border border-[#D7E6EF] bg-white/75 p-8 text-center text-[#526A7C] shadow-sm">
							ยังไม่มีเสียงจากค่ายที่เผยแพร่
						</div>
					) : (
						<>
							<FeaturedVoiceCard
								voice={voices[0]}
								onOpen={() => setSelectedIndex(0)}
							/>

							{voices.length > 1 ? (
								<div className="mt-5 grid gap-5 md:grid-cols-2">
									{voices.slice(1).map((voice, index) => (
										<CompactVoiceCard
											key={voice.id}
											voice={voice}
											index={index}
											onOpen={() => setSelectedIndex(index + 1)}
										/>
									))}
								</div>
							) : null}

							<div
								className="camp-voice-enter mt-10 flex items-center gap-5"
								style={enterStyle(390)}
							>
								<div className="h-px flex-1 bg-[#BFD9EB]" />
								<button
									type="button"
									onClick={() => setSelectedIndex(0)}
									className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#A7CEE5] bg-white/75 px-5 text-sm font-semibold text-[#0E4F79] transition hover:border-[#2478A8] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
								>
									ดูเรื่องเล่าทั้งหมด
									<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
								</button>
							</div>
						</>
					)}
				</div>
			</div>

			<StoryModal
				voices={voices}
				selectedIndex={selectedIndex}
				onClose={closeStory}
				onPrevious={showPreviousStory}
				onNext={showNextStory}
			/>
		</section>
	)
})

export default CampVoices
