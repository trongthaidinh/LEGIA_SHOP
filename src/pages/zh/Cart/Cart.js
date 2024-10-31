import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import routes from 'config/routes';

const cx = classNames.bind(styles);

const Cart = () => {
    const getInitialCartItems = () => {
        const savedCart = localStorage.getItem('zh_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    };

    const [cartItems, setCartItems] = useState(getInitialCartItems);

    useEffect(() => {
        localStorage.setItem('zh_cart', JSON.stringify(cartItems));
        const cartUpdateEvent = new CustomEvent('zhCartUpdated');
        window.dispatchEvent(cartUpdateEvent);
    }, [cartItems]);

    const updateQuantity = (id, amount) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item,
            ),
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || item.original_price;
            return total + price * item.quantity;
        }, 0);
    };

    const convertToYuan = (priceInVND) => {
        // Assuming 1 Yuan = 3,300 VND (approximate rate)
        return (priceInVND / 3300).toFixed(2);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-container')}>
                <div className={cx('cart-header')}>
                    <h2 className={cx('cart-title')}>购物车</h2>
                    <span className={cx('cart-count')}>({totalItems} 件商品)</span>
                </div>

                {cartItems.length === 0 ? (
                    <div className={cx('empty-cart')}>
                        <FontAwesomeIcon icon={faShoppingCart} className={cx('empty-cart-icon')} />
                        <p>购物车还是空的！</p>
                    </div>
                ) : (
                    <>
                        <table className={cx('cart-table')}>
                            <thead>
                                <tr>
                                    <th>商品</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>小计</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => {
                                    const price = item.price || item.original_price;
                                    return (
                                        <tr key={item.id} className={cx('product-row')}>
                                            <td className={cx('product-column')}>
                                                <button
                                                    className={cx('remove-btn')}
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    &times;
                                                </button>
                                                <img src={item.image} alt={item.name} className={cx('product-image')} />
                                                <span className={cx('product-name')}>{item.name}</span>
                                            </td>
                                            <td className={cx('price-column')}>
                                                {item.price ? (
                                                    <>
                                                        <span className={cx('current-price')}>
                                                            ¥{convertToYuan(Number(item.price))}
                                                        </span>
                                                        {item.original_price && (
                                                            <span className={cx('original-price')}>
                                                                ¥{convertToYuan(Number(item.original_price))}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className={cx('original-price-only')}>
                                                        ¥{convertToYuan(Number(item.original_price))}
                                                    </span>
                                                )}
                                            </td>
                                            <td className={cx('quantity-column')}>
                                                <button
                                                    className={cx('quantity-btn')}
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} className={cx('quantity-icon')} />
                                                </button>
                                                <span className={cx('quantity')}>{item.quantity}</span>
                                                <button
                                                    className={cx('quantity-btn')}
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className={cx('quantity-icon')} />
                                                </button>
                                            </td>
                                            <td className={cx('total-column')}>
                                                ¥{convertToYuan(price * item.quantity)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className={cx('mobile-cart-list')}>
                            {cartItems.map((item) => {
                                const price = item.price || item.original_price;
                                return (
                                    <div key={item.id} className={cx('mobile-cart-item')}>
                                        <div className={cx('mobile-row')}>
                                            <span className={cx('mobile-label')}>商品：</span>
                                        </div>
                                        <div className={cx('mobile-row', 'product-info')}>
                                            <div className={cx('mobile-row-left')}>
                                                <img src={item.image} alt={item.name} className={cx('mobile-image')} />
                                                <span className={cx('mobile-name')}>{item.name}</span>
                                            </div>
                                            <button
                                                className={cx('mobile-remove-btn')}
                                                onClick={() => removeItem(item.id)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                        <div className={cx('mobile-row', 'price-info')}>
                                            <span className={cx('mobile-label')}>单价：</span>
                                            <span className={cx('price-text')}>
                                                ¥{convertToYuan(item.price || item.original_price)} <br />
                                                {item.price && (
                                                    <span className={cx('original-price')}>
                                                        ¥{convertToYuan(item.original_price)}
                                                    </span>
                                                )}
                                            </span>
                                            <div className={cx('quantity-control')}>
                                                <button
                                                    className={cx('quantity-btn')}
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} className={cx('quantity-icon')} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className={cx('quantity-btn')}
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className={cx('quantity-icon')} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={cx('mobile-row')}>
                                            <span className={cx('mobile-label')}>
                                                小计：{' '}
                                                <span className={cx('total-price')}>
                                                    {(price * item.quantity).toLocaleString()}₫
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={cx('cart-summary')}>
                            <div className={cx('cart-summary-wrapper')}>
                                <span className={cx('cart-summary-label')}>总计：</span>
                                <span className={cx('cart-summary-number')}>
                                    ¥{convertToYuan(calculateTotalPrice())}
                                </span>
                            </div>
                            <Link to={routes.checkoutZH}>
                                <Button primary rounded large>
                                    结算
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
