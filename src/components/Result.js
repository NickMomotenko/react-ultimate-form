import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainContainer from "./MainContainer";

import Typography from "@material-ui/core/Typography";

import { InsertDriveFile } from "@material-ui/icons";

import { useData } from "../DataContext";

import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import PrimaryButton from "./Button";

import Swal from "sweetalert2";

import Confetti from "react-confetti";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

const Result = () => {
  const [successFrom, setSuccessFrom] = useState(false);

  const styles = useStyles();

  const { data } = useData();

  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");

  const { files } = data;

  const onSubmit = () => {
    Swal.fire("Greet job!", "Data sent!", "success");
    setSuccessFrom(true);
  };

  if (successFrom) {
    return <Confetti />;
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3
      </Typography>
      <TableContainer className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell align="right">{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files && (
        <>
          <Typography component="h2" variant="h5">
            Files
          </Typography>
          <List>
            {files.map((f, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link to="/">Start over</Link>
    </MainContainer>
  );
};

export default Result;
