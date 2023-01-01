import Modal from '../UI/Modal'
import classes from './Success.module.css'

export function Success(props) {
  return (
    <Modal onClose={props.onCloseSuccess}>
      <p className={classes['success-message']}>
        Your food is on the way! Thanks for buy with us!
      </p>
    </Modal>
  )
}
