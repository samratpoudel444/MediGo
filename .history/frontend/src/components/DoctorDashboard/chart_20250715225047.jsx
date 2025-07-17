import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { PieChart } from "@mui/x-charts/PieChart";

const fetchPatientByAge = async () => {
  const res = await axiosInstance.get("/api/v1/getPatientByAge");
  return res.data.message;
};

const PatientAgeChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientByAge"],
    queryFn: fetchPatientByAge,
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Error loading data</div>;

  // Flatten data into array of {id, value, label}
  const chartData = [
    {
      id: "Under 16",
      value: data.under16,
      label: "Age < 16",
    },
    ...data.between16And70.map((item) => ({
      id: "between 16 and ",
      value: item.patientCount,
      label: `Age ${item._id}`,
    })),
    {
      id: "Over 70",
      value: data.over70,
      label: "Age > 70",
    },
  ];

  return <PieChart series={[{ data: chartData }]} width={400} height={300} />;
};

export default PatientAgeChart;
