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

  const renderHome = () => user?.email ? <h2>{user?.email} ya inicio sesión </h2> : <Landing />;
  const renderLogin = () => user ? <h2>{user?.email} is logged in</h2> : <Login />;
  const renderProduct = () => user?.email === "admin@example.com" ? <Product /> : <h2>Acceso denegado</h2>;

  return (
    <div className="App">
      <NavBar user={user}/>
      <Routes>
      <Route path="*" element={renderHome()} />
        <Route path="/" element={renderHome()} />
        <Route path="/login" element={renderLogin()} />
        <Route path="/productos" element={renderProduct()} />
        <Route path="/empresas" element={<Company />} />
      </Routes>
    </div>
  );
}

export default App;
