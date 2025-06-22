import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[1,10,50] 
   return (
     <div className="w-full h-screen">
       <div className="w-1/3 p-10">
            
         <DoughnutChart labels={roles} data={data} />
       </div>
     </div>
   ); 
}


export default Analytics;