import { useLocation } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes"; 

function App() {
  const location = useLocation();

  // Pages where Header and Footer should be hidden
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Header />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
