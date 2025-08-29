import Footer from "./Footer";
import Navbar from "./Navbar";

 

function Remainder()
{
    return (
      <div className="w-full h-screen flex flex-col">
        <div className="mt-0">
          <Navbar />
        </div>
        
        <div className="flex-grow">
            <form>
                
            </form>
        </div>
        <div className="mb-">
          <Footer />
        </div>
      </div>
    );

}

export default Remainder;
