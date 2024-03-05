import React, { useContext } from 'react';
import Form from './Form';
import AccordionUsage from "../Accordion";
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../utility/queries.js";
import AlertDialog from '../Dialog';
import List from "../Lists.jsx";
import { AuthContext } from "../../context/authContext.js";

const listTable = ["Código", "Nombre", "Características", "Empresa"]

export default function Product() {
    const { user } = useContext(AuthContext);
    const { data } = useQuery(GET_PRODUCTS);

  return (
    <Grid container spacing={2} sx={{marginTop:"15px", padding:"20px"}}>
    <Grid item xs={12} sm={6}>
      <AccordionUsage ComponenteProp={Form} text={"Agregar producto"} />
    </Grid>
    <Grid item xs={12} sm={6}>
        <List acciones={"Productos"} user={user} rows={data?.getAllProducts} table={listTable} AlertDialog={AlertDialog}/>
  </Grid>     
  </Grid>
  );
}