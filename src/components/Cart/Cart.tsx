import { Link } from 'react-router-dom'

import { useCart } from '../../App'

import './Cart.css'

export const Cart = () => {
  const { cart, setCart } = useCart()
  const productsList = []
  if (cart.banana) {
    productsList.push(
      <div className="productPrice">
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              banana: prevCart.banana - 1,
            }))
          }}
        >
          -
        </button>
        <div>
          Банан {cart.banana} кг цена: {cart.banana * 10}$
        </div>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              banana: prevCart.banana + 1,
            }))
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              banana: 0,
            }))
          }}
        >
          Удалить из корзины
        </button>
      </div>
    )
  }
  if (cart.apple) {
    productsList.push(
      <div className="productPrice">
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              apple: prevCart.apple - 1,
            }))
          }}
        >
          -
        </button>
        <div>
          Яблоко {cart.apple} кг цена: {cart.apple * 8}$
        </div>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              apple: prevCart.apple + 1,
            }))
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              apple: 0,
            }))
          }}
        >
          Удалить из корзины
        </button>
      </div>
    )
  }
  if (cart.papaya) {
    productsList.push(
      <div className="productPrice">
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              papaya: prevCart.papaya - 1,
            }))
          }}
        >
          -
        </button>
        <div>
          Папая {cart.papaya} кг цена:{' '}
          {(cart.papaya % 3) * 10 +
            ((cart.papaya - (cart.papaya % 3)) / 3) * 25}
          $
        </div>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              papaya: prevCart.papaya + 1,
            }))
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              papaya: 0,
            }))
          }}
        >
          Удалить из корзины
        </button>
      </div>
    )
  }

  return (
    <>
      {productsList}
      <Link to="/">К списку товаров</Link>
    </>
  )
}
