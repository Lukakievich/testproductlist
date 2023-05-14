import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '../../App'

import './Cart.css'

export const Cart = () => {
  const { cart, setCart } = useCart()
  const [fullPrice, setFullPrice] = useState<number>(0)

  useEffect(() => {
    cart.forEach((product) =>
      setFullPrice((prevVal) => {
        let newVal = 0
        if (!product.onSale) {
          newVal = prevVal + product.price * product.quantity
        } else if (typeof product.saleFormula === 'function') {
          newVal = prevVal + product.saleFormula()
        }
        return newVal
      })
    )
  }, [cart])

  return (
    <>
      {cart.map((product, index) => {
        if (product.quantity) {
          return (
            <div className="productPrice" key={index}>
              <div>
                {product.name} кол-во: {product.quantity} цена:{' '}
                {!product.onSale
                  ? product.price * product.quantity
                  : typeof product.saleFormula === 'function'
                  ? product.saleFormula()
                  : ''}
                $
              </div>
              <button
                onClick={() => {
                  setCart((prevState) => {
                    const newState = [...prevState]
                    newState[index].quantity = 0
                    return newState
                  })
                  setFullPrice(0)
                }}
              >
                Удалить из корзины
              </button>
            </div>
          )
        }
      })}
      <div className="fullPrice">Общая сумма товаров: {fullPrice}</div>
      <Link to="/testproductlist">К списку товаров</Link>
    </>
  )
}
