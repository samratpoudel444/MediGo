import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-row mt-16 justify-center items-center px-24 border">
        <div className="flex flex-col items-center">
          <img src={image} alt="" className="w-50 h-50 rounded-full" />
          <a className="font-bold text-2xl">Samrat Poudel</a>
        </div>
        <div className="flex flex-col w-1/2 border items-center justify-center">
          <a className="font-bold text-2xl mt-16">User Details</a>
        </div>
      </div>
    );
}

export default Profile;