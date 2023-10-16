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
      text: "Top Products",
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
  boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 6px -1px",
};

const PieChart = ({pieInfo}) => {
  return (
    <div style={Style}>
      <Doughnut data={pieInfo} options={options} />
    </div>
  );
};

export default PieChart





