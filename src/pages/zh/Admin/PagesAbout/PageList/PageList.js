import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faAngleRight, faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './PageList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import { getZhPageContent, deleteZhPageContent } from '~/services/pageService';
import PushNotification from '~/components/PushNotification';
import { Modal } from 'antd';

const PageInfoList = () => {
    const [pages, setPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const data = await getZhPageContent();
                if (data) {
                    setPages(data);
                } else {
                    setNotification({ message: 'Không có dữ liệu trang.', type: 'success' });
                }
            } catch (error) {
                console.error('Error fetching pages:', error);
                setNotification({ message: 'Lỗi khi tải dữ liệu trang.', type: 'error' });
            }
        };

        fetchPages();
    }, []);

    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa trang này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                try {
                    await deleteZhPageContent(id);
                    setPages(pages.filter((page) => page.id !== id));
                    setNotification({ message: 'Xóa trang thành công.', type: 'success' });
                } catch (error) {
                    setNotification({ message: 'Lỗi khi xóa trang.', type: 'error' });
                }
            },
        });
    };

    const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

    return (
        <div className={styles.pageContainer}>
            <Title className={styles.pageTitle} subText="Danh sách Trang" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Trang..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addPageZH} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Trang
                </Link>
            </div>

            <div className={styles.pageList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Nội dung</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPages.length > 0 ? (
                            currentPages.map((page, index) => (
                                <tr key={page._id}>
                                    <td>{indexOfFirstPage + index + 1}</td>
                                    <td>{page.name}</td>
                                    <td>
                                        <div
                                            className={styles.pageContent}
                                            dangerouslySetInnerHTML={{ __html: page.content }}
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            to={`/zh/admin/update-page`}
                                            state={{ slug: page.slug }}
                                            className={styles.editButton}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button onClick={() => handleDelete(page.id)} className={styles.deleteButton}>
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

            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstPage + 1} đến {Math.min(indexOfLastPage, filteredPages.length)} của{' '}
                    {filteredPages.length}
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

export default PageInfoList;
