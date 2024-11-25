import { Box } from "@mui/material";
import Header from "../../template/header";
import BarChart from "../../template/barchart";

const Bar = () => {
  return (
    <Box m="10px">
      <Header title="Bar Chart" subtitle="Genres and Sales Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
