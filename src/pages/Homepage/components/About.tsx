import Image1 from "@/assets/images/activitys/krongarsa.jpg";
import Image2 from "@/assets/images/activitys/krongfood.jpg";
import Image3 from "@/assets/images/activitys/krongngan.jpg";
import Image4 from "@/assets/images/activitys/krongkid.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const LearnMoreButtonOnClickHandler = () => {
    navigate("/camp");
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Container: Images */}
          <div className="flex flex-col gap-4 md:w-3/5">
            <div className="flex gap-4">
              <div className="relative h-60 flex-1">
                <img
                  src={Image1}
                  alt="Image 1"
                  className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
              <div className="relative h-60 flex-1">
                <img
                  src={Image2}
                  alt="Image 2"
                  className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative h-60 flex-1">
                <img
                  src={Image3}
                  alt="Image 3"
                  className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
              <div className="relative h-60 flex-1">
                <img
                  src={Image4}
                  alt="Image 4"
                  className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Right Container: Text and Content */}
          <div className="rounded-lg bg-white p-6 shadow-md md:w-2/5">
            <h2 className="mb-4 text-center text-2xl font-bold">ค่ายหอคืออะไร?</h2>
            <p className="mb-2 text-gray-700">
              &nbsp; &nbsp; &nbsp;ค่ายรวมจุฬาฯอาสาพัฒนาชนบท (ค่ายหอ) เป็นค่ายอาสาที่จัดขึ้นโดยชมรมค่ายอาสาสมัครนิสิตหอพัก
              โดยมีวัตถุประสงค์หลัก คือ การส่งเสริมความเป็นจิตอาสา , การพัฒนาความสามารถต่างๆ ทั้งทางฝีมือ การทำงานเป็นทีม
              การเข้าสังคม เเละความสัมพันธ์ของ นิสิตที่เข้าร่วมกิจกรรม เเต่ละค่ายจะไปจัดที่โรงเรียนที่ต้องการความช่วยเหลือ
              มีระยะเวลาจัดกิจกรรม 10-12 วัน
            </p>
            <p className="mb-2 text-gray-700">
              &nbsp; &nbsp; &nbsp;กิจกรรมของค่ายจะเเบ่งเป็นโครงต่างๆ ได้เเก่ โครงงานก่อสร้าง,โครงสวัสดิการ,โครงอาสาพัฒนา,โครงเด็กเเละโครงสัมพันธ์ชุมชน
              นิสิตที่เข้าร่วมกิจกรรมจะได้มีโอกาส "เวียนโครง" ไปทุกโครงในระหว่างกิจกรรมนอกจากนี้ยังมีกิจกรรมอื่นๆ ที่ส่งเสริมความสัมพันธ์ของผู้เข้าร่วมกิจกรรม
              เช่น กิจกรรมสันทนาการ
            </p>
            {/* Text Icons */}
            <div className="mt-6 flex flex-col gap-6 pb-3 sm:h-1/6 sm:flex-row">
              {/* First Section */}
              <div className="flex w-full items-center sm:w-1/2">
                <div className="mr-4 h-full w-2 bg-blue-500"></div> {/* Blue bar */}
                <div className="mb-2 flex items-center text-blue-500">
                  <span className="flex h-full items-center justify-center text-5xl font-semibold">53</span>
                  <div className="ml-4 flex flex-col">
                    <span className="text-lg font-semibold">ค่าย</span>
                    <span className="text-md font-semibold">ที่เราได้จัด</span>
                  </div>
                </div>
              </div>

              {/* Second Section */}
              <div className="flex w-full items-center sm:w-1/2">
                <div className="mr-4 h-full w-2 bg-blue-500"></div> {/* Blue bar */}
                <div className="mb-2 flex items-center text-blue-500">
                  <span className="flex h-full items-center justify-center text-5xl font-semibold">25+</span>
                  <div className="ml-4 flex flex-col">
                    <span className="text-lg font-semibold">ปี</span>
                    <span className="text-md font-semibold">ที่ชมรมตั้งมา</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Centered Button */}
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-700"
                onClick={LearnMoreButtonOnClickHandler}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
