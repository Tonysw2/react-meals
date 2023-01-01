import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import { Success } from './components/UI/Success'
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const [sucessIsShown, setSuccessIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  function showSuccessHandler() {
    setSuccessIsShown(true)
  }

  function hideSuccessHandler() {
    setSuccessIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onShowSuccess={showSuccessHandler} />
      )}
      {sucessIsShown && <Success onCloseSuccess={hideSuccessHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
