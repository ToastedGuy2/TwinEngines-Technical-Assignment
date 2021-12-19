import React, { useState, useEffect } from "react";
import axios from "axios";
import { customersApiUrl } from "./apiUrls";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CenterContainer from "./Components/CenterContainer/CenterContainer";
import Container from "@mui/material/Container";
import DataTable from "./Components/DataTable/DataTable.jsx";
import { DataGrid } from "@mui/x-data-grid";
const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    const customers = await axios.get(customersApiUrl);
    setCustomers(customers.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  if (isLoading) {
    return (
      <CenterContainer bgColor="#FCEFF9">
        <CircularProgress />
      </CenterContainer>
    );
  }
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="primary" component="span">
          Twin
        </Typography>
        <Typography variant="h2" color="secondary" component="span">
          Engines
        </Typography>
      </Box>
      <DataTable customers={customers} />
    </Container>
  );
  // return (
  //   <>
  //     <Container maxWidth="sm">
  //       <Box sx={{ textAlign: "center" }}>
  //         <Typography variant="h2" color="primary" component="span">
  //           Twin
  //         </Typography>
  //         <Typography variant="h2" color="secondary" component="span">
  //           Engines
  //         </Typography>
  //       </Box>
  //     </Container>
  //   </>
  // );
}

export default App;
