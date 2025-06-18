import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[1,10,50] 
   return (
     <div className="w-full h-screen">
       <div className=" border w-1/2 h-1/2 px ">

         <DoughnutChart labels={roles} data={data} />
       </div>
     </div>
   ); 
}


export default Analytics;