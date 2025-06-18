import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[1,10,50] 
   return (
     <div className="w-screen h-screen">
       <div className="flex flex-row h-1/2 w-1/2 ">
         <div className="flex flex-col items-center justify-center ">
           <h1 className="px-4 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
         <div className=" flex flex-col items-center justify-center ">
           <h1 className="px-16 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
       </div>
       <div className="flex flex-row h-1/2 w-1/2">
         <div className="flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
         <div className="flex flex-col items-center justify-center ">
           <h1 className="px-15 py-3">User Associated With medigo</h1>
           <DoughnutChart labels={roles} data={data} />
         </div>
       </div>
     </div>
   ); 
}


export default Analytics;