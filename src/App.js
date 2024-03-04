import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import NavBar from "./components/ResponsiveAppBar;.jsx";
import Product from "./components/products/Product.jsx";
import Company from "./components/company/Company.jsx";
import Login from "./page/login.jsx";
import { AuthContext } from "../src/context/authContext.js";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={user ? <h2>{user.email} is logged in</h2> : <Login />}
        />
        <Route path="/productos" element={<Product />} />
        <Route path="/empresas" element={<Company />} />
        <Route path="/inventario" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
