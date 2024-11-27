const Core = () => {
    return (
        <section className="bg-gray-100 py-12" id="core-section">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* First Div */}
                    <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white">
                        <h2 className="mb-4 text-2xl font-bold">Our Activities</h2>
                        <p className="mb-4">
                            ชมรมของเรามุ่งเน้นจัดกิจกรรมที่ส่งเสริมความเป็นจิตอาสา เเละการพัฒนาความสามารถเป็นหลัก
                        </p>
                        <ul className="list-inside list-disc">
                            <li>ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (ปลายปี)</li>
                            <li>ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (กลางปี)</li>
                            <li>กิจกรรมจิตอาสา 1 Days Trip</li>
                        </ul>
                    </div>
                    
                    {/* Second Div */}
                    <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white">
                        <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
                        <p className="mb-4">
                            ชมรมของเรามีวิสัยทัศน์ที่จะเป็นเเรงขับเคลื่อนเล็กๆ ที่มีผลกระทบในชุมชน
                            เราต้องการสร้างแรงบันดาลใจให้กับคนรุ่นใหม่ เพื่อที่จะมีส่วนร่วมในการทำสิ่งดีๆ 
                            และสร้างการเปลี่ยนแปลงเชิงบวกในสังคม เรามุ่งมั่นที่จะทำให้ทุกกิจกรรมของเรา 
                            สามารถสร้างผลกระทบที่ยั่งยืนและเป็นประโยชน์ต่อทุกคน
                        </p>
                    </div>
                    
                    {/* Third Div */}
                    <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white">
                        <h2 className="mb-4 text-2xl font-bold">Our Values</h2>
                        <p className="mb-4">
                            ชมรมของเรามุ่งเน้นจัดจุดประสงค์ 3 ข้อเป็นวิสัยทัศน์หลัก
                        </p>
                        <ul className="list-inside list-disc">
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

export default Core;
