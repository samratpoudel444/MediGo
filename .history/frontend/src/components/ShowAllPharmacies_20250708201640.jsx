import axiosInstance from "./utils/AxiosInstance";

const fetchData= async()=>
{
    try{
        const response = axiosInstance.get("/api/v1/getAllPharmacies");
        return response.data
    }
    catch(err)
    {
        console.log(err)
        throw err;
    }
}
const ShowAllPharmacies = () => {
    const {data}= useMu

  return (
    <div>
        <div className="w-full h-22 bg-gray-300 text-center font-bold text-3xl flex justify-center items-center">
                All Pharmacies
        </div>

    </div>
  );
};


export default ShowAllPharmacies;