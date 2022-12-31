import { useContext, useRef } from 'react'
import CartContext from '../../store/cart-context'
import classes from './Checkout.module.css'

const Checkout = (props) => {
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const { resetItems } = useContext(CartContext)

  const isEmpty = (value) => value.trim() === ''
  const isNotEightChars = (value) => value.trim().length < 8

  const confirmHandler = (event) => {
    event.preventDefault()

    const name = nameInputRef.current.value
    const street = streetInputRef.current.value
    const postalCode = postalCodeInputRef.current.value
    const city = cityInputRef.current.value

    const isNameValid = !isEmpty(name)
    const isStreetValid = !isEmpty(street)
    const isPostalCodeValid = !isNotEightChars(postalCode)
    const isCityNameValid = !isEmpty(city)

    const isFormValid =
      isNameValid && isStreetValid && isPostalCodeValid && isCityNameValid
    console.log(isNameValid, isStreetValid, isPostalCodeValid, isCityNameValid)

    if (!isFormValid) {
      return null
    }

    props.onSubmitOrderHandler({
      name,
      street,
      postalCode,
      city,
    })

    props.onCancel()
    resetItems()
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" required />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  )
}

export default Checkout
