import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getOrderByKey } from '~/services/orderService';
import routes from 'config/routes';
import PushNotification from 'components/PushNotification';
import LoadingScreen from 'components/LoadingScreen';

const cx = classNames.bind(styles);

const OrderSuccess = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const orderKey = searchParams.get('key');

    const [orderDetails, setOrderDetails] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('atm');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderByKey(orderKey);
                setOrderDetails(orderData);
                setPaymentMethod(orderData.payment_method);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderKey]);

    if (!orderDetails) {
        return <LoadingScreen isLoading={true} />;
    }

    const formattedDate = new Date(orderDetails.created_at).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

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
                                <span className={cx('order-details-value')}>{orderDetails.id}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Ngày mua hàng</span>{' '}
                                <span className={cx('order-details-value')}>{formattedDate}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>Tổng cộng</span>{' '}
                                <span className={cx('order-details-value')}>
                                    {Number(orderDetails.total).toLocaleString()}đ
                                </span>
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

                    {paymentMethod === 'atm' && (
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
                                    <span className={cx('bank-details-value')}>VIETCOMBANK</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>Chủ tài khoản:</span>
                                    <span className={cx('bank-details-value')}>LeGia'Nest</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>Số tài khoản:</span>
                                    <span className={cx('bank-details-value')}>0772332255</span>
                                </p>
                            </div>
                        </div>
                    )}
                    {paymentMethod === 'atm' && (
                        <div className={cx('col', 'qr-bank')}>
                            <div className={cx('qr-code')}>
                                <img
                                    src={
                                        'https://res.cloudinary.com/drioug4df/image/upload/v1728045474/QRLeGia_Nest_efimz5.png'
                                    }
                                    alt="QR Code Chuyển khoản"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
