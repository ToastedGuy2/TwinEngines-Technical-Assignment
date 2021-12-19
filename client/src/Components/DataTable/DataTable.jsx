import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import Formatter from "../../Helpers/currencyFormatter";
import { Box, Button, Typography } from "@mui/material";
import { AddCircle, Edit, Delete, Person, Badge } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import useStyles from "./style";
function DataTable({ isEditDisable, isDeleteDisable }) {
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
        >
          Add
        </Button>
        <Button
          startIcon={<Edit />}
          variant="contained"
          color="secondary"
          className={classes.toolbar_button}
          disabled={isEditDisable}
        >
          Edit
        </Button>
        <Button
          startIcon={<Delete />}
          variant="contained"
          className={`${classes.toolbar_button} ${classes.danger_btn}`}
          disabled={isDeleteDisable}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default function TransactionTable({ customers }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const classes = useStyles();
  const rows = customers.map((customer) => {
    const { id, type, name, creditLimit, contractDate } = customer;
    return createRowData(id, type, name, creditLimit, contractDate);
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
                isEditDisable:
                  selectedRows.length < 1 || selectedRows.length > 1,
                isDeleteDisable: selectedRows.length <= 0,
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
    field: "type",
    headerName: "Type",
    width: 125,
    description: "Cliente o Prospecto",
    renderCell: (params) =>
      params.value.name === "Cliente" ? (
        <Tooltip title="Cliente">
          <Person color="primary" />
        </Tooltip>
      ) : (
        <Tooltip title="Prospecto">
          <Badge color="secondary" />
        </Tooltip>
      ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
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
];
const createRowData = (id, type, name, creditLimit, contractDate) => ({
  id,
  type,
  name,
  creditLimit,
  contractDate: new Date(contractDate),
});
