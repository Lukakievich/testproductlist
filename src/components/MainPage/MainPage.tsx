import { Link } from 'react-router-dom'

import { useCart } from '../../App'

import './MainPage.css'

export const MainPage = () => {
  const { cart, setCart } = useCart()

  return (
    <>
      {cart.map((product, index) => {
        return (
          <div className="product" key={index}>
            <div className="name">{product.name}</div>
            <div className="price">{product.price}$</div>
            <button
              className="addButton"
              onClick={() => {
                setCart((prevState) => {
                  const newState = [...prevState]
                  newState[index].quantity += 1
                  return newState
                })
              }}
            >
              Добавить в корзину
            </button>
            <div className="name">В корзине: {product.quantity}</div>
          </div>
        )
      })}
      <Link to="/cart">Перейти в корзину</Link>
    </>
  )
}
