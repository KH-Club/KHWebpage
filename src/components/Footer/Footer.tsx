import { FaFacebook,FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SiteFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
        {/* Left Section: Social Media */}
        <div className="mb-6 md:mb-0 md:w-1/3 flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61558699434541" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.instagram.com/kaihor.official/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>

        {/* Center Section: Contact */}
        <div className="mb-6 md:mb-0 md:w-1/3 text-center">
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="mb-2">
            <MdEmail size={20} className="inline-block mr-2" /> 
            khclub.chula@gmail.com
          </p>
          <p className="mb-2">
            <a href="https://maps.app.goo.gl/yzn4sUwz9ZWhAqzu9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <FaMapMarkerAlt size={20} className="inline-block mr-2" />
            </a>
            ห้องชมรมค่ายอาสาสมัครนิสิตหอพัก ชั้น 2 โรงอาหารหอพักนิสิตจุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>

        {/* Right Section: Links */}
        <div className="md:w-1/3 flex flex-col items-center md:items-end">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#donate" className="hover:underline">Donate</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
