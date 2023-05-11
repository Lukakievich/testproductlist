import { Link } from 'react-router-dom'

import { useCart } from '../../App'

import './MainPage.css'

export const MainPage = () => {
  const { cart, setCart } = useCart()

  return (
    <>
      <div className="product">
        <div className="name">Банан</div>
        <div className="price">цена за кг: 10$</div>
        <input
          type="text"
          value={cart.bananaAmountToAdd}
          onChange={(e) =>
            setCart((prevCart) => ({
              ...prevCart,
              bananaAmountToAdd: Math.abs(Number(e.target.value)),
            }))
          }
        />
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              banana: prevCart.banana + prevCart.bananaAmountToAdd,
            }))
          }}
          className="addButton"
        >
          Добавить в корзину
        </button>
      </div>
      <div className="product">
        <div className="name">Яблоко</div>
        <div className="price">цена за кг: 8$</div>
        <input
          type="text"
          value={cart.appleAmountToAdd}
          onChange={(e) =>
            setCart((prevCart) => ({
              ...prevCart,
              appleAmountToAdd: Math.abs(Number(e.target.value)),
            }))
          }
        />
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              apple: prevCart.apple + prevCart.appleAmountToAdd,
            }))
          }}
          className="addButton"
        >
          Добавить в корзину
        </button>
      </div>
      <div className="product">
        <div className="name">Папайя</div>
        <div className="price">цена за кг: 10$ (скидка 5$ за каждые 3кг)</div>
        <input
          type="text"
          value={cart.papayaAmountToAdd}
          onChange={(e) =>
            setCart((prevCart) => ({
              ...prevCart,
              papayaAmountToAdd: Math.abs(Number(e.target.value)),
            }))
          }
        />
        <button
          onClick={() => {
            setCart((prevCart) => ({
              ...prevCart,
              papaya: prevCart.papaya + prevCart.papayaAmountToAdd,
            }))
          }}
          className="addButton"
        >
          Добавить в корзину
        </button>
      </div>
      <Link to="/cart">Перейти в корзину</Link>
    </>
  )
}
