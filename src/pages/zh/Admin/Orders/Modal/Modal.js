import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';
import { getZhOrderByKey } from 'services/orderService';

const Modal = ({ show, onClose, order_key }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClosing, setIsClosing] = useState(false); // State to handle closing animation

    useEffect(() => {
        if (show && order_key) {
            const fetchOrderDetails = async () => {
                try {
                    setLoading(true);
                    const orderData = await getZhOrderByKey(order_key);
                    setOrderDetails(orderData);
                } catch (error) {
                    console.error('Failed to fetch order details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrderDetails();
        }
    }, [show, order_key]);

    const getTotalItems = () => {
        return orderDetails?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
    };

    if (!show && !isClosing) return null;

    // Function to close modal with animation
    const handleClose = () => {
        setIsClosing(true); // Trigger the closing animation
        setTimeout(() => {
            setIsClosing(false); // Reset state after animation
            onClose(); // Call onClose to actually hide the modal
        }, 300); // Match the duration of the fade-out animation
    };

    const handleClickOutside = (event) => {
        if (event.target.className.includes(styles.modalOverlay)) {
            handleClose();
        }
    };

    return (
        <div className={`${styles.modalOverlay} ${isClosing ? styles['fade-out'] : ''}`} onClick={handleClickOutside}>
            <div
                className={`${styles.modal} ${isClosing ? styles['fade-out'] : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Chi tiết đơn hàng</h2>
                    <button onClick={handleClose} className={styles.closeButton}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : orderDetails ? (
                        <div className={styles.modalBodyInfo}>
                            <p>
                                <strong>Mã đơn hàng:</strong> {orderDetails.id}
                            </p>
                            <p>
                                <strong>Khách hàng:</strong> {orderDetails.first_name} {orderDetails.last_name}
                            </p>
                            <p>
                                <strong>Email:</strong> {orderDetails.email}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong> {orderDetails.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {orderDetails.address}, {orderDetails.district},{' '}
                                {orderDetails.city}
                            </p>
                            <p>
                                <strong>Phương thức thanh toán:</strong>
                                {orderDetails.payment_method === 'cod'
                                    ? 'Thanh toán khi nhận hàng (COD)'
                                    : 'Chuyển khoản ngân hàng'}
                            </p>
                            <p>
                                <strong>Ghi chú của khách hàng:</strong> {orderDetails.note || 'Không có ghi chú'}
                            </p>
                            <p>
                                <strong>Tổng đơn hàng:</strong> {orderDetails.total.toLocaleString()} VND
                            </p>
                            <h3>Sản phẩm (Số lượng: {getTotalItems()} sản phẩm)</h3>
                            <div className={styles.products}>
                                {orderDetails.items.map((item) => (
                                    <div key={item.id} className={styles.productItem}>
                                        <div className={styles.productImage}>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>
                                                <strong>{item.name}</strong>
                                            </p>
                                            <p>Số lượng: {item.quantity}</p>
                                            <p>Giá: {item.price.toLocaleString()} VND</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Không tìm thấy thông tin đơn hàng.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
