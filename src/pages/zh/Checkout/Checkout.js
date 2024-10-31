import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import Button from 'components/Button';
import atmImage from '~/assets/atm.png';
import codImage from '~/assets/cash.png';
import { createZhOrder } from '~/services/orderService';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

const Checkout = () => {
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedZhProduct'));
    const cartItems = selectedProduct ? [selectedProduct] : JSON.parse(localStorage.getItem('zh_cart')) || [];
    const [loading, setLoading] = useState(false);
    const shippingFee = 30000;

    const [paymentMethod, setPaymentMethod] = useState('atm');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        note: '',
        city: '',
        district: '',
        address: '',
    });

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        district: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'first_name':
            case 'last_name':
                if (!value.trim()) {
                    error = '此字段为必填项';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = '邮箱不能为空';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = '邮箱格式不正确';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = '电话号码不能为空';
                } else if (!/^\d{10,11}$/.test(value)) {
                    error = '电话号码格式不正确（10-11位数字）';
                }
                break;
            case 'city':
            case 'district':
            case 'address':
                if (!value.trim()) {
                    error = '此字段为必填项';
                }
                break;
            default:
                break;
        }

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || item.originalPrice;
            return total + price * item.quantity;
        }, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + shippingFee;
    };

    const isFormValid = () => {
        return (
            Object.values(formErrors).every((error) => !error) &&
            Object.entries(formData)
                .filter(([name]) => name !== 'note')
                .every(([, value]) => value.trim() !== '')
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setLoading(true);
            const subtotal = calculateSubtotal();
            const total = calculateTotal();
            const orderData = {
                ...formData,
                payment_method: paymentMethod,
                items: cartItems,
                subtotal,
                shipping_fee: shippingFee,
                total: total,
            };

            try {
                const orderResponse = await createZhOrder(orderData);
                const orderId = orderResponse.order.id;
                const orderKey = orderResponse.order_key;
                const redirectUrl = `/zh/结账/订单已收到/${orderId}/?key=${orderKey}`;

                if (selectedProduct) {
                    sessionStorage.removeItem('selectedZhProduct');
                } else {
                    localStorage.removeItem('zh_cart');
                }
                const cartUpdateEvent = new CustomEvent('zhCartUpdated');
                window.dispatchEvent(cartUpdateEvent);
                window.location.href = redirectUrl;
            } catch (error) {
                console.error('Order creation error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const convertToYuan = (priceInVND) => {
        return (priceInVND / 3300).toFixed(2);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('checkout-left')}>
                    <h2 className={cx('checkout-left-title')}>结账信息</h2>
                    <form className={cx('checkout-form')}>
                        <div className={cx('form-row')}>
                            <div className={cx('form-group')}>
                                <label>
                                    姓<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.last_name && <span className={cx('error')}>{formErrors.last_name}</span>}
                            </div>
                            <div className={cx('form-group')}>
                                <label>
                                    名<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.first_name && <span className={cx('error')}>{formErrors.first_name}</span>}
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>
                                邮箱<span className={cx('required')}>*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                            />
                            {formErrors.email && <span className={cx('error')}>{formErrors.email}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>
                                电话号码<span className={cx('required')}>*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                            />
                            {formErrors.phone && <span className={cx('error')}>{formErrors.phone}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>订单备注（可选）</label>
                            <textarea name="note" value={formData.note} onChange={handleInputChange} rows="4" />
                        </div>
                        <div className={cx('form-row')}>
                            <div className={cx('form-group')}>
                                <label>
                                    省/市<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.city && <span className={cx('error')}>{formErrors.city}</span>}
                            </div>
                            <div className={cx('form-group')}>
                                <label>
                                    区/县<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.district && <span className={cx('error')}>{formErrors.district}</span>}
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>
                                详细地址<span className={cx('required')}>*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                            />
                            {formErrors.address && <span className={cx('error')}>{formErrors.address}</span>}
                        </div>
                        <h3>支付方式</h3>
                        <div className={cx('payment-method')}>
                            <div className={cx('payment-option')}>
                                <img src={atmImage} alt="ATM" className={cx('payment-image')} />
                                <input
                                    type="radio"
                                    id="payATMmentMethod"
                                    name="paymentMethod"
                                    value="atm"
                                    checked={paymentMethod === 'atm'}
                                    onChange={() => setPaymentMethod('atm')}
                                />
                                <label htmlFor="payATMmentMethod">银行转账 (ATM)</label>
                            </div>
                            <div className={cx('payment-option')}>
                                <img src={codImage} alt="Cash on Delivery" className={cx('payment-image')} />
                                <input
                                    type="radio"
                                    id="paymentCodMethod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <label htmlFor="paymentCodMethod">货到付款 (COD)</label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={cx('checkout-right')}>
                    <h3 className={cx('checkout-right-title')}>订单摘要</h3>
                    <ul className={cx('cart-summary')}>
                        {cartItems.map((item) => (
                            <li key={item.id} className={cx('cart-item')}>
                                <div className={cx('cart-item-info')}>
                                    <img src={item.image} alt={item.name} className={cx('cart-item-image')} />
                                    <div className={cx('cart-item-name-quantity')}>
                                        <span className={cx('cart-item-name')}>{item.name}</span>
                                        <span className={cx('cart-item-quantity')}>数量: {item.quantity}</span>
                                    </div>
                                </div>
                                <span className={cx('cart-item-price')}>
                                    ¥{convertToYuan((item.price || item.originalPrice) * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('summary-detail')}>
                        <span>小计:</span>
                        <span>¥{convertToYuan(calculateSubtotal())}</span>
                    </div>
                    <div className={cx('summary-detail')}>
                        <span>运费:</span>
                        <span>¥{convertToYuan(shippingFee)}</span>
                    </div>
                    <div className={cx('summary-detail', 'total')}>
                        <span>总计:</span>
                        <span>¥{convertToYuan(calculateTotal())}</span>
                    </div>
                    <Button
                        type="submit"
                        rounded
                        large
                        className={cx('checkout-btn', { disabled: !isFormValid() })}
                        disabled={!isFormValid() || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <Spin size="small" /> : '提交订单'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
