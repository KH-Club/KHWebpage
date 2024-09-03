import InstagramEmbed from "./components/InstagramEmbled"
import FacebookEmbed from "./components/facebookEmbled"
// import ContactItem from "./components/contactItems"

export interface Contact {
    name: string
    link: string
    type: contactType
}

export enum contactType {
    Instagram = "Instagram",
    Facebook = "Facebook",
    Line = "Line",
    Phone = "Phone",
    Email = "Email",
    Location = "location"
}

const ContactPage = () => {
    const embedIGSubUrl = "C_Numb1yoch"
    // const embedFacebookUrl = "https://www.facebook.com/photo?fbid=122095101884289981"
    // const ContactList: Contact[] = [
    //     {
    //         name: "IG",
    //         link: "https://www.instagram.com/kaihor.official/",
    //         type: contactType.Instagram,
    //     }
    // ]

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
