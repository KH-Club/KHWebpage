// Note : this components is not use right now
import React from "react"

import { FaInstagram } from "react-icons/fa"
import { Contact } from "@/types/contact"

interface ContactItemProps {
	contact: Contact
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
	return (
		<a
			href={contact.link}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100"
		>
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
				{contact.type === "Instagram" && <FaInstagram className="h-5 w-5" />}
			</div>
			<span className="text-lg font-medium">{contact.name}</span>
		</a>
	)
}

export default ContactItem
