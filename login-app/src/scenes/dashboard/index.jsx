/*
import { mockTransactions } from "../../data/teamdata";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
*/
/*
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
    </Box>
    </Box>

    )
}

export default Dashboard;

*/
/*
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../template/header";
import LineChart from "../../template/linechart";
import PieChart from "../../template/piechart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)" // 12-column layout
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 8" // Occupies 8 columns
          gridRow="span 2" // Spans 2 rows
          backgroundColor={colors.primary[400]}
          p="20px" // Padding for internal spacing
          borderRadius="8px" // Rounded corners for better aesthetics
        >
          <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
            Line Chart
          </Typography>
          <Box height="250px" mt="20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 8" // Occupies 8 columns
          gridRow="span 2" // Spans 2 rows
          backgroundColor={colors.primary[400]}
          p="20px"
          borderRadius="8px"
        >
          <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
            Pie Chart
          </Typography>
          <Box height="250px" mt="20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
*/
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../template/header";
import LineChart from "../../template/linechart";
import PieChart from "../../template/piechart";
import { useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to toggle chart visibility
  const [showCharts, setShowCharts] = useState(false);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowCharts(!showCharts)} // Toggle the chart view
        >
          {showCharts ? "Hide Charts" : "Show Charts"} {/* Button label */}
        </Button>
      </Box>

      {/* GRID & CHARTS */}
      {showCharts && ( // Render charts only if showCharts is true
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)" // 12-column layout
          gridAutoRows="140px"
          gap="20px"
        >
          {/* LINE CHART */}
          <Box
            gridColumn="span 8" // Occupies 8 columns
            gridRow="span 2" // Spans 2 rows
            backgroundColor={colors.primary[400]}
            p="20px" // Padding for internal spacing
            borderRadius="8px" // Rounded corners for better aesthetics
          >
            <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
              Line Chart
            </Typography>
            <Box height="250px" mt="20px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>

          {/* PIE CHART */}
          <Box
            gridColumn="span 8" // Occupies 8 columns
            gridRow="span 2" // Spans 2 rows
            backgroundColor={colors.primary[400]}
            p="20px"
            borderRadius="8px"
          >
            <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
              Pie Chart
            </Typography>
            <Box height="250px" mt="20px">
              <PieChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
