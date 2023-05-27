import { Link } from 'react-router-dom'

import { useProductList, Product, ProductInCart } from '../../App'
import './MainPage.css'

export function getTotalPrice(
  product: Product | ProductInCart,
  quantity: number
) {
  return !product.onSale
    ? quantity * product.price
    : product.saleProps?.quantityForSale
    ? ((quantity - (quantity % product.saleProps?.quantityForSale)) /
        product.saleProps?.quantityForSale) *
        product.saleProps?.salePrice +
      (quantity % product.saleProps?.quantityForSale) * product.price
    : 0
}

export const MainPage = () => {
  const { list, setList, cart, setCart } = useProductList()

  const onClickAddToCart = (product: Product) => {
    const productIndex = cart.findIndex(
      (cartProduct) => cartProduct.name === product.name
    )

    if (productIndex !== -1) {
      setCart((prevState) => {
        const newState = [...prevState]
        newState[productIndex].quantity += product.inputState
        newState[productIndex].totalPrice = getTotalPrice(
          product,
          newState[productIndex].quantity
        )
        return newState
      })
    } else {
      setCart((prevState) => {
        const newState = [
          ...prevState,
          {
            name: product.name,
            quantity: product.inputState,
            price: product.price,
            onSale: product.onSale,
            saleProps: product.saleProps || undefined,
            totalPrice: getTotalPrice(product, product.inputState),
          },
        ]
        return newState
      })
    }
  }

  const onChangeInputVal = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setList((prevState) => {
      const newState = [...prevState]
      newState[index].inputState = Math.abs(Number(e.target.value))
      return newState
    })
  }

  return (
    <>
      {list.map((product, index) => {
        return (
          <div className="product" key={index}>
            <div className="name">{product.name}</div>
            <div className="price">{product.price}$</div>
            <input
              type="text"
              value={product.inputState}
              onChange={(e) => onChangeInputVal(e, index)}
            ></input>
            <button
              className="addButton"
              onClick={() => onClickAddToCart(product)}
            >
              Добавить в корзину
            </button>
            <div className="name">
              В корзине:{' '}
              {cart.find((cartProduct) => cartProduct.name === product.name)
                ? cart.find((cartProduct) => cartProduct.name === product.name)
                    ?.quantity
                : '0'}
            </div>
          </div>
        )
      })}
      <Link to="/testproductlist/cart">Перейти в корзину</Link>
    </>
  )
}
