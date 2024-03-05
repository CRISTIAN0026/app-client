import React, { useContext } from "react";
import Form from "./Form";
import AccordionUsage from "../Accordion";
import { Grid } from "@mui/material";
import AlertDialog from '../Dialog';
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "../../utility/queries.js";
import List from "../Lists.jsx";
import { AuthContext } from "../../context/authContext.js";

const listTable = ["Nombre", "Nit", "Dirección", "Teléfono", "Acciones"]

export default function Company() {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(GET_COMPANIES);
  return (
    <Grid container spacing={2} sx={{marginTop:"15px", padding:"20px"}}>
      {user?.email === "admin@example.com" && <Grid item xs={12} sm={6}>
        <AccordionUsage ComponenteProp={Form} text={"Agregar empresa"} />
      </Grid>}
      <Grid item xs={12} sm={user?.email === "admin@example.com" ? 6 : 12}>
          <List acciones={"Empresas"} user={user} rows={data?.getAllCompanies} table={listTable} AlertDialog={AlertDialog}/>
    </Grid>     
    </Grid>
  );
}
