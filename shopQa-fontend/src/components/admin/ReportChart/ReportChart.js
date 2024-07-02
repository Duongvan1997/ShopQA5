import React, { useEffect } from "react";
import axios from "axios";
import "./reportchart.css";
import {
    Breadcrumb,
    Button,
    Flex,
    Space,
    Modal,
    Form, Input,
    message,
    Spin,
    Div
} from 'antd';
import BarChart from "./BarChart";
import LineChartExample from "./LineChart";
import RadialBarChartExample from "./RadialBarChart";
function ReportChart() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div className="ReportManager" >

        <div className="barchart"><h2>Doanh thu các tháng trong năm 2024</h2><BarChart /></div>
        <div className="barchart">
          <h2>Số lượng đơn hàng các tháng trong năm 2024</h2>
          <LineChartExample/>
          </div>
        {/* <RadialBarChartExample/> */}
    </div>
  );
}

export default ReportChart;

