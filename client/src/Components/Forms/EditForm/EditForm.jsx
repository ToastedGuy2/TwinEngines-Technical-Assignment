import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Box from "@mui/material/Box";
import { PersonAdd } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CenterContainer from "../../CenterContainer/CenterContainer.jsx";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import useStyles from "./style.js";
import * as Validator from "validatorjs";
import axios from "axios";
import { customersApiUrl, typesApiUrl } from "../../../apiUrls";
import { Navigate } from "react-router-dom";
const bgColor = "#116A6A";
const bgImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E")`;
const defaultInput = {
  value: "",
  error: {
    display: false,
    message: "",
  },
};
export default function EditForm({ login }) {
  const [nameInput, setNameInput] = useState(defaultInput);
  const [creditLimitInput, setCreditLimitInput] = useState(defaultInput);
  const [contractDateInput, setContractDateInput] = useState(defaultInput);
  const [alertError, setAlertError] = useState({ display: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (loading) {
      const authNewUser = async () => {
        try {
          await axios.get(`${customersApiUrl}/${nameInput.value}`);
          setNameInput({
            ...nameInput,
            error: {
              display: true,
              message: "Email has already been taken",
            },
          });
        } catch (error) {
          const { status, data } = error.response;
          if (error.response) {
            if (status === 404) {
              try {
                const user = {
                  email: nameInput.value,
                  password: creditLimitInput.value,
                  repeat_password: contractDateInput.value,
                };
                await axios.post(customersApiUrl, user);
                await login(user);
                setComplete(true);
              } catch (error) {
                if (error.response) {
                  displayAlertError(error.response.data.message);
                } else {
                  displayAlertError(
                    "Oops something went wrong. Please try again"
                  );
                }
              }
            }
            if (status === 500) {
              displayAlertError(data.message);
            }
          } else {
            displayAlertError("Oops something went wrong. Please try again");
          }
        } finally {
          setLoading(false);
        }
      };
      authNewUser();
    }
  }, [loading]);
  const displayAlertError = (message) => {
    setAlertError({ display: true, message });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const applySyncValidation = () => {
      const inputs = {
        email: nameInput.value,
        password: creditLimitInput.value,
        repeat_password: contractDateInput.value,
      };
      let rules = {
        email: "required|email",
        password: "required",
        repeat_password: "required|same:password",
      };
      let validation = new Validator(inputs, rules, {
        same: "Passwords do not match",
        required: "This field is required",
      });
      const clearInputErrors = () => {
        const error = {
          display: false,
          message: "",
        };
        setNameInput({ value: nameInput.value, error });
        setCreditLimitInput({ value: creditLimitInput.value, error });
        setContractDateInput({ value: contractDateInput.value, error });
      };
      clearInputErrors();
      if (validation.passes()) {
        setLoading(true);
      } else {
        if (validation.errors.has("email")) {
          setNameInput({
            value: nameInput.value,
            error: {
              display: true,
              message: validation.errors.get("email"),
            },
          });
        }
        if (validation.errors.has("password")) {
          setCreditLimitInput({
            value: creditLimitInput.value,
            error: {
              display: true,
              message: validation.errors.get("password"),
            },
          });
        }
        if (validation.errors.has("repeat_password")) {
          setContractDateInput({
            value: contractDateInput.value,
            error: {
              display: true,
              message: validation.errors.get("repeat_password"),
            },
          });
        }
      }
    };
    applySyncValidation();
  };
  const classes = useStyles();
  if (complete) {
    return <Navigate to="/" replace />;
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
          <TextField
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
          {/* <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Contract Date"
            value={contractDateInput.value}
            onChange={(e) => {
              setContractDateInput({
                ...contractDateInput,
                value: e.target.value,
              });
            }}
          ></DateTimePicker> */}

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={loading}
            >
              Save Changes
            </Button>
            {loading && (
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

{
  /* <DateTimePicker
renderInput={
  <TextField
    variant="outlined"
    required
    fullWidth
    name="contractDate"
    label="Contract Date"
    type="text"
    id="contractDate"
    autoComplete="contractDate"
    margin="normal"
    helperText={contractDateInput.error.message}
  />
}
label="Contract Date"
value={contractDateInput.value}
onChange={(e) => {
  setContractDateInput({
    ...contractDateInput,
    value: e.target.value,
  });
}}
></DateTimePicker> */
}
