import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { exportPDF } from "../utility/exportPDF.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function List({ rows, table, AlertDialog, user, acciones }) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {table.map((event, index) => (
              <StyledTableCell align={index === 0 ? "" : "right"}>
                {event}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {acciones === "Empresas" && rows?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nit}</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              {acciones === "Empresas" && user?.email === "admin@example.com" ? <StyledTableCell align="right">
                <Button >Eliminar</Button>
                <AlertDialog row={row}/> 
              </StyledTableCell> : <StyledTableCell align="right">Ninguna</StyledTableCell>}
            </StyledTableRow>
          ))}
                  {acciones === "Productos" && rows?.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.code}
            </StyledTableCell>
            <StyledTableCell align="right">{row.name}</StyledTableCell>
            <StyledTableCell align="right">{row.characteristics}</StyledTableCell>
            <StyledTableCell align="right">{row.company.name}</StyledTableCell>
          </StyledTableRow>
        ))
        }
  {acciones === "Productos" && <Button
    onClick={()=> exportPDF(rows)}
    variant="contained"
    sx={{ my: 2,background:"black", color: "#ffe900", display: "block" }}
  >
    Descargar inventario
  </Button>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
