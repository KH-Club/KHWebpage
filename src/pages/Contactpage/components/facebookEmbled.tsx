// Note : this components is not use right now
import React from "react"

interface FacebookEmbedProps {
	url: string
}

const FacebookEmbed: React.FC<FacebookEmbedProps> = ({ url }) => {
	const encodedUrl = encodeURIComponent(url)
	return (
		<div className="flex justify-center">
			<iframe
				src={`${encodedUrl}&show_text=true&width=500`}
				width="500"
				height="545"
				style={{ border: "none", overflow: "hidden" }}
				allowFullScreen={true}
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			></iframe>
		</div>
	)
}

export default FacebookEmbed
