import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return(
        <div className="flex flex-col items-center justify-center mt-16">
            <img src={image} alt="" className="w-50 h-50 rounded-full"/>
            <button className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition ">Hello</button>
        </div>
    )
}

export default Profile;