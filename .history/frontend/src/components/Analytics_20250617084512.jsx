import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[1,10,50] 
   return (
     <div className="w-full h-screen">
       <div className="flex flex-row h-1/2">
         <div className="  w-1/2 h-1/2 py-5 flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
         <div className=" border w-1/2 h-1/2 py-5 flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
       </div>
       <div>
         <div className=" border w-1/2 h-1/2 py-5 flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
         <div className=" border w-1/2 h-1/2 py-5 flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
       </div>
     </div>
   ); 
}


export default Analytics;