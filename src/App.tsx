import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListProvider } from "./context/ListProvider";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ListProvider>
    </BrowserRouter>
  );
}