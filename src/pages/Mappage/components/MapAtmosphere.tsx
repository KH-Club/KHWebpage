import { memo } from "react"
import { Backpack, BookOpen, Compass, HeartHandshake } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface MapAtmosphereProps {
	dimmed?: boolean
}

const floatingIcons = [
	{ Icon: Compass, className: "right-[7%] top-[12%]", delay: 0 },
	{ Icon: Backpack, className: "bottom-[14%] right-[13%]", delay: 1.4 },
	{ Icon: BookOpen, className: "bottom-[9%] left-[42%]", delay: 2.8 },
	{ Icon: HeartHandshake, className: "right-[31%] top-[8%]", delay: 4.1 },
]

export const MapAtmosphere = memo(function MapAtmosphere({
	dimmed = false,
}: MapAtmosphereProps) {
	const reduceMotion = useReducedMotion()

	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-300",
				dimmed ? "opacity-0" : "opacity-100",
			)}
		>
			<div
				className="absolute inset-0 opacity-[0.18]"
				style={{
					backgroundImage:
						"radial-gradient(circle, rgba(36,120,168,0.34) 0.7px, transparent 0.8px)",
					backgroundSize: "26px 26px",
				}}
			/>

			<motion.svg
				viewBox="0 0 1200 720"
				preserveAspectRatio="none"
				className="absolute inset-0 h-full w-full opacity-[0.16]"
			>
				<motion.path
					d="M70 570 C210 455 310 650 465 515 S750 315 865 405 S1035 540 1160 330"
					fill="none"
					stroke="#2478A8"
					strokeWidth="2"
					strokeDasharray="7 12"
					strokeLinecap="round"
					initial={reduceMotion ? false : { pathLength: 0.15, opacity: 0.3 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
				/>
				{[
					[70, 570],
					[465, 515],
					[865, 405],
					[1160, 330],
				].map(([cx, cy], index) => (
					<motion.circle
						key={`${cx}-${cy}`}
						cx={cx}
						cy={cy}
						r="5"
						fill="#2478A8"
						initial={reduceMotion ? false : { opacity: 0.35, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.45,
							delay: 0.35 + index * 0.16,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
				))}
			</motion.svg>

			{floatingIcons.map(({ Icon, className, delay }) => (
				<motion.div
					key={className}
					className={cn(
						"absolute hidden h-11 w-11 place-items-center rounded-full border border-[#69B7D9]/30 bg-white/25 text-[#2478A8]/35 backdrop-blur-[2px] lg:grid",
						className,
					)}
					animate={reduceMotion ? undefined : { y: [-5, 5, -5] }}
					transition={{
						duration: 7.5,
						delay,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Icon className="h-5 w-5" strokeWidth={1.5} />
				</motion.div>
			))}
		</div>
	)
})
