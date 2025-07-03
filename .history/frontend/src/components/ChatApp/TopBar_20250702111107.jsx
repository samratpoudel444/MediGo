

const TopBar= ()=>
{
    return (
      <div>
        <div className="flex flex-col fixed border ml-80 w-full h-screen">
          <div className="border w-full h-30 flex flex-row justify-center items-start">
            <img src={image} alt="profile" className="h-10 rounded-full" />
            <a className="py-2">Samrat Poudel</a>
          </div>
          <div className="border w-full h-full"></div>
          <div className="border w-full h-20"></div>
        </div>
      </div>
    );
}
export default 