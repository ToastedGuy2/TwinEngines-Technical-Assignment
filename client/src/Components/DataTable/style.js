import { makeStyles } from "@mui/styles";
import red from "@mui/material/colors/red";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    // backgroundColor: theme.palette.primary.main,
  },
  title: {
    marginBottom: "8px",
  },
  toolbar_button: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  danger_btn: {
    backgroundColor: red[700],
    color: "#fff",
    "&:hover": {
      backgroundColor: red[900],
    },
  },
  container: {
    height: "430px",
    marginTop: 16,
  },
  subContainer: {
    display: "flex",
    height: "100%",
  },
  subContainerItem: {
    flexGrow: 1,
  },
}));
export default useStyles;
