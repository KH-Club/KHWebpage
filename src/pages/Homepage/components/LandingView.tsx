import HomepageBackgroundImage from "@/assets/images/layout/homepagebackground.jpg";
import RightContainerImage from "@/assets/images/camps/main/52/KH52.jpg";

const LandingView = () => {
  return (
    <section
      id="home"
      className="relative bg-cover bg-center bg-no-repeat shadow-lg h-[85vh] sm:h-screen"
      style={{ backgroundImage: `url(${HomepageBackgroundImage})` }}
    >
      {/* Black highlight */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full justify-center items-center px-6 md:px-10">
        {/* Left Container */}
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start justify-center p-5 md:p-10 text-white text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">"KAIHOR" / "ค่ายหอ"</h1>
          <p className="text-lg md:text-xl mb-4">
            "ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย"
          </p>
          <p className="text-sm md:text-md mb-4">
            ชมรมสังกัดจุฬาลงกรณ์มหาวิทยาลัย ครอบครัวที่พร้อมจะออกไปช่วยเหลือสังคม 
            ส่งเสริมความเป็นจิตอาสา พัฒนาความสามารถ เเละพัฒนาสังคม
          </p>
          <button className="mt-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            About us
          </button>
        </div>

        {/* Right Container */}
        <div className="w-full lg:w-1/3 flex items-center justify-center mt-6 lg:mt-0">
          <img
            src={RightContainerImage}
            alt="RightContainerImage"
            className="max-w-[80%] md:max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingView;
