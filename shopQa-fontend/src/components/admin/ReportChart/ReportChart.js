import React, { useEffect } from "react";
import axios from "axios";
import {
    Breadcrumb,
    Button,
    Flex,
    Space,
    Modal,
    Form, Input,
    message,
    Spin
} from 'antd';
import BarChart from "./BarChart";
import LineChartExample from "./LineChart";
import RadialBarChartExample from "./RadialBarChart";
function ReportChart() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <Flex className="ReportManager">
        <BarChart />
        <LineChartExample/>
        {/* <RadialBarChartExample/> */}
    </Flex>
  );
}

export default ReportChart;

