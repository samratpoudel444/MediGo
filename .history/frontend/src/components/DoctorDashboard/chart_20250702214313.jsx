import { PieChart } from "@mui/x-charts/PieChart";

const Chart = () => {
  return (
    <PieChart
    series={
        [
            {data: [
                 {id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
            ]}
       
        ]
    width={200}
      height={200}
    }
    />
  )
};
