import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-row mt-16">
        <div className="flex flex-col ">
          <img src={image} alt="" className="w-50 h-50 rounded-full" />
          <a className="font-bold text-2xl">Samrat Poudel</a>
        </div>
        <a className="font-bold text-2xl mt-16">User Details</a>
      </div>
    );
}

export default Profile;