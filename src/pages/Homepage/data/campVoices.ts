export type CampVoice = {
	id: string
	name: string
	role: string
	relation: string
	campYear: string
	quote: string
	imageAlt: string
	image?: string
}

// Placeholder voices. Replace these names, quotes, and optional image paths with real camp voices when available.
export const campVoices: CampVoice[] = [
	{
		id: "current-president",
		name: "ชื่อประธานชมรม",
		role: "ประธานชมรมค่ายอาสา",
		relation: "ประธานชมรมปัจจุบัน",
		campYear: "ปีการศึกษา 2567",
		quote:
			"ค่ายอาสาทำให้เราเห็นว่าความรับผิดชอบไม่ได้จบแค่การจัดงานให้สำเร็จ แต่คือการดูแลเพื่อน ทีมงาน และชุมชนให้เดินไปด้วยกันอย่างตั้งใจ",
		imageAlt: "ภาพตัวแทนประธานชมรมค่ายอาสา",
	},
	{
		id: "student-volunteer",
		name: "ชื่อนักศึกษาอาสา",
		role: "นักศึกษาอาสา",
		relation: "อาสาสมัครรุ่นปัจจุบัน",
		campYear: "ค่ายครั้งล่าสุด",
		quote:
			"การได้ลงพื้นที่จริงทำให้เราเรียนรู้จากคนรอบตัว ทั้งเพื่อนในทีม รุ่นพี่ และชุมชน ความเหนื่อยกลายเป็นความทรงจำที่ทำให้เราอยากกลับมาช่วยอีก",
		imageAlt: "ภาพตัวแทนนักศึกษาอาสาระหว่างทำกิจกรรมค่าย",
	},
	{
		id: "alumni-member",
		name: "ชื่อศิษย์เก่า",
		role: "ศิษย์เก่าและรุ่นพี่ชมรม",
		relation: "ศิษย์เก่า / รุ่นพี่ชมรม",
		campYear: "เข้าค่ายตั้งแต่ปี 25XX",
		quote:
			"หลายปีผ่านไป สิ่งที่จำได้ไม่ใช่แค่งานที่เราทำ แต่คือผู้คน มิตรภาพ และวิธีคิดที่ค่ายสอนให้เราเติบโตและยังรู้สึกผูกพันกับชมรมเสมอ",
		imageAlt: "ภาพตัวแทนศิษย์เก่าหรือรุ่นพี่ชมรมค่ายอาสา",
	},
]
