import InstagramEmbed from "./components/InstagramEmbled"

const ContactPage = () => {
	const embedIGSubUrl = "C_Numb1yoch"

	return (
		<section className="bg-gray-100 py-12">
			<div className="container mx-auto p-4">
				<h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
					Contact Us
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-1">
					<InstagramEmbed subUrl={embedIGSubUrl} />
				</div>
			</div>
		</section>
	)
}

export default ContactPage
