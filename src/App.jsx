import { Routes, Route } from "react-router-dom";
import Mynav from "./component/Mynav";
import Product from "./component/Product";
import Productdetail from "./component/Productdetail";
import Home from "./component/Home";


function App() {
  return (
    <div>
      <Mynav />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetail/:id" element={<Productdetail />} />
      </Routes>
    
    </div>
  );
}

export default App;
