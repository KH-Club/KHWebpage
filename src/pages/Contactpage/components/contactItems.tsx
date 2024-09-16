// Note : this components is not use right now
import React from 'react';

import { FaInstagram } from 'react-icons/fa';
import { Contact } from '../page';

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    return (
        <a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
            <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
                {contact.type === "Instagram" && <FaInstagram className="w-5 h-5" />}
            </div>
            <span className="text-lg font-medium">{contact.name}</span>
        </a>
    );
};

export default ContactItem;
