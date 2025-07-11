import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-cols-2 justify-center items-start  gap-10">
        <div className="mt-16 ml-32">
          <Chart />
        </div>

      </div>
    );   
}

export default Dashboard;