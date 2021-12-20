import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as Validator from "validatorjs";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import Box from "@mui/material/Box";
import { PersonAdd } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CenterContainer from "../../CenterContainer/CenterContainer.jsx";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import useStyles from "./style.js";
import { customersApiUrl, typesApiUrl } from "../../../apiUrls";
import { Navigate } from "react-router-dom";
const bgColor = "#116A6A";
const bgImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E")`;
export default function AddForm() {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isPostingCustomer, setIsPostingCustomer] = useState(false);
  const [nameInput, setNameInput] = useState({
    value: "",
    error: {
      display: false,
      message: "",
    },
  });
  const [creditLimitInput, setCreditLimitInput] = useState({
    value: 500,
    error: {
      display: false,
      message: "",
    },
  });
  const [contractDateInput, setContractDateInput] = useState({
    value: new Date(),
    error: {
      display: false,
      message: "",
    },
  });
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const handleSelectChange = (event) => {
    setCurrentType(event.target.value);
  };
  const [alertError, setAlertError] = useState({ display: false, message: "" });
  const [isEverythingDone, setIsEverythingDone] = useState(false);
  const displayAlertError = (message) => {
    setAlertError({ display: true, message });
  };
  const fetchTypes = async () => {
    try {
      const { data } = await axios.get(typesApiUrl);
      setTypes(data);
      setCurrentType(data[0].id);
      setIsFetchingData(false);
    } catch (error) {
      displayAlertError(
        "Oops something went wrong on our servers while setting up this form. Please refresh the page and try again"
      );
      setIsFetchingData(false);
    }
  };
  const postCustomer = async () => {
    try {
      await axios.post(customersApiUrl, {
        name: nameInput.value,
        typeId: currentType,
        contractDate: contractDateInput.value,
        creditLimit: creditLimitInput.value,
      });
      setIsPostingCustomer(false);
      Cookies.set("wasOperationSuccess", true);
      setIsEverythingDone(true);
    } catch (error) {
      displayAlertError(
        "Oops something went wrong on our servers while processing your request... Please refresh the page and try again or contact an administrator"
      );
      setIsPostingCustomer(false);
    }
  };
  useEffect(() => {
    if (isFetchingData) {
      fetchTypes();
    }
    if (isPostingCustomer) {
      postCustomer();
    }
  }, [isPostingCustomer]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const applySyncValidation = () => {
      const inputs = {
        name: nameInput.value,
        creditLimit: creditLimitInput.value,
      };
      let rules = {
        name: "required",
        creditLimit: "required",
      };
      let validation = new Validator(inputs, rules, {
        required: "This field is required",
      });
      const clearInputErrors = () => {
        const error = {
          display: false,
          message: "",
        };
        setNameInput({ value: nameInput.value, error });
        setCreditLimitInput({ value: creditLimitInput.value, error });
      };
      clearInputErrors();
      if (validation.passes()) {
        setIsPostingCustomer(true);
      } else {
        if (validation.errors.has("name")) {
          setNameInput({
            value: nameInput.value,
            error: {
              display: true,
              message: validation.errors.get("name"),
            },
          });
        }
        if (validation.errors.has("creditLimit")) {
          setCreditLimitInput({
            value: creditLimitInput.value,
            error: {
              display: true,
              message: validation.errors.get("creditLimit"),
            },
          });
        }
      }
    };
    applySyncValidation();
  };
  const classes = useStyles();
  if (isEverythingDone) {
    return <Navigate to="/" replace />;
  }
  if (isFetchingData) {
    return (
      <CenterContainer bgColor="#FCEFF9">
        <CircularProgress />
      </CenterContainer>
    );
  }
  return (
    <CenterContainer bgColor={bgColor} bgImage={bgImage}>
      <Container component="main" maxWidth="xs">
        <form noValidate onSubmit={onSubmitHandler} className={classes.form}>
          <Box className={classes.box}>
            <Avatar className={classes.avatar}>
              <PersonAdd fontSize="large" color="primary" />
            </Avatar>
            <Typography component="h1" variant="h4">
              Add Customer
            </Typography>
          </Box>
          <Collapse in={alertError.display}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setAlertError(false);
              }}
            >
              {alertError.message}
            </Alert>
          </Collapse>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            margin="normal"
            value={nameInput.value}
            onChange={(e) => {
              setNameInput({ ...nameInput, value: e.target.value });
            }}
            autoFocus
            error={nameInput.error.display}
            helperText={nameInput.error.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="typeLabel">Type</InputLabel>
            <Select
              labelId="typeLabel"
              id="type-select"
              value={currentType}
              label="Age"
              onChange={handleSelectChange}
            >
              {types.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
            fullWidth
            name="creditLimit"
            label="Credit Limit"
            type="number"
            id="creditLimit"
            autoComplete="creditLimit"
            margin="normal"
            value={creditLimitInput.value}
            onChange={(e) => {
              setCreditLimitInput({
                ...creditLimitInput,
                value: e.target.value,
              });
            }}
            error={creditLimitInput.error.display}
            helperText={creditLimitInput.error.message}
          />
          <MobileDateTimePicker
            renderInput={(props) => (
              <TextField
                {...props}
                required
                margin="normal"
                fullWidth
                helperText={contractDateInput.error.message}
              />
            )}
            label="Contract Date"
            value={contractDateInput.value}
            onChange={(selectedDate) => {
              setContractDateInput({
                ...contractDateInput,
                value: selectedDate,
              });
            }}
          ></MobileDateTimePicker>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={isPostingCustomer}
            >
              Save Changes
            </Button>
            {isPostingCustomer && (
              <CircularProgress
                size={24}
                color="primary"
                className={classes.progressClass}
              />
            )}
          </div>
          <Button variant="outlined" color="secondary" fullWidth href="/">
            Cancel
          </Button>
        </form>
      </Container>
    </CenterContainer>
  );
}
