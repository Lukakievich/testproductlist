import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage } from './components/MainPage/MainPage'
import { Cart } from './components/Cart/Cart'

import './App.css'

interface Cart {
  banana: number
  bananaAmountToAdd: number
  apple: number
  appleAmountToAdd: number
  papaya: number
  papayaAmountToAdd: number
}

interface Value {
  cart: Cart
  setCart: React.Dispatch<
    React.SetStateAction<{
      banana: number
      bananaAmountToAdd: number
      apple: number
      appleAmountToAdd: number
      papaya: number
      papayaAmountToAdd: number
    }>
  >
}

const CartContext = createContext<Value | null>(null)

export const useCart = () => {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart outside context')
  }

  return value
}

function App() {
  const [cart, setCart] = useState<Cart>({
    banana: 0,
    bananaAmountToAdd: 1,
    apple: 0,
    appleAmountToAdd: 1,
    papaya: 0,
    papayaAmountToAdd: 1,
  })

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
