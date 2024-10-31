import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getZhProducts, deleteZhProduct } from '~/services/productService';
import styles from './ProductList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getZhProducts();
                if (data) {
                    setProducts(data);
                } else {
                    setNotification({ message: 'Có lỗi khi tải dữ liệu sản phẩm!', type: 'error' });
                }
            } catch (error) {
                setNotification({ message: 'Lỗi khi tải dữ liệu sản phẩm!', type: 'error' });
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắn chắn sẽ muốn xóa sản phẩm này không?')) {
            try {
                await deleteZhProduct(id);
                setProducts(products.filter((prod) => prod.id !== id));
                setNotification({ message: 'Xóa sản phẩm thành công!', type: 'success' });
            } catch (error) {
                console.error('Error deleting product:', error);
                setNotification({ message: 'Xảy ra lỗi khi xóa sản phẩm.', type: 'error' });
            }
        }
    };

    const filteredProducts = products.filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastProd = currentPage * itemsPerPage;
    const indexOfFirstProd = indexOfLastProd - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProd, indexOfLastProd);

    return (
        <div className={styles.productContainer}>
            <Title className={styles.pageTitle} subText="Danh sách Sản phẩm" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addProductZH} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Sản phẩm
                </Link>
            </div>

            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Giá gốc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((prod) => (
                                <tr key={prod.id}>
                                    <td>
                                        <img src={prod.images[0]} alt={prod.name} className={styles.productImage} />
                                    </td>
                                    <td>{prod.name}</td>
                                    <td>{Number(prod.price).toLocaleString('vi-VN')}đ</td>
                                    <td>{Number(prod.original_price).toLocaleString('vi-VN')}đ</td>
                                    <td>
                                        <Link to={`/zh/admin/edit-product/${prod.id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button onClick={() => handleDelete(prod.id)} className={styles.deleteButton}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
                    Hiện {indexOfFirstProd + 1} đến {Math.min(indexOfLastProd, filteredProducts.length)} của{' '}
                    {filteredProducts.length}
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

export default ProductList;
