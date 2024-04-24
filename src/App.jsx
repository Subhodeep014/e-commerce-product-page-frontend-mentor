import { useEffect, useState } from 'react'
import './App.css'
import Nav from '../components/Nav'
import MainContent from '../components/MainContent'
import { QuantityContext } from '../Context/QuantityContext'
function App() {
  const [quantity, setQuantity] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const price = 125.00;
  const productName = "Fall Limited Edition Sneakers";
  return (
    <>
      <QuantityContext.Provider value={{quantity,setQuantity, price, productName, cartQuantity, setCartQuantity}}>
        <Nav/>
        <MainContent/>
      </QuantityContext.Provider>
    </>
  )
}

export default App
