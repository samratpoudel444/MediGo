import image from "../assets/MediGO.png"

const Profile= ()=>
{
    return(
        <div className="flex flex-col items-center justify-center mt-16">
            <img src={image} alt="" className="w-100 h-100 rounded-full"/>
        </div>
    )
}

export default Profile;