import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import BikePumpMap from "./pages/BikePumpMap.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/bike-pump-map" element={<BikePumpMap />} />
      </Routes>
    </Router>
  );
}

export default App;
