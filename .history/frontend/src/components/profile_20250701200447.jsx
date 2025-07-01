import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return (
      <div className="flex flex-row items-center justify-between mt-16 px-36 py-0 h-full border rounded-lg shadow-md bg-white">
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 shadow-sm"
          />
          <span className="font-semibold text-2xl text-gray-800">
            Samrat Poudel
          </span>
        </div>

        {/* User Details Title */}
        <div className="flex flex-col items-center justify-center w-1/2 text-center">
          <span className="font-bold text-4xl text-gray-900">User Details</span>
        </div>
      </div>
    );
}

export default Profile;