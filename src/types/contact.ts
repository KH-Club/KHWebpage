export interface Contact {
	name: string
	link: string
	type: ContactType
}

export enum ContactType {
	Instagram = "Instagram",
	Facebook = "Facebook",
	Line = "Line",
	Phone = "Phone",
	Email = "Email",
	Location = "location",
}
