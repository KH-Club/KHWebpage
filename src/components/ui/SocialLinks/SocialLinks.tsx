import { memo } from "react"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export interface SocialLinksProps {
	className?: string
	iconSize?: number
	showLabels?: boolean
	variant?: "icon" | "text" | "both"
}

interface SocialLink {
	name: string
	href: string
	icon: typeof FaFacebook
	ariaLabel: string
}

const socialLinks: SocialLink[] = [
	{
		name: "Facebook",
		href: siteConfig.links.facebook,
		icon: FaFacebook,
		ariaLabel: "Visit our Facebook page",
	},
	{
		name: "Instagram",
		href: siteConfig.links.instagram,
		icon: FaInstagram,
		ariaLabel: "Visit our Instagram page",
	},
]

export const SocialLinks = memo(function SocialLinks({
	className,
	iconSize = 24,
	showLabels = false,
	variant = "icon",
}: SocialLinksProps) {
	return (
		<div className={cn("flex items-center space-x-4", className)}>
			{socialLinks.map(({ name, href, icon: Icon, ariaLabel }) => (
				<a
					key={name}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={ariaLabel}
					className="transition-opacity hover:opacity-70"
				>
					{(variant === "icon" || variant === "both") && (
						<Icon size={iconSize} />
					)}
					{(variant === "text" || variant === "both" || showLabels) && (
						<span className={variant === "both" ? "ml-2" : ""}>{name}</span>
					)}
				</a>
			))}
		</div>
	)
})

export default SocialLinks
