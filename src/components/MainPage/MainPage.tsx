import { Link } from 'react-router-dom'
import { useProductList, Product, ProductInCart } from '../../App'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

import './MainPage.css'
import { Box } from '@mui/material'

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
    <div className="wrapper">
      <div className="head">
        <div className="head-text">Список продукстов</div>
        <Button
          variant="contained"
          children={<Link to="/testproductlist/cart">Перейти в корзину</Link>}
        />
      </div>
      <div className="cards">
        {list.map((product, index) => {
          return (
            <Box display={'flex'} key={index}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <ListItemText primary={product.name} />
                  <ListItemText primary={`Цена за кг: ${product.price}$`} />
                  <Box display={'flex'} gap={2} mt={3}>
                    <Box maxWidth={95}>
                      <TextField
                        id="outlined-controlled"
                        size="small"
                        autoComplete="off"
                        label="Количество"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">кг</InputAdornment>
                          ),
                        }}
                        value={product.inputState}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChangeInputVal(e, index)
                        }}
                      />
                    </Box>
                    <ListItemText
                      primary={`В корзине:
                      ${
                        cart.find(
                          (cartProduct) => cartProduct.name === product.name
                        )
                          ? cart.find(
                              (cartProduct) => cartProduct.name === product.name
                            )?.quantity
                          : '0'
                      } кг`}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Box mr={1} ml={1}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => onClickAddToCart(product)}
                    >
                      Добавить в корзину
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          )
        })}
      </div>
    </div>
  )
}
