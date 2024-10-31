import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getZhOrderByKey } from '~/services/orderService';
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

    const convertToYuan = (priceInVND) => {
        return (priceInVND / 3300).toFixed(2);
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getZhOrderByKey(orderKey);
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

    const formattedDate = new Date(orderDetails.created_at).toLocaleDateString('zh-CN', {
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
                            <h2 className={cx('message-main')}>订单提交成功</h2>
                            <p className={cx('message-sub')}>订单已成功创建。我们将尽快与您联系确认订单详情。</p>
                        </div>
                    </div>

                    <div className={cx('col', 'continue-shopping')}>
                        <Link to={routes.productsZH}>
                            <button className={cx('continue-button')}>继续购物</button>
                        </Link>
                    </div>
                </div>

                <div className={cx('row', 'order-summary')}>
                    <div className={cx('col', 'order-info')}>
                        <h3 className={cx('order-info-title')}>订单摘要</h3>
                        <div className={cx('order-details')}>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>订单编号</span>{' '}
                                <span className={cx('order-details-value')}>{orderDetails.id}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>下单日期</span>{' '}
                                <span className={cx('order-details-value')}>{formattedDate}</span>
                            </p>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>总金额</span>{' '}
                                <span className={cx('order-details-value')}>¥{convertToYuan(orderDetails.total)}</span>
                            </p>
                        </div>
                        <div className={cx('order-details')}>
                            <p className={cx('order-details-text')}>
                                <span className={cx('order-details-label')}>支付方式</span>{' '}
                                <span className={cx('order-details-value')}>
                                    {paymentMethod === 'cod' ? '货到付款' : '银行转账'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {paymentMethod === 'atm' && (
                        <div className={cx('col', 'bank-info')}>
                            <h3 className={cx('bank-info-title')}>银行账户信息</h3>
                            <div className={cx('bank-details')}>
                                <img
                                    src={'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank-Sl.png'}
                                    alt="银行标志"
                                    className={cx('bank-logo')}
                                />
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>银行名称：</span>
                                    <span className={cx('bank-details-value')}>VIETCOMBANK</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>账户名称：</span>
                                    <span className={cx('bank-details-value')}>LeGia'Nest</span>
                                </p>
                                <p className={cx('bank-details-text')}>
                                    <span className={cx('bank-details-label')}>账号：</span>
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
                                    alt="转账二维码"
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
