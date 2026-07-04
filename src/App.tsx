import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { Navbar } from "./components/Navbar/Navbar";
import { CartDrawer } from "./components/CartDrawer/CartDrawer";
import { AppRoutes } from "./router/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
