import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="register" element={ <Register /> } />
      <Route path="login" element={ <Login /> } />
      {/* Define layout and nested routes */ }
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Dashboard /> } />
        <Route path="products" element={ <Products /> } />
        <Route path="users" element={ <Users /> } />
      </Route>
    </Routes>
  );
}

export default App;