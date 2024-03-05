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
import Select from "@mui/material/Select";
import { Alert } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CATEGORY,
  GET_COMPANIES_PRODUCT,
  POST_PRODUCT,
} from "../../utility/queries.js";
import { useForm } from "../../utility/hooks.js";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultTheme = createTheme();

export default function Form() {
  let navigate = useNavigate();
  const { data: dataCategory } = useQuery(GET_CATEGORY);
  const { data: dataCompaniesProduct } = useQuery(GET_COMPANIES_PRODUCT);
  const [errors, setErrors] = useState([]);
  const [number, setNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [disabledOptions, setDisabledOptions] = useState([]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setDisabledOptions([...disabledOptions, selectedValue]);
    onChange([...disabledOptions, selectedValue], "array");
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (!number || !currency) {
      return alert("Agregue el precio y la moneda");
    }
    const newData = {
      price: parseInt(number),
      currency: currency,
    };
    onChange(newData, "object");
    setData([...data, newData]);
    setNumber("");
    setCurrency("");
  };

  const handleDeleteButtonClick = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  function registerProductCallback() {
    registerProduct();
  }
  const { onChange, onSubmit, values } = useForm(registerProductCallback, {
    code: "",
    name: "",
    characteristics: "",
    company: "",
    precies: [],
    category: [],
  });

  const [registerProduct] = useMutation(POST_PRODUCT, {
    update(proxy, { data: { registerProduct: userData } }) {
      navigate("/productos");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { input: values },
  });

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
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="code"
                  required
                  fullWidth
                  id="code"
                  label="Código"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  onChange={onChange}
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
                  onChange={onChange}
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
                  value={number}
                  id="precies"
                  autoComplete="new-password"
                  onChange={handleChangeNumber}
                />
              </Grid>
              <Grid item xs={6} ms={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="currency"
                    value={currency}
                    label="Moneda"
                    onChange={handleChangeCurrency}
                  >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"COL"}>COL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddButtonClick}>
                  Agregar
                </Button>
              </Grid>
              {data.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <p>
                    Moneda: {item.currency}, Precio: {item.price}
                  </p>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteButtonClick(index)}
                  >
                    Eliminar
                  </Button>
                </Grid>
              ))}

              <Grid item xs={12} ms={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categoría
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={values?.category?.length > 5}
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    {dataCategory?.getAllCategory?.map(({ name, _id }) => (
                      <MenuItem
                        key={_id}
                        value={_id}
                        disabled={disabledOptions.includes(_id)}
                      >
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
                    disabled={values?.company?.length > 0}
                    onChange={onChange}
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
          {errors?.map((error) => {
            console.log(error);
            return (
              <Alert severity="error" key={error.message}>
                {error.message}
              </Alert>
            );
          })}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
