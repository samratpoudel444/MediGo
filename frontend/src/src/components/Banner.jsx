import img from "../assets/MEDIGO.png"
const Banner = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-full lg:w-1/2 z-50">
    <div className="overflow-hidden lg:w-full w-full h-full relative">
      <svg
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-6"
      >
        <path
          d="M0 0 Q 40 10, 0 20 Q 40 30, 0 40 Q 40 50, 0 60 Q 40 70, 0 80 Q 40 90, 0 100 L20 100 L20 0 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="h-full w-full bg-[#42cbf5] flex items-center justify-center flex-col">
        <img src={img} alt="" />
        <h1 className=" text-center text-5xl font-bold">
          MediGo <br />
        </h1>
        <p> Medical Prescription System</p>
      </div>
    </div>
    </div>

  );
};

export default Banner;
