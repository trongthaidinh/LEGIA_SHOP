import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';

const cx = classNames.bind(styles);

const initialCartItems = [
    {
        id: 1,
        name: 'Yến Chưng Nhân Sâm',
        image: 'https://lagianest.com/wp-content/uploads/2022/11/yen-chung-nhan-sam-LAGIA-NEST.jpg',
        price: 200000,
        originalPrice: 300000,
        quantity: 2,
    },
    {
        id: 2,
        name: 'Chân Yến Rút Lông Cao Cấp',
        image: 'https://lagianest.com/wp-content/uploads/2023/03/chan-yen-rut-long-1.jpg',
        originalPrice: 200000,
        quantity: 1,
    },
    {
        id: 3,
        name: 'Yến Chưng Saffron',
        image: 'https://lagianest.com/wp-content/uploads/2022/12/yen-chung-saffron-LAGIA-NEST.jpg',
        price: 50000,
        originalPrice: 200000,
        quantity: 1,
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Hàm tăng giảm số lượng
    const updateQuantity = (id, amount) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item,
            ),
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Tính tổng số lượng sản phẩm
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Tính tổng giá trị giỏ hàng
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || item.originalPrice;
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <div className={cx('cart-container')}>
            <div className={cx('cart-header')}>
                <h2 className={cx('cart-title')}>Giỏ hàng</h2>
                <span className={cx('cart-count')}>({totalItems} sản phẩm)</span>
            </div>
            <table className={cx('cart-table')}>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số Lượng</th>
                        <th>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => {
                        const price = item.price || item.originalPrice;
                        return (
                            <tr key={item.id} className={cx('product-row')}>
                                <td className={cx('product-column')}>
                                    <button className={cx('remove-btn')} onClick={() => removeItem(item.id)}>
                                        &times;
                                    </button>
                                    <img src={item.image} alt={item.name} className={cx('product-image')} />
                                    <span className={cx('product-name')}>{item.name}</span>
                                </td>
                                <td className={cx('price-column')}>
                                    {item.price ? (
                                        <>
                                            <span className={cx('current-price')}>{item.price.toLocaleString()}₫</span>
                                            {item.originalPrice && (
                                                <span className={cx('original-price')}>
                                                    {item.originalPrice.toLocaleString()}₫
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span className={cx('original-price-only')}>
                                            {item.originalPrice.toLocaleString()}₫
                                        </span>
                                    )}
                                </td>

                                <td className={cx('quantity-column')}>
                                    <button className={cx('quantity-btn')} onClick={() => updateQuantity(item.id, -1)}>
                                        <FontAwesomeIcon icon={faMinus} className={cx('quantity-icon')} />
                                    </button>
                                    <span className={cx('quantity')}>{item.quantity}</span>
                                    <button className={cx('quantity-btn')} onClick={() => updateQuantity(item.id, 1)}>
                                        <FontAwesomeIcon icon={faPlus} className={cx('quantity-icon')} />
                                    </button>
                                </td>
                                <td className={cx('total-column')}>{(price * item.quantity).toLocaleString()}₫</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={cx('cart-summary')}>
                <div className={cx('cart-summary-wrapper')}>
                    <span className={cx('cart-summary-label')}>Tổng cộng:</span>
                    <span className={cx('cart-summary-number')}>{calculateTotalPrice().toLocaleString()}₫</span>
                </div>
                <Button primary rounded large>
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
};

export default Cart;
