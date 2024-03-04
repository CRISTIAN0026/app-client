import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert, Typography } from "@mui/material";
import { LOGIN_USER } from "../utility/queries.js";

function Login() {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([])

    function loginUserCallback() {
        loginUser();
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData}}) {
            context.login(userData);
            navigate("/");
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
        <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px'}}>Iniciar sesión</Typography>
        <p>¡Inicie sesión a continuación!</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField label="Email" name="email" onChange={onChange} type="email"/>
          <TextField label="Password" name="password" onChange={onChange} type="password"/>
        </Stack>
        {errors?.map((error)=>{
          console.log(error)
          return(
              <Alert severity="error" key={error.message}>
                  {error.message}
              </Alert>
          );
        })}
        <Button style={{ textTransform: 'none', backgroundColor:"#ffe900", color:"#000" }} variant="contained" onClick={onSubmit}>Ingresar</Button>
      </Container>
    )
}

export default Login;