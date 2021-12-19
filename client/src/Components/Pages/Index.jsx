import React, { useState, useEffect } from "react";
import axios from "axios";
import { customersApiUrl } from "../../apiUrls";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CenterContainer from "../CenterContainer/CenterContainer";
import Container from "@mui/material/Container";
import DataTable from "../DataTable/DataTable.jsx";
function Index() {
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
}

export default Index;
