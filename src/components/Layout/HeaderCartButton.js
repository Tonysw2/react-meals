import React, { useContext } from 'react';

// JS Imports
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';

// CSS Imports
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const numberCartItems = cartCtx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
