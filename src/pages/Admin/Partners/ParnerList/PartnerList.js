import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getPartners, deletePartner } from '~/services/partnerService';
import styles from './PartnerList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const PartnerList = () => {
    const [partners, setPartners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchPartners = async () => {
            const data = await getPartners();
            if (data) {
                setPartners(data);
            } else {
                alert('Failed to fetch partners.');
            }
        };

        fetchPartners();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            try {
                await deletePartner(id);
                setPartners(partners.filter((partner) => partner._id !== id));
                alert('Partner deleted successfully!');
            } catch (error) {
                console.error('Error deleting partner:', error);
                alert('There was an error deleting the partner.');
            }
        }
    };

    const filteredPartners = partners.filter((partner) => partner._id.toString().includes(searchTerm));

    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
    const indexOfLastPartner = currentPage * itemsPerPage;
    const indexOfFirstPartner = indexOfLastPartner - itemsPerPage;
    const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);

    return (
        <div className={styles.partnerContainer}>
            <Title className={styles.pageTitle} text="Danh sách Đối tác" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Đối tác..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addPartner} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Đối tác
                </Link>
            </div>

            <div className={styles.partnerList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Logo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPartners.length > 0 ? (
                            currentPartners.map((partner, index) => (
                                <tr key={partner._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={partner.logo}
                                            alt={`Partner ${partner.id}`}
                                            className={styles.partnerImage}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/admin/update-partner/${partner._id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(partner._id)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Không có dữ liệu</td>
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
                    Hiện {indexOfFirstPartner + 1} đến {Math.min(indexOfLastPartner, filteredPartners.length)} của{' '}
                    {filteredPartners.length}
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

export default PartnerList;
