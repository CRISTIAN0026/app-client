import React from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {
    let navigate = useNavigate();

  return (
    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', with: '90vh'}}>
    <Paper 
    sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vh',
        height: '50vh',
        border: '1px solid #000'
      }}
    elevation={3}>
      <Box
      >
        <Typography variant="h3" style={{ color:'#000' }}>LITE THINKING</Typography>
        <Typography variant="h8" style={{ color:'#000' }}>Inicia sesión para acceder a los recursos</Typography>
        <Box sx={{
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center',
            marginTop:'20px'
        }}>
        <Button  style={{ textTransform: 'none', backgroundColor:"#ffe900", color:"#000"}} variant="contained" onClick={() => navigate("/login")}>Inicia sesión</Button>
        </Box>
      </Box>
      </Paper>
    </Box>
  );
}

export default Landing;
