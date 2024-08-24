const About = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First Div */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:bg-blue-500 hover:text-white hover:scale-105 duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold mb-4">Our Activities</h2>
                        <p className="mb-4">
                            ชมรมของเรามุ่งเน้นจัดกิจกรรมที่ส่งเสริมความเป็นจิตอาสา เเละการพัฒนาความสามารถเป็นหลัก
                        </p>
                        <ul className="list-disc list-inside">
                            <li>ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (ปลายปี)</li>
                            <li>ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (กลางปี)</li>
                            <li>กิจกรรมจิตอาสา 1 Days Trip</li>
                        </ul>
                    </div>
                    
                    {/* Second Div */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:bg-blue-500 hover:text-white hover:scale-105 duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                        <p className="mb-4">
                            ชมรมของเรามีวิสัยทัศน์ที่จะเป็นเเรงขับเคลื่อนเล็กๆ ที่มีผลกระทบในชุมชน
                            เราต้องการสร้างแรงบันดาลใจให้กับคนรุ่นใหม่ เพื่อที่จะมีส่วนร่วมในการทำสิ่งดีๆ 
                            และสร้างการเปลี่ยนแปลงเชิงบวกในสังคม เรามุ่งมั่นที่จะทำให้ทุกกิจกรรมของเรา 
                            สามารถสร้างผลกระทบที่ยั่งยืนและเป็นประโยชน์ต่อทุกคน
                        </p>
                    </div>
                    
                    {/* Third Div */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:bg-blue-500 hover:text-white hover:scale-105 duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                        <p className="mb-4">
                            ชมรมของเรามุ่งเน้นจัดจุดประสงค์ 3 ข้อเป็นวิสัยทัศน์หลัก
                        </p>
                        <ul className="list-disc list-inside">
                            <li>พัฒนาเเละส่งเสริมความเป็นจิตอาสา ช่วยเหลือสังคม</li>
                            <li>พัฒนาเเละส่งเสริมการเรียนรู้ทักษะใหม่ๆ</li>
                            <li>พัฒนาเเละส่งเสริมความสัมพันธ์ของคนในชมรม</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
