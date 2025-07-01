import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <img src={image} alt="" className="w-50 h-50 rounded-full" />
        <a className="font-bold text-2xl">Samrat Poudel</a>
        <a className="font-bold text-2xl ">User Details</a>
      </div>
    );
}

export default Profile;