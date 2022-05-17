import React, { useContext, useEffect, useState } from 'react';

// JS Imports
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';

// CSS Imports
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${
        btnHighlighted ? classes.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighLighted(true);

        const timer = setTimeout(() => {
            setBtnHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
