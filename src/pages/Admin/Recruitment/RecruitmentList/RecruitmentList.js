import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getRecruitmentAll, deleteRecruitment } from '~/services/recruitmentService';
import styles from './RecruitmentList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';
import classNames from 'classnames/bind';

const RecruitmentList = () => {
    const [recruitment, setRecruitment] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const cx = classNames.bind(styles);

    useEffect(() => {
        const fetchRecruitment = async () => {
            try {
                const data = await getRecruitmentAll();
                if (data) {
                    setRecruitment(data);
                } else {
                    setNotification({ message: 'Failed to fetch recruitment.', type: 'error' });
                }
            } catch (error) {
                console.error('Error fetching recruitment:', error);
                setNotification({ message: 'Error fetching recruitment.', type: 'error' });
            }
        };

        fetchRecruitment();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tuyển dụng này?')) {
            try {
                await deleteRecruitment(id);
                setRecruitment(recruitment.filter((article) => article._id !== id));
                setNotification({ message: 'Tin đã được xóa thành công!', type: 'success' });
            } catch (error) {
                console.error('Có lỗi khi xóa tin:', error);
                setNotification({ message: 'Đã xảy ra lỗi khi xóa tuyển dụng!', type: 'error' });
            }
        }
    };

    const filteredRecruitment = recruitment.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredRecruitment.length / itemsPerPage);
    const indexOfLastRecruitment = currentPage * itemsPerPage;
    const indexOfFirstRecruitment = indexOfLastRecruitment - itemsPerPage;
    const currentRecruitment = filteredRecruitment.slice(indexOfFirstRecruitment, indexOfLastRecruitment);

    return (
        <div className={styles.recruitmentContainer}>
            <Title className={styles.pageTitle} text="Danh sách tuyển dụng" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm tuyển dụng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addRecruitment} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới tuyển dụng
                </Link>
            </div>

            <div className={styles.recruitmentList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Tóm tắt</th>
                            <th>Nổi bật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecruitment.length > 0 ? (
                            currentRecruitment.map((article) => (
                                <tr key={article._id}>
                                    <td>
                                        <img
                                            src={article.images}
                                            alt={article.title}
                                            className={cx('recruitmentImage')}
                                        />
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.summary}</td>
                                    <td>{article.isFeatured ? 'Có' : 'Không'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/update-recruitment/${article._id}`}
                                            className={styles.editButton}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
                    Hiện {indexOfFirstRecruitment + 1} đến{' '}
                    {Math.min(indexOfLastRecruitment, filteredRecruitment.length)} của {filteredRecruitment.length}
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
        </div>
    );
};

export default RecruitmentList;
