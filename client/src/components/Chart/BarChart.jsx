/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Activities",
    },
  },
  maintainAspectRatio: false,
};



const Style = {
  position: "relative",
  width: "99%",
  height: "200px",
  background: "white",
  borderRadius: "15px",
  boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 6px -1px"
};

const BarChart = ({data}) => {
  return (
    <div style={Style}>
      <Bar data={data} options={options} className={"barchart"} />
    </div>
  );
};

export default BarChart;
