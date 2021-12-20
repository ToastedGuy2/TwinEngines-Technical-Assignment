import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import Formatter from "../../Helpers/currencyFormatter";
import { Box, Button, Typography } from "@mui/material";
import { AddCircle, Edit, Delete, Lightbulb } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import red from "@mui/material/colors/red";
import useStyles from "./style";
function DataTable({ isDeleteDisable, idCustomerSelected, onClickHandle }) {
  const classes = useStyles();
  return (
    <Box className={classes.toolbar}>
      <Typography variant="h5" className={classes.title}>
        Customers
      </Typography>
      <Box>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          color="primary"
          className={classes.toolbar_button}
          href="/add"
        >
          Add
        </Button>
        <Button
          startIcon={<Delete />}
          variant="contained"
          className={`${classes.toolbar_button} ${classes.danger_btn}`}
          disabled={isDeleteDisable}
          onClick={() => {
            onClickHandle(idCustomerSelected);
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default function TransactionTable({ customers, onClickHandle }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const classes = useStyles();
  const rows = customers.map((customer) => {
    const { id, type, name, creditLimit, contractDate, isActive } = customer;
    return createRowData(
      isActive,
      name,
      type.name,
      creditLimit,
      contractDate,
      id
    );
  });
  return (
    <Box className={classes.container}>
      <Box className={classes.subContainer}>
        <Box className={classes.subContainerItem}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            components={{
              Toolbar: DataTable,
            }}
            onSelectionModelChange={(obj) => {
              setSelectedRows(obj);
            }}
            componentsProps={{
              toolbar: {
                isDeleteDisable:
                  selectedRows.length <= 0 || selectedRows.length >= 2,
                onClickHandle,
                idCustomerSelected:
                  selectedRows.length > 0 ? selectedRows[0] : null,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "isActive",
    headerName: "Status",
    width: 100,
    description: "Active or Inactive",
    renderCell: (params) =>
      params.value ? (
        <Tooltip title="Active">
          <Lightbulb style={{ color: "#ffd60a" }} />
        </Tooltip>
      ) : (
        <Tooltip title="Inactive">
          <Lightbulb />
        </Tooltip>
      ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    description: "Cliente or Prospecto",
  },
  {
    field: "creditLimit",
    headerName: "Credit Limit",
    width: 150,
    valueFormatter: (params) => {
      return Formatter.format(params.value);
    },
  },
  {
    field: "contractDate",
    headerName: "Date",
    width: 200,
    valueFormatter: (params) => {
      return DateTime.fromJSDate(params.value).toLocaleString(
        DateTime.DATETIME_MED
      );
    },
  },
  {
    field: "id",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      const link = `/edit/${params.value}`;
      return (
        <>
          <Button
            startIcon={<Edit />}
            variant="contained"
            color="secondary"
            href={link}
          >
            Edit
          </Button>
        </>
      );
    },
  },
];
const createRowData = (
  isActive,
  name,
  type,
  creditLimit,
  contractDate,
  id
) => ({
  isActive,
  name,
  type,
  creditLimit,
  contractDate: new Date(contractDate),
  id,
});
