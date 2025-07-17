import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { PieChart } from "@mui/x-charts/PieChart";

const fetchPatientByAge = async () => {
  const res = await axiosInstance.get("/api/v1/getPatientByAge");
  console.log(res.data.message);
  return res.data.message;
};

const PatientAgeChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientByAge"],
    queryFn: fetchPatientByAge,
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Error loading data</div>;

  // Data from backend: [{ _id: age, patientCount: count }, ...]
  // Map it to PieChart format: { id, value, label }
  const chartData = data.map((item) => ({
    id: item._id,
    value: item.patientCount,
    label: `Age ${item._id}`,
  }));

  return <PieChart series={[{ data: chartData }]} width={400} height={300} />;
};

export default PatientAgeChart;
