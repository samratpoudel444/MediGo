import image from "../../assets/MEDIGO.png";

const TopBar = () => {
  return (

   
        <div className="border w-full h-30 flex flex-row px-10 items-start">
          <img src={image} alt="profile" className="h-10 rounded-full" />
          <a className="py-2">Samrat Poudel</a>
        </div>
  );
};
export default TopBar;
