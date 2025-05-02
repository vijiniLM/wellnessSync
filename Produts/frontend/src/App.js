import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Components/Product';
import AddStock from './Components/AddStock';
import Shop from './Components/Shop';
import WhishList from './Components/WhishList'; 
import UpdateStock from './Components/UpdateStock';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/AddStock' element={<AddStock />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/whishList' element={<WhishList />} /> 
        <Route path='/UpdateStock/:id' element={<UpdateStock />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
