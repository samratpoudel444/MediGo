import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-row mt-16 items-center px-24">
        <div className="flex flex-col items-center">
          <img src={image} alt="" className="w-50 h-50 rounded-full" />
          <a className="font-bold text-2xl">Samrat Poudel</a>
        </div>
        <div>
        <a className="font-bold text-2xl mt-16">User Details</a>
      </div>
    );
}

export default Profile;