import HomepageBackgroundImage from "@/assets/homepagebackground.jpg";
import RightContainerImage from "@/assets/KH52.jpg";

const Home = () => {
  return (
    <section 
      id="home" 
      className="relative bg-cover bg-center bg-no-repeat shadow-lg h-[70vh]"
      style={{ backgroundImage: `url(${HomepageBackgroundImage})` }}
    >
      {/* Black highlight */}
      <div className="absolute inset-0 bg-black opacity-75"></div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full justify-center items-center">
        {/* Left Container */}
        <div className="w-2/5 flex flex-col items-center justify-center p-10 text-white text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">"KAIHOR" / "ค่ายหอ"</h1>
            <p className="text-xl mb-4">"ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย"</p>
            <p className="text-lg mb-4">พัฒนาจิตอาสา พัฒนาทักษะ พัฒนาความสัมพันธ์ พัฒนาสังคม</p>
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            What KH Do
          </button>
        </div>
        
        {/* Right Container */}
        <div className="w-1/3 flex items-center justify-center">
          <img 
            src={RightContainerImage} 
            alt="RightContainerImage" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
