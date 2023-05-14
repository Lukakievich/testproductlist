import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage } from './components/MainPage/MainPage'
import { Cart } from './components/Cart/Cart'

import './App.css'

interface Product {
  name: string
  price: number
  quantity: number
  onSale: boolean
  salePrice?: number
  saleFormula?: Function
}

type Cart = Product[]

interface Value {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
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
  const [cart, setCart] = useState<Cart>([
    { name: 'Банан', price: 10, quantity: 0, onSale: false },
    { name: 'Яблоко', price: 8, quantity: 0, onSale: false },
    {
      name: 'Папая',
      price: 10,
      quantity: 0,
      onSale: true,
      salePrice: 25,
      saleFormula: function () {
        if (typeof this.salePrice === 'number') {
          const finalPrice =
            (this.quantity % 3) * this.price +
            ((this.quantity - (this.quantity % 3)) / 3) * this.salePrice
          return finalPrice
        }
      },
    },
  ])

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
