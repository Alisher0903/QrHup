import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

// `dayjs` uchun plaginni ulash
dayjs.extend(quarterOfYear);

// `Chart.js` registratsiya qilish
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

export default function Attendance() {
  const chartData = {
    labels: [
      "2019/01/01",
      "2019/04/01",
      "2019/07/01",
      "2019/10/01",
      "2020/01/01",
      "2020/04/01",
      "2020/07/01",
      "2020/10/01",
    ].map((date) => `Q${dayjs(date).quarter()} ${dayjs(date).format("YYYY")}`),
    datasets: [
      {
        label: "Sales",
        data: [400, 430, 448, 470, 540, 580, 690, 690],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Grouped Labels on the X-axis",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            const date = [
              "2019/01/01",
              "2019/04/01",
              "2019/07/01",
              "2019/10/01",
              "2020/01/01",
              "2020/04/01",
              "2020/07/01",
              "2020/10/01",
            ][index];
            return `Q${dayjs(date).quarter()} ${dayjs(date).format("YYYY")}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Quarterly Sales",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales",
        },
      },
    },
  };

  const rows = [
    {
      name: "John Doe",
      punchIn: "9:00 AM",
      punchOut: "5:00 PM",
      type: "Full Time",
      totalHours: 8,
      status: "Present",
      action: "View",
    },
    {
      name: "Jane Smith",
      punchIn: "10:00 AM",
      punchOut: "6:00 PM",
      type: "Part Time",
      totalHours: 6,
      status: "Absent",
      action: "View",
    },
  ];

  return (
    <Container sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <div id="chart">
        <Bar data={chartData} options={chartOptions} height={100} />
      </div>
      <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6">
        <div className="border-r-2 w-full">
          <p className="text-3xl text-black">890</p>
          <p className="text-[15px] text-gray-500">Aктивные пользователи</p>
        </div>
        <div className="w-full border-r-2">
          <p className="text-3xl text-black">313/23</p>
          <p className="text-[15px] text-gray-500">Успешные/неуспешные</p>
        </div>
        <div className="w-full">
          <p className="text-3xl text-black">313/23</p>
          <p className="text-[15px] text-gray-500">Успешные/неуспешные</p>
        </div>
      </div>
      <TableContainer>
        <Table className="bg-white" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell>Profile</TableCell>
              <TableCell align="right">Punch In</TableCell>
              <TableCell align="right">Punched Out</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Total hours</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.punchIn}</TableCell>
                <TableCell align="right">{row.punchOut}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.totalHours}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <button className="text-blue-500 hover:underline">{row.action}</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
