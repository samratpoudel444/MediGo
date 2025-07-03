import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-row-2 justify-center items-center  border">
        <div className="">
          <Chart />
        </div>
        <div className="">
          <Chart />
        </div>
        <div className="">
          <Chart />
        </div>
      </div>
    );   
}

export default Dashboard;