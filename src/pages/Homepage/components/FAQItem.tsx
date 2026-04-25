import { memo } from "react"

import {
	AccordionContent,
	AccordionItem as BaseAccordionItem,
	AccordionTrigger,
} from "@/components/ui/Accordion/Accordion"

import type { FAQItemData } from "./FAQ.data"

interface FAQItemProps {
	item: FAQItemData
	value: string
}

function FAQItem({ item, value }: FAQItemProps) {
	return (
		<BaseAccordionItem
			value={value}
			className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-gray-100 data-[state=open]:border-blue-200 data-[state=open]:bg-blue-50/60"
		>
			<AccordionTrigger className="gap-4 p-5 text-left text-base font-semibold text-gray-900 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:px-6 sm:text-lg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-blue-600">
				{item.question}
			</AccordionTrigger>
			<AccordionContent className="px-5 text-base leading-relaxed text-gray-700 sm:px-6">
				{item.answer.map((line) => (
					<p key={line}>{line}</p>
				))}
			</AccordionContent>
		</BaseAccordionItem>
	)
}

const MemoizedFAQItem = memo(FAQItem)

export default MemoizedFAQItem
