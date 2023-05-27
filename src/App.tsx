import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage } from './components/MainPage/MainPage'
import { Cart } from './components/Cart/Cart'

import './App.css'

interface SaleProps {
  quantityForSale: number
  salePrice: number
}

export interface Product {
  name: string
  inputState: number
  price: number
  onSale: boolean
  saleProps?: SaleProps
}

type List = Product[]

export interface ProductInCart {
  name: string
  quantity: number
  price: number
  onSale: boolean
  saleProps?: SaleProps
  totalPrice: number
}

type CartType = ProductInCart[]

interface Value {
  list: List
  setList: React.Dispatch<React.SetStateAction<List>>
  cart: CartType
  setCart: React.Dispatch<React.SetStateAction<CartType>>
}

const ListContext = createContext<Value | null>(null)

export const useProductList = () => {
  const value = useContext(ListContext)

  if (!value) {
    throw new Error('useProductList outside context')
  }

  return value
}

const App = () => {
  const [list, setList] = useState<List>([
    { name: 'Банан', price: 10, inputState: 1, onSale: false },
    { name: 'Яблоко', price: 8, inputState: 1, onSale: false },
    {
      name: 'Папая',
      price: 10,
      inputState: 1,
      onSale: true,
      saleProps: { quantityForSale: 3, salePrice: 25 },
    },
  ])

  const stringStorage = localStorage.getItem('cart')
  let parsedStorage
  if (stringStorage) {
    parsedStorage = JSON.parse(stringStorage)
  }

  const [cart, setCart] = useState<CartType>(parsedStorage || [])

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      localStorage.removeItem('cart')
    }
  }, [cart])

  return (
    <ListContext.Provider value={{ list, setList, cart, setCart }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/testproductlist" element={<MainPage />} />
            <Route path="/testproductlist/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ListContext.Provider>
  )
}

export default App
