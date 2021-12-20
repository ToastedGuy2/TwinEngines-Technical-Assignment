import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { customersApiUrl } from "../../apiUrls";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CenterContainer from "../CenterContainer/CenterContainer";
import Container from "@mui/material/Container";
import DataTable from "../DataTable/DataTable.jsx";
function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTryingToDelete, setIsTryingToDelete] = useState(false);
  const [isDeletingCustomer, setIsDeletingCustomer] = useState(false);
  const [idCustomerSelected, setIdCustomerSelected] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [wasOperationSuccess, setWasOperationSuccess] = useState(
    Cookies.get("wasOperationSuccess") ? true : false
  );
  const onDeleteBtnClick = (customerId) => {
    console.log(customerId);
    setIdCustomerSelected(customerId);
    setIsTryingToDelete(true);
  };
  const fetchCustomers = async () => {
    const customers = await axios.get(customersApiUrl);
    setCustomers(customers.data);
    setIsLoading(false);
  };
  const showConfirmationDialog = async () => {
    const customer = customers.find((c) => c.id === idCustomerSelected);
    const didHePressOk = await swal({
      title: "Are you sure you want to delete this customer?",
      text: customer.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    setIsTryingToDelete(false);
    setIsDeletingCustomer(didHePressOk ? didHePressOk : false);
  };
  const deleteCustomer = async () => {
    await axios.delete(`${customersApiUrl}/${idCustomerSelected}`);
    setIsLoading(true);
    setIsDeletingCustomer(false);
    setWasOperationSuccess(true);
  };
  useEffect(() => {
    if (isLoading) {
      fetchCustomers();
    }
    if (isTryingToDelete) {
      showConfirmationDialog();
    }
    if (isDeletingCustomer) {
      deleteCustomer();
    }
  }, [isLoading, isTryingToDelete, isDeletingCustomer]);

  if (isLoading || isDeletingCustomer) {
    return (
      <CenterContainer bgColor="#FCEFF9">
        <CircularProgress />
      </CenterContainer>
    );
  }
  if (wasOperationSuccess) {
    Cookies.remove("wasOperationSuccess");
    swal({
      title: "Operation Complete",
      text: "Changes commited successfully.",
      icon: "success",
    });
    setWasOperationSuccess(false);
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", marginY: "24px" }}>
        <Typography variant="h2" color="primary" component="span">
          Twin
        </Typography>
        <Typography variant="h2" color="secondary" component="span">
          Engines
        </Typography>
      </Box>
      <DataTable customers={customers} onClickHandle={onDeleteBtnClick} />
    </Container>
  );
}

export default Index;
