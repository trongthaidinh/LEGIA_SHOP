import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import routes from 'config/routes';

const cx = classNames.bind(styles);

const initialCartItems = [
    {
        id: 1,
        name: 'Yến Chưng Đường Phèn',
        image: 'https://res.cloudinary.com/drioug4df/image/upload/v1728104352/hinh_yen_chung_qhlzho.png',
        price: 200000,
        originalPrice: 300000,
        quantity: 2,
    },
    {
        id: 2,
        name: 'Chân Yến Rút Lông Cao Cấp',
        image: 'https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_yen_to_bdz2za.png',
        originalPrice: 200000,
        quantity: 1,
    },
    {
        id: 3,
        name: 'Yến Chưng Saffron',
        image: 'https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_set_qua_tang-01_njhh9e.png',
        price: 50000,
        originalPrice: 200000,
        quantity: 1,
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

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
            const price = item.price || item.originalPrice;
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-container')}>
                <div className={cx('cart-header')}>
                    <h2 className={cx('cart-title')}>Giỏ hàng</h2>
                    <span className={cx('cart-count')}>({totalItems} sản phẩm)</span>
                </div>

                {/* Bảng hiện tại sẽ chỉ hiển thị khi màn hình >= 1280 */}
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
                                                <span className={cx('current-price')}>
                                                    {item.price.toLocaleString()}₫
                                                </span>
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
                                    <td className={cx('total-column')}>{(price * item.quantity).toLocaleString()}₫</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Danh sách sản phẩm cho màn hình nhỏ */}
                <div className={cx('mobile-cart-list')}>
                    {cartItems.map((item) => {
                        const price = item.price || item.originalPrice;
                        return (
                            <div key={item.id} className={cx('mobile-cart-item')}>
                                <div className={cx('mobile-row')}>
                                    <span className={cx('mobile-label')}>Sản phẩm:</span>
                                </div>
                                <div className={cx('mobile-row', 'product-info')}>
                                    <img src={item.image} alt={item.name} className={cx('mobile-image')} />
                                    <span className={cx('mobile-name')}>{item.name}</span>
                                    <button className={cx('mobile-remove-btn')} onClick={() => removeItem(item.id)}>
                                        &times;
                                    </button>
                                </div>
                                <div className={cx('mobile-row', 'price-info')}>
                                    <span className={cx('mobile-label')}>Đơn giá:</span>
                                    <span className={cx('price-text')}>
                                        {item.price?.toLocaleString() || item.originalPrice.toLocaleString()}₫ <br />
                                        {item.price ? (
                                            <span className={cx('original-price')}>
                                                {item.originalPrice?.toLocaleString()}₫
                                            </span>
                                        ) : (
                                            ''
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
                                        Thành tiền:{' '}
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
                        <span className={cx('cart-summary-label')}>Tổng cộng:</span>
                        <span className={cx('cart-summary-number')}>{calculateTotalPrice().toLocaleString()}₫</span>
                    </div>
                    <Link to={routes.checkout}>
                        <Button primary rounded large>
                            Đặt hàng
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
