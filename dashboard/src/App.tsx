import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      {/* Define layout and nested routes */ }
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Dashboard /> } />
        <Route path="products" element={ <Products /> } />
      </Route>
    </Routes>
  );
}

export default App;