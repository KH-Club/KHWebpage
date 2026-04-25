import { memo } from "react"

import { Accordion } from "@/components/ui/Accordion/Accordion"

import { homepageFAQItems, type FAQItemData } from "./FAQ.data"
import FAQItem from "./FAQItem"

interface FAQSectionProps {
	items?: FAQItemData[]
}

function FAQSection({ items = homepageFAQItems }: FAQSectionProps) {
	return (
		<section id="faq-section" className="bg-white py-16 md:py-24">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl">
					<div className="mb-10 text-center">
						<span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
							FAQ
						</span>
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
							คำถามที่พบบ่อย
						</h2>
						<div className="mx-auto h-1 w-20 rounded bg-blue-500" />
					</div>

					<Accordion
						type="single"
						defaultValue="faq-0"
						collapsible
						className="space-y-4"
					>
						{items.map((item, index) => {
							return (
								<FAQItem
									key={item.question}
									item={item}
									value={`faq-${index}`}
								/>
							)
						})}
					</Accordion>
				</div>
			</div>
		</section>
	)
}

const MemoizedFAQSection = memo(FAQSection)

export default MemoizedFAQSection
