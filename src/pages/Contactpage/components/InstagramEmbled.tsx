import { useEffect } from "react"

export interface InstagramEmbedProps {
	subUrl: string
}

declare global {
	interface Window {
		instgrm?: {
			Embeds: {
				process: () => void
			}
		}
	}
}

const INSTAGRAM_SCRIPT_ID = "instagram-embed-script"

const InstagramEmbed = ({ subUrl }: InstagramEmbedProps) => {
	const postUrl = `https://www.instagram.com/p/${subUrl}/`

	useEffect(() => {
		const processEmbeds = () => window.instgrm?.Embeds.process()
		const existingScript = document.getElementById(
			INSTAGRAM_SCRIPT_ID,
		) as HTMLScriptElement | null

		if (existingScript) {
			if (window.instgrm) {
				processEmbeds()
			} else {
				existingScript.addEventListener("load", processEmbeds, { once: true })
			}

			return () => existingScript.removeEventListener("load", processEmbeds)
		}

		const script = document.createElement("script")
		script.id = INSTAGRAM_SCRIPT_ID
		script.async = true
		script.src = "https://www.instagram.com/embed.js"
		script.addEventListener("load", processEmbeds, { once: true })
		document.body.appendChild(script)

		return () => script.removeEventListener("load", processEmbeds)
	}, [subUrl])

	return (
		<div className="flex w-full justify-center overflow-hidden">
			<blockquote
				className="instagram-media m-0 w-full min-w-0 max-w-[540px] rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
				data-instgrm-captioned
				data-instgrm-permalink={`${postUrl}?utm_source=ig_embed&utm_campaign=loading`}
				data-instgrm-version="14"
			>
				<a
					className="flex min-h-80 items-center justify-center px-6 text-center text-sm font-semibold text-blue-600"
					href={postUrl}
					target="_blank"
					rel="noreferrer"
				>
					ดูโพสต์นี้บน Instagram @kaihor.official
				</a>
			</blockquote>
		</div>
	)
}

export default InstagramEmbed
