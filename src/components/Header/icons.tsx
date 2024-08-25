import {
  LucideProps,
  Moon,
  SunMedium,
  Instagram,
  Facebook,
  type LucideIcon,
} from "lucide-react"
import BackgroundImage from "@/assets/logos/kaihorlogo.png";

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  facebook : Facebook,
  instagram: Instagram,
  logo: (props: LucideProps) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    className="iconify iconify--logos"
    width="31.88"
    height="32"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 256 257"
    {...props}
  >
    {/* Background Image */}
    <image
      href={BackgroundImage}
      x="0"
      y="0"
      width="256"
      height="257"
      preserveAspectRatio="xMidYMid slice"
    />

    <defs>
      <linearGradient
        id="IconifyId1813088fe1fbc01fb466"
        x1="-.828%"
        x2="57.636%"
        y1="7.652%"
        y2="78.411%"
      >
        <stop offset="0%" stopColor="#41D1FF"></stop>
        <stop offset="100%" stopColor="#BD34FE"></stop>
      </linearGradient>
      <linearGradient
        id="IconifyId1813088fe1fbc01fb467"
        x1="43.376%"
        x2="50.316%"
        y1="2.242%"
        y2="89.03%"
      >
        <stop offset="0%" stopColor="#FFEA83"></stop>
        <stop offset="8.333%" stopColor="#FFDD35"></stop>
        <stop offset="100%" stopColor="#FFA800"></stop>
      </linearGradient>
    </defs>
  </svg>
  )
}
