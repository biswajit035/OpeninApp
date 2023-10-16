/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);




const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
  maintainAspectRatio: false,
};

const Style = {
  position: "relative",
  margin: "auto",
  width: "100%",
  height: "150px",
  background: "white",
  borderRadius: "15px",
};

const PieChart = ({pieInfo}) => {
  return (
    <div style={Style}>
      <Doughnut data={pieInfo} options={options} />
    </div>
  );
};

export default PieChart





