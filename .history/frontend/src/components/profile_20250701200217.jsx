import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-row mt-16 items-center px-24 border ">
        <div className="flex flex-col items-center border">
          <img src={image} alt="" className="w-50 h-50 rounded-full" />
          <a className="font-bold text-2xl">Samrat Poudel</a>
        </div>
        <div className="flex flex-col w-1/2  items-center justify-center border">
          <a className="font-bold text-5xl">User Details</a>
        </div>
      </div>
    );
}

export default Profile;