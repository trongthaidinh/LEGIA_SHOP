import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteReview, getReviews } from '~/services/reviewService';
import styles from './ReviewList.module.scss';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setNotification({ message: 'Error fetching reviews.', type: 'error' });
            }
        };

        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
            try {
                await deleteReview(id);
                setReviews(reviews.filter((review) => review.id !== id));
                setNotification({ message: 'Đánh giá đã được xóa thành công!', type: 'success' });
            } catch (error) {
                console.error('Có lỗi khi xóa đánh giá:', error);
                setNotification({ message: 'Đã xảy ra lỗi khi xóa đánh giá!', type: 'error' });
            }
        }
    };

    const filteredReviews = reviews.filter((review) => review.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={styles.reviewContainer}>
            <Title className={styles.pageTitle} subText="Danh sách Đánh giá" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Đánh giá..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to="/admin/add-review" className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Đánh giá
                </Link>
            </div>

            <div className={styles.reviewList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Đánh giá</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>
                                        <img src={review.image} alt={review.name} className={styles.reviewImage} />
                                    </td>
                                    <td>{review.name}</td>
                                    <td>{review.review}</td>
                                    <td>
                                        <Link to={`/admin/update-review/${review.id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button onClick={() => handleDelete(review.id)} className={styles.deleteButton}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewList;
