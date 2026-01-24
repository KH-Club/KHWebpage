import { Activity } from "../page"

export interface ActivityPopupProps extends Activity {
	onClose: () => void
}

const ActivityPopup = ({
	name,
	imgSrc,
	description,
	onClose,
}: ActivityPopupProps) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
			<div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
				<button
					onClick={onClose}
					className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
				>
					&times;
				</button>
				<h2 className="mb-4 text-2xl font-bold">{name}</h2>
				<img
					src={imgSrc}
					alt={name}
					className="mb-4 h-64 w-full rounded-lg object-cover"
				/>
				<p className="text-gray-700">{description}</p>
			</div>
		</div>
	)
}

export default ActivityPopup
