import React, { ChangeEvent, useState } from 'react';
import './styles.css'



interface NavbarProps {
    onMaxPriceChange?: (value: string) => void; // Define the prop type
  }
  
  const Navbar: React.FC<NavbarProps> = ({ onMaxPriceChange }) => {
    const [maxPrice, setMaxPrice] = useState('');
  
    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const value = e.target.value;
      setMaxPrice(value);
  
      if (onMaxPriceChange !== undefined) {
        onMaxPriceChange(value);
      }
    };
  
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Вызываем onMaxPriceChange при отправке формы
      if (onMaxPriceChange && maxPrice.trim() !== '') {
        onMaxPriceChange(maxPrice);
      }
    };
  return (
    <nav>
      <a href="/" className="logo">
        IT Strategy
      </a>
      <form className="search" action="/" method="get" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          id="fsearch"
          name="fsearch"
          placeholder={"Искать"}
          className="search-box"
          onChange={handleMaxPriceChange}
        />
        <button type="submit" className="button button-search">
          Искать
        </button>
      </form>
      <div className="line"></div>
    </nav>
  );
};

export default Navbar;