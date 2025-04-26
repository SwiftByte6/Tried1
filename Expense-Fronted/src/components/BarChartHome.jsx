import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

// Helper: Generate vibrant color
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold">
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChartComponent extends PureComponent {
  state = { activeIndex: 0 };

  onPieEnter = (_, index) => {
    this.setState({ activeIndex: index });
  };

  getProcessedData = () => {
    const { expenses = [] } = this.props;

    const grouped = {};

    expenses.forEach(({ category, amount }) => {
      if (!grouped[category]) {
        grouped[category] = { name: category, value: 0, color: getRandomColor() };
      }
      grouped[category].value += amount;
    });

    return Object.values(grouped);
  };

  render() {
    const processedData = this.getProcessedData();
    const chartHeight = window.innerWidth < 768 ? 300 : 450;
    const innerR = window.innerWidth < 768 ? 30 : 50;
    const outerR = window.innerWidth < 768 ? 80 : 120;

    return (
      <div className="w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={innerR}
              outerRadius={outerR}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
