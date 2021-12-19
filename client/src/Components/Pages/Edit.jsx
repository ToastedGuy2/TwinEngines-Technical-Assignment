import React from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Typography variant="h1" color="initial">
        Edit Page
      </Typography>
    </div>
  );
}
