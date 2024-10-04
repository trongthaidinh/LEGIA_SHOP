import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss'; // Giả định bạn có file SCSS module cho styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const OrderSuccess = () => {
    const paymentMethod = 'bank';
    const orderDetails = {
        orderId: 'ORD123456',
        orderDate: '2024-10-04',
        totalAmount: '2,000,000 VND',
        bankImage: 'https://example.com/bank-logo.png',
        bankName: 'Ngân hàng XYZ',
        accountHolder: 'Nguyễn Văn A',
        accountNumber: '0123456789',
        qrCode: 'https://example.com/qr-code.png',
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('row', 'success-message')}>
                    <div className={cx('col', 'success-icon')}>
                        <div className={cx('icon-circle')}>
                            <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                        </div>
                        <div className={cx('message')}>
                            <h2 className={cx('message-main')}>Đặt hàng thành công</h2>
                            <p className={cx('message-sub')}>
                                Đơn hàng đã thiết lập thành công. Chúng tôi sẽ liên lạc trực tiếp với quý khách để xác
                                nhận.
                            </p>
                        </div>
                    </div>

                    <div className={cx('col', 'continue-shopping')}>
                        <Link to="/shop">
                            <button className={cx('continue-button')}>Tiếp tục mua sắm</button>
                        </Link>
                    </div>
                </div>

                <div className={cx('row', 'order-summary')}>
                    <div className={cx('col', 'order-info')}>
                        <h3>Tóm tắt đơn hàng</h3>
                        <div className={cx('order-details')}>
                            <p>
                                <strong>Mã đơn hàng:</strong> {orderDetails.orderId}
                            </p>
                            <p>
                                <strong>Ngày mua hàng:</strong> {orderDetails.orderDate}
                            </p>
                            <p>
                                <strong>Tổng cộng:</strong> {orderDetails.totalAmount}
                            </p>
                            <p>
                                <strong>Hình thức thanh toán:</strong>{' '}
                                {paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                            </p>
                        </div>
                    </div>

                    {paymentMethod === 'bank' && (
                        <div className={cx('col', 'bank-info')}>
                            <h3>Thông tin chuyển khoản</h3>
                            <div className={cx('bank-details')}>
                                <img src={orderDetails.bankImage} alt="Bank Logo" className={cx('bank-logo')} />
                                <p>
                                    <strong>Tên ngân hàng:</strong> {orderDetails.bankName}
                                </p>
                                <p>
                                    <strong>Chủ tài khoản:</strong> {orderDetails.accountHolder}
                                </p>
                                <p>
                                    <strong>Số tài khoản:</strong> {orderDetails.accountNumber}
                                </p>
                                <div className={cx('qr-code')}>
                                    <img src={orderDetails.qrCode} alt="QR Code Chuyển khoản" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
