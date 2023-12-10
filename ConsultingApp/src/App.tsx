import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import ProductPage from './pages/ProductPage/ProductPage.tsx';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/consultations/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;