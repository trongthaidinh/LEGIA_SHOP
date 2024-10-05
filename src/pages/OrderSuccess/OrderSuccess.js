import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss'; // Giả định bạn có file SCSS module cho styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import routes from 'config/routes';

const cx = classNames.bind(styles);

const OrderSuccess = () => {
    const paymentMethod = 'bank';
    const orderDetails = {
        orderId: 'ORD123456',
        orderDate: '04-10-2024',
        totalAmount: '2,000,000đ',
        bankName: 'VIETCOMBANK',
        accountHolder: "LeGia'Nest",
        accountNumber: '0772332255',
        qrCode: 'https://res.cloudinary.com/drioug4df/image/upload/v1728045474/QRLeGia_Nest_efimz5.png',
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
                        <Link to={routes.products}>
                            <button className={cx('continue-button')}>Tiếp tục mua sắm</button>
                        </Link>
                    </div>
                </div>

                <div className={cx('row', 'order-summary')}>
                    <div className={cx('col', 'order-info')}>
                        <h3 className={cx('order-info-title')}>Tóm tắt đơn hàng</h3>
                        <div className={cx('order-details')}>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Mã đơn hàng</span>{' '}
                                <span className={cx('order-details-value')}>{orderDetails.orderId}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Ngày mua hàng</span>{' '}
                                <span className={cx('order-details-value')}>{orderDetails.orderDate}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Tổng cộng</span>{' '}
                                <span className={cx('order-details-value')}>{orderDetails.totalAmount}</span>
                            </p>
                        </div>
                        <div className={cx('order-details')}>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Hình thức thanh toán</span>{' '}
                                <span className={cx('order-details-value')}>
                                    {paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {paymentMethod === 'bank' && (
                        <div className={cx('col', 'bank-info')}>
                            <h3 className={cx('bank-info-title')}>Thông tin chuyển khoản</h3>
                            <div className={cx('bank-details')}>
                                <img
                                    src={'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank-Sl.png'}
                                    alt="Bank Logo"
                                    className={cx('bank-logo')}
                                />
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>Tên ngân hàng:</span>
                                    <span className={cx('bank-details-value')}>{orderDetails.bankName}</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>Chủ tài khoản:</span>
                                    <span className={cx('bank-details-value')}>{orderDetails.accountHolder}</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>Số tài khoản:</span>
                                    <span className={cx('bank-details-value')}>{orderDetails.accountNumber}</span>
                                </p>
                            </div>
                        </div>
                    )}
                    {paymentMethod === 'bank' && (
                        <div className={cx('col', 'qr-bank')}>
                            <div className={cx('qr-code')}>
                                <img src={orderDetails.qrCode} alt="QR Code Chuyển khoản" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
