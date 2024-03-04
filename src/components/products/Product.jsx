import * as React from 'react';
import Form from './Form';
import AccordionUsage from "../Accordion";
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../utility/queries.js";
import AlertDialog from '../Dialog';
import List from "../Lists.jsx";

const listTable = ["Nombre", "Nit", "Dirección", "Teléfono", "Acciones"]

export default function Product() {
    const { data } = useQuery(GET_PRODUCTS);
console.log(data);
  return (
    <Grid container spacing={2} sx={{marginTop:"15px", padding:"20px"}}>
    <Grid item xs={12} sm={6}>
      <AccordionUsage ComponenteProp={Form} text={"Agregar producto"} />
    </Grid>
    <Grid item xs={12} sm={6}>
        <List rows={data?.getAllProducts} table={listTable} AlertDialog={AlertDialog}/>
  </Grid>     
  </Grid>
  );
}