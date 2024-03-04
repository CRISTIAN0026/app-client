import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CategoryIcon from "@mui/icons-material/Category";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CATEGORY,
  POST_PRODUCT,
  GET_COMPANIES_PRODUCT,
} from "../../utility/queries.js";

const defaultTheme = createTheme();

export default function Form() {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    characteristics: "",
    company: "",
  });

  console.log(product);
  const { data: dataCategory } = useQuery(GET_CATEGORY);
  const { data: dataCompaniesProduct } = useQuery(GET_COMPANIES_PRODUCT);

  const [precies, setPrecies] = useState([{ precie: "", currency: "" }]);
  const [category, setCategory] = useState([]);
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handlePreciesChange = (event, index) => {
    const newPrecies = [...precies];
    if (!newPrecies[index]) {
      newPrecies[index] = {};
    }
    newPrecies[index][event.target.name] = event.target.value;
    setPrecies(newPrecies);
  };

  const handleCategoryChange = (event) => {
    setCategory([...category, event.target.value]);
  };

  const [registerProduct] = useMutation(POST_PRODUCT, {
    variables: { input: { ...product, precies, category } },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer la llamada al backend para enviar los datos
    registerProduct();
    console.log({ ...product, precies, category });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CategoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Producto
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="code"
                  required
                  fullWidth
                  id="code"
                  label="Código"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  onChange={handleChange}
                  label="Nombre del producto"
                  name="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="characteristics"
                  onChange={handleChange}
                  label="Caracteristicas"
                  name="characteristics"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6} ms={6}>
                <TextField
                  required
                  fullWidth
                  name="precies"
                  label="Precio"
                  type="number"
                  id="precies"
                  autoComplete="new-password"
                  onChange={handlePreciesChange}
                />
              </Grid>
              <Grid item xs={6} ms={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="currency"
                    label="Moneda"
                    onChange={handlePreciesChange}
                  >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"COL"}>COL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} ms={6}></Grid>
              <Grid item xs={12} ms={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categoría
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    label="category"
                    onChange={handleCategoryChange}
                  >
                    {dataCategory?.getAllCategory?.map(({ name, _id }) => (
                      <MenuItem key={_id} value={_id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} ms={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Seleccione la empresa
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Empresa"
                    name="company"
                    onChange={handleChange}
                  >
                    {dataCompaniesProduct?.getAllCompanies?.map(
                      ({ name, _id }) => (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                textTransform: "none",
                backgroundColor: "#ffe900",
                color: "#000",
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
