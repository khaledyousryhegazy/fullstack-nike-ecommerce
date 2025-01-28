import { Route, Routes } from "react-router-dom";
import { ProtectRoutes } from "./components/ProtectRoutes";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      {/* Define layout and nested routes */ }
      <Route path="/" element={
        <ProtectRoutes>
          <Layout />
        </ProtectRoutes>
      }>
        <Route index element={ <Dashboard /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/users" element={ <Users /> } />
        <Route path="/user-profile" element={ <Profile /> } />
      </Route>
    </Routes>
  );
}

export default App;