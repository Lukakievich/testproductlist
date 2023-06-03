import { Link } from 'react-router-dom'

import { useProductList } from '../../App'
import { getTotalPrice } from '../MainPage/MainPage'

import Button from '@mui/material/Button'
import './Cart.css'

export const Cart = () => {
  const { cart, setCart } = useProductList()

  const onClickDeleteProduct = (index: number) => {
    setCart((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }
  const onClickProductCountDecrement = (index: number) => {
    setCart((prevState) => {
      const newState = [...prevState]
      newState[index].quantity -= 1
      newState[index].totalPrice = getTotalPrice(
        newState[index],
        newState[index].quantity
      )
      return newState
    })
  }
  const onClickProductCountIncrement = (index: number) => {
    setCart((prevState) => {
      const newState = [...prevState]
      newState[index].quantity += 1
      if (newState[index].quantity > 1000) {
        newState[index].quantity = 1000
      }
      newState[index].totalPrice = getTotalPrice(
        newState[index],
        newState[index].quantity
      )
      return newState
    })
  }

  const fullPrice = cart.reduce(
    (accumulator, product) => accumulator + product.totalPrice,
    0
  )

  return (
    <>
      {cart.map((product, index) => {
        if (product.quantity) {
          return (
            <div className="productPrice" key={index}>
              <div className='cartNameText'>
              {product.name}
              </div>
               кол-во:{' '}
              <Button
                variant="outlined"
                onClick={() => onClickProductCountDecrement(index)}
              >
                -
              </Button>{' '}
              <div className='cartQuantityText'>

              {product.quantity}{' '}
              </div>

              <Button
                variant="outlined"
                onClick={() => onClickProductCountIncrement(index)}
              >
                +
              </Button>{' '}
              цена: 
              <div className='cartPriceText'>

              {product.totalPrice}$
              </div>
              <Button
                variant="outlined"
                onClick={() => onClickDeleteProduct(index)}
              >
                Удалить всё
              </Button>
            </div>
          )
        }
      })}
      <div className="fullPrice">Общая сумма товаров: {fullPrice}$</div>
      <Button
        variant="contained"
        children={<Link to="/">К списку товаров</Link>}
      />
    </>
  )
}
