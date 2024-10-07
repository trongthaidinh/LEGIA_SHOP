import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import Button from 'components/Button';
import atmImage from '~/assets/atm.png';
import codImage from '~/assets/cash.png';

const cx = classNames.bind(styles);

const Checkout = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Yến Chưng Đường Phèn',
            quantity: 2,
            price: 200000,
            images: [
                'https://res.cloudinary.com/drioug4df/image/upload/v1728104352/hinh_yen_chung_qhlzho.png',
                '~/assets/productA2.png',
            ],
        },
        {
            id: 2,
            name: 'Chân Yến Rút Lông Cao Cấp',
            quantity: 1,
            price: 200000,
            images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_yen_to_bdz2za.png'],
        },
        {
            id: 3,
            name: 'Yến Chưng Saffron',
            quantity: 1,
            price: 50000,
            images: [
                'https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_set_qua_tang-01_njhh9e.png',
                '~/assets/productB2.png',
            ],
        },
    ];

    const shippingFee = 30000;

    const [paymentMethod, setPaymentMethod] = useState('atm');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        note: '',
        city: '',
        district: '',
        address: '',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
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
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    error = 'Trường này là bắt buộc.';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email không được để trống.';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Email không hợp lệ.';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = 'Số điện thoại không được để trống.';
                } else if (!/^\d{10,11}$/.test(value)) {
                    error = 'Số điện thoại không hợp lệ (10-11 số).';
                }
                break;
            case 'city':
            case 'district':
            case 'address':
                if (!value.trim()) {
                    error = 'Trường này là bắt buộc.';
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const orderId = 950;
            const orderKey = 'wc_order_TN357ttLic2fQ';
            const redirectUrl = `/thanh-toan/order-received/${orderId}/?key=${orderKey}`;

            window.location.href = redirectUrl;
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('checkout-left')}>
                    <h2 className={cx('checkout-left-title')}>Thông tin thanh toán</h2>
                    <form className={cx('checkout-form')}>
                        <div className={cx('form-row')}>
                            <div className={cx('form-group')}>
                                <label>
                                    Họ<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.lastName && <span className={cx('error')}>{formErrors.lastName}</span>}
                            </div>
                            <div className={cx('form-group')}>
                                <label>
                                    Tên<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {formErrors.firstName && <span className={cx('error')}>{formErrors.firstName}</span>}
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>
                                Email<span className={cx('required')}>*</span>
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
                                Số điện thoại<span className={cx('required')}>*</span>
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
                            <label>Ghi chú đơn hàng (tùy chọn)</label>
                            <textarea name="note" value={formData.note} onChange={handleInputChange} rows="4" />
                        </div>
                        <div className={cx('form-row')}>
                            <div className={cx('form-group')}>
                                <label>
                                    Tỉnh/Thành phố<span className={cx('required')}>*</span>
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
                                    Quận/Huyện<span className={cx('required')}>*</span>
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
                                Địa chỉ<span className={cx('required')}>*</span>
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
                        <h3>Phương thức thanh toán</h3>
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
                                <label htmlFor="payATMmentMethod">Chuyển khoản ngân hàng (ATM)</label>
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
                                <label htmlFor="paymentCodMethod">Thanh toán khi nhận hàng (COD)</label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={cx('checkout-right')}>
                    <h3 className={cx('checkout-right-title')}>Tóm tắt đơn hàng</h3>
                    <ul className={cx('cart-summary')}>
                        {cartItems.map((item) => (
                            <li key={item.id} className={cx('cart-item')}>
                                <div className={cx('cart-item-info')}>
                                    <img src={item.images[0]} alt={item.name} className={cx('cart-item-image')} />
                                    <div className={cx('cart-item-name-quantity')}>
                                        <span className={cx('cart-item-name')}>{item.name}</span>
                                        <span className={cx('cart-item-quantity')}>Số lượng: {item.quantity}</span>
                                    </div>
                                </div>
                                <span className={cx('cart-item-price')}>
                                    {((item.price || item.originalPrice) * item.quantity).toLocaleString()}₫
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('summary-detail')}>
                        <span>Tạm tính:</span>
                        <span>{calculateSubtotal().toLocaleString()}₫</span>
                    </div>
                    <div className={cx('summary-detail')}>
                        <span>Phí giao hàng:</span>
                        <span>{shippingFee.toLocaleString()}₫</span>
                    </div>
                    <div className={cx('summary-detail', 'total')}>
                        <span>Tổng cộng:</span>
                        <span>{calculateTotal().toLocaleString()}₫</span>
                    </div>
                    <Button
                        type="submit"
                        rounded
                        large
                        className={cx('checkout-btn', { disabled: !isFormValid() })}
                        disabled={!isFormValid()}
                        onClick={handleSubmit}
                    >
                        Thanh Toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
