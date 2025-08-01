import image from "../../assets/MEDIGO.png";

const TopBar = ({firstName , lastName}) => {
    if(!firstName && !lastName) return (<div className="w-full h-30 flex flex-row px-10 py-2 gap-5 items-start bg-gray-200"></div>);
  return (
  
  <div className="w-full h-30 flex flex-row px-10 py-2 gap-5 items-start">
    <img 
      src={image} 
      alt="profile" 
      className="w-10 h-10 rounded-full object-cover" 
    />
    <span className="py-2 text-2xl">
      {firstName} {lastName}
    </span>
  </div>
   
  );
};
export default TopBar;
