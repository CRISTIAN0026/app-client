import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BusinessIcon from '@mui/icons-material/Business';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../utility/hooks";
import { useMutation } from "@apollo/client";
import { POST_COMPANY } from "../../utility/queries.js";


const defaultTheme = createTheme();

export default function Form() {
const [ errors, setErrors ] = useState([])

function registerCompanyCallback() {
    registerCompany();
}

const { onChange, onSubmit, values } = useForm(registerCompanyCallback, {
    nit: '',
    name: '',
    address: '',
    phone: ''
});

const [registerCompany] = useMutation(POST_COMPANY, {
    update(proxy, { data: { registerCompany: userData}}) {
    },
    onError({ graphQLErrors }) {
        setErrors(graphQLErrors)
    },
    variables: { companyInput: values }
})

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BusinessIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Empresa
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nit"
                  onChange={onChange}
                  required
                  fullWidth
                  id="nit"
                  label="NIT"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={onChange}
                  id="name"
                  label="Nombre de la empresa"
                  name="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={onChange}
                  id="address"
                  label="Dirección"
                  name="address"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={onChange}
                  name="phone"
                  label="Teléfono"
                  type="number"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
            </Grid>
            {errors?.map((error)=>{
      console.log(error)
      return(
          <Alert severity="error" key={error.message}>
              {error.message}
          </Alert>
      );
    })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ textTransform: 'none', backgroundColor:"#ffe900", color:"#000"}}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}