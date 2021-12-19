import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    padding: theme.spacing(4, 3),
    borderRadius: theme.spacing(1),
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    backgroundColor: "white",
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submitBtn: {
    margin: theme.spacing(2, 0),
  },
  wrapper: {
    position: "relative",
    margin: theme.spacing(1, 0),
  },
  progressClass: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
export default useStyles;
