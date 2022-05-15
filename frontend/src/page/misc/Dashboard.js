import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = ({ opt }) => {
  // const [filter, setfilter] = useState();
  // if ((opt, sel))
  //   try {
  //     setfilter({ opt: sel });
  //   } catch (error) {}
  return (
    <div className="App">
      <div className="charts">
        <Chart
          height={"600px"}
          width={"1000px"}
          filter={{section: opt}}
          chartId={"625576ba-7082-4019-8273-3a0c8b059ba5"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
