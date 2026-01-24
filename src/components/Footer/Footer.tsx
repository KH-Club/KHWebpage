import { memo } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { SocialLinks } from "@/components/ui"

const SiteFooter = memo(function SiteFooter() {
  return (
    <footer className="bg-gray-800 py-10 text-white">
      <div className="container mx-auto flex flex-col justify-between px-6 md:flex-row">
        {/* Left Section: Social Media */}
        <div className="mb-6 flex flex-col items-center md:mb-0 md:w-1/3 md:items-start">
          <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
          <SocialLinks iconSize={30} />
        </div>

        {/* Center Section: Contact */}
        <div className="mb-6 text-center md:mb-0 md:w-1/3">
          <h3 className="mb-4 text-xl font-bold">Contact</h3>
          <p className="mb-2">
            <MdEmail size={20} className="mr-2 inline-block" />
            khclub.chula@gmail.com
          </p>
          <p className="mb-2">
            <a
              href="https://maps.app.goo.gl/yzn4sUwz9ZWhAqzu9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
              aria-label="View location on Google Maps"
            >
              <FaMapMarkerAlt size={20} className="mr-2 inline-block" />
            </a>
            ห้องชมรมค่ายอาสาสมัครนิสิตหอพัก ชั้น 2 โรงอาหารหอพักนิสิตจุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>

        {/* Right Section: Links */}
        <nav className="flex flex-col items-center md:w-1/3 md:items-end">
          <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
})

export default SiteFooter
