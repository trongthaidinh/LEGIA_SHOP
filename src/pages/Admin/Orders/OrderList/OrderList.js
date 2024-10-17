import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEye, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './OrderList.module.scss';
import { getOrders, updateStatus } from 'services/orderService';
import PushNotification from '~/components/PushNotification';
import { Spin, Modal as AntdModal } from 'antd';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingOrderId, setLoadingOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderData = await getOrders();
                setOrders(orderData);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCancelOrder = async (orderId) => {
        AntdModal.confirm({
            title: 'Xác nhận hủy đơn hàng',
            content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
            onOk: async () => {
                setLoadingOrderId(orderId);
                try {
                    await updateStatus(orderId, { status: 'canceled' });
                    setOrders((prevOrders) =>
                        prevOrders.map((order) => (order.id === orderId ? { ...order, status: 'canceled' } : order)),
                    );
                    setNotification({ message: 'Đơn hàng đã được hủy thành công', type: 'success' });
                } catch (error) {
                    setNotification({ message: 'Không thể hủy đơn hàng', type: 'error' });
                } finally {
                    setLoadingOrderId(null);
                }
            },
            onCancel: () => {
                console.log('Hủy hành động hủy đơn hàng');
            },
        });
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setLoadingOrderId(orderId);
        try {
            await updateStatus(orderId, { status: newStatus });
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
            );
            setNotification({ message: 'Cập nhật trạng thái thành công', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Không thể cập nhật trạng thái', type: 'error' });
        } finally {
            setLoadingOrderId(null);
        }
    };

    const filteredOrders = orders.filter(
        (order) =>
            order.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders
        .filter(
            (order) =>
                order.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.orderContainer}>
            <h1 className={styles.title}>Danh sách đơn hàng</h1>

            <input
                type="text"
                placeholder="Tìm kiếm theo tên khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />

            {notification.message && <PushNotification message={notification.message} type={notification.type} />}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt hàng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.first_name + ' ' + order.last_name}</td>
                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                            <td>
                                <div className={styles.statusContainer}>
                                    {loadingOrderId === order.id ? (
                                        <Spin className={styles.spinIcon} size="small" />
                                    ) : (
                                        <select
                                            className={`${styles.selectStatus} ${styles[order.status]}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="pending">Chờ xử lý</option>
                                            <option value="completed">Đã xử lý</option>
                                            <option value="canceled">Đã hủy</option>
                                        </select>
                                    )}
                                </div>
                            </td>

                            <td>
                                <button onClick={() => handleViewOrder(order)} className={styles.viewButton}>
                                    <FontAwesomeIcon icon={faEye} /> Xem
                                </button>
                                <button
                                    onClick={() => handleCancelOrder(order.id)}
                                    className={styles.actionButton}
                                    disabled={order.status === 'canceled'}
                                >
                                    <FontAwesomeIcon icon={faXmark} /> Hủy đơn hàng
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Items per page selection */}
            <div className={styles.itemsPerPageContainer}>
                <label htmlFor="itemsPerPage">Số mục mỗi trang:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className={styles.itemsPerPageSelect}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, filteredOrders.length)} của{' '}
                    {filteredOrders.length}
                </span>
                <div className={styles.paginationControls}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>

            {/* Modal hiển thị chi tiết đơn hàng */}
            {selectedOrder && (
                <Modal
                    order_key={selectedOrder.order_key}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="Chi tiết đơn hàng"
                />
            )}
        </div>
    );
};

export default OrderList;
