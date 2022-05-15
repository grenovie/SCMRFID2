import "./profdashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";

const ProfDashboard = ({ opt }) => {
  return (
    <div className="App">
      <div className="charts">
        <Chart
          height={"600px"}
          width={"1000px"}
          // filter={{ section: opt }}
          chartId={"76e4a7b1-d411-4f74-9bed-0d5f99d3bf6b"}
        />
      </div>
    </div>
  );
};

export default ProfDashboard;
