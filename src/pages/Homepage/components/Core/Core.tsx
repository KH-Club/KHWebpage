import { memo } from "react"
import { InfoCard } from "@/components/ui"

interface CoreValue {
  title: string
  description?: string
  items?: string[]
}

const coreValues: CoreValue[] = [
  {
    title: "Our Activities",
    description: "ชมรมของเรามุ่งเน้นจัดกิจกรรมที่ส่งเสริมความเป็นจิตอาสา เเละการพัฒนาความสามารถเป็นหลัก",
    items: [
      "ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (ปลายปี)",
      "ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (กลางปี)",
      "กิจกรรมจิตอาสา 1 Days Trip"
    ]
  },
  {
    title: "Our Vision",
    description: `ชมรมของเรามีวิสัยทัศน์ที่จะเป็นเเรงขับเคลื่อนเล็กๆ ที่มีผลกระทบในชุมชน
      เราต้องการสร้างแรงบันดาลใจให้กับคนรุ่นใหม่ เพื่อที่จะมีส่วนร่วมในการทำสิ่งดีๆ 
      และสร้างการเปลี่ยนแปลงเชิงบวกในสังคม เรามุ่งมั่นที่จะทำให้ทุกกิจกรรมของเรา 
      สามารถสร้างผลกระทบที่ยั่งยืนและเป็นประโยชน์ต่อทุกคน`
  },
  {
    title: "Our Values",
    description: "ชมรมของเรามุ่งเน้นจัดจุดประสงค์ 3 ข้อเป็นวิสัยทัศน์หลัก",
    items: [
      "พัฒนาเเละส่งเสริมความเป็นจิตอาสา ช่วยเหลือสังคม",
      "พัฒนาเเละส่งเสริมการเรียนรู้ทักษะใหม่ๆ",
      "พัฒนาเเละส่งเสริมความสัมพันธ์ของคนในชมรม"
    ]
  }
]

const Core = memo(function Core() {
  return (
    <section className="bg-gray-100 py-12" id="core-section">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {coreValues.map(({ title, description, items }) => (
            <InfoCard key={title} title={title} description={description}>
              {items && (
                <ul className="list-inside list-disc">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Core
