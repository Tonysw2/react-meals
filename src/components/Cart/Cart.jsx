import { useContext, useState } from 'react'
import { api } from '../../lib/axios'

import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [isShowingCheckout, setIsShowingCheckout] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  }

  function handleShowCheckout() {
    setIsShowingCheckout(true)
  }

  async function submitOrderHandler(userData) {
    try {
      await api.post('orders.json', {
        user: userData,
        orderedItems: cartCtx.items,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {!isShowingCheckout ? (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={handleShowCheckout}>
              Order
            </button>
          )}
        </div>
      ) : (
        <Checkout
          onSubmitOrderHandler={submitOrderHandler}
          onCancel={props.onClose}
        />
      )}
    </Modal>
  )
}

export default Cart
