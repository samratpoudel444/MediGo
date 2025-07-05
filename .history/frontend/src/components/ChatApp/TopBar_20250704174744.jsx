import image from "../../assets/MEDIGO.png";

const TopBar = ({name}) => {
  return (
        <div className=" w-full h-30 flex flex-row px-10 py-2 gap-5 items-start">
          <img src={image} alt="profile" className="h-10 rounded-full" />
          <a className="py-2 text-2xl">{name}</a>
        </div>
  );
};
export default TopBar;
