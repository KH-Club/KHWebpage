import { Activity } from "../page";

export interface ActivityPopupProps extends Activity{
    onClose: () => void;
}

const ActivityPopup = ({ name, imgSrc, description, onClose }: ActivityPopupProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <img 
                    src={imgSrc} 
                    alt={name} 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default ActivityPopup;
