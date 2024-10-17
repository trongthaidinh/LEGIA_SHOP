import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import Product from '~/components/Product';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getProducts, getProductListBySlug } from '~/services/productService';
import { getCategoriesBySlug } from '~/services/categoryService';

const cx = classNames.bind(styles);

const Products = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const filterRef = useRef(null);
    const productsPerPage = 9;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                if (slug) {
                    const [fetchedProducts, fetchedCategories] = await Promise.all([
                        getProductListBySlug(slug),
                        getCategoriesBySlug('san-pham'),
                    ]);
                    setProducts(fetchedProducts);
                    setFilteredProducts(fetchedProducts);
                    setCategories(fetchedCategories);
                } else {
                    // Nếu không có slug, gọi API lấy tất cả sản phẩm
                    const [fetchedProducts, fetchedCategories] = await Promise.all([
                        getProducts(),
                        getCategoriesBySlug('san-pham'),
                    ]);
                    setProducts(fetchedProducts);
                    setFilteredProducts(fetchedProducts);
                    setCategories(fetchedCategories);
                }
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [slug]); // Thêm slug vào dependency để reload khi slug thay đổi

    const handleFilterSubmit = async () => {
        try {
            setIsLoading(true);

            const fetchedProducts = await getProducts();

            const filtered = fetchedProducts.filter((product) => {
                const isPriceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
                const isCategorySelected = categoryFilter.length
                    ? categoryFilter.includes(product.child_nav_id.toString())
                    : true;

                return isPriceInRange && isCategorySelected;
            });

            setFilteredProducts(filtered);
            setCurrentPage(1);
        } catch (err) {
            setError('Failed to fetch filtered products.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterReset = () => {
        setPriceRange([0, 100000]);
        setCategoryFilter([]);
        setFilteredProducts(products);
        setCurrentPage(1);
    };

    const paginateProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const handlePriceChange = (event) => {
        setPriceRange([0, event.target.value]);
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCategoryFilter((prev) => [...prev, value]);
        } else {
            setCategoryFilter((prev) => prev.filter((catId) => catId !== value));
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            closeFilter();
        }
    };

    useEffect(() => {
        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    if (isLoading) {
        return <LoadingScreen isLoading={isLoading} />;
    }

    if (error) {
        return <PushNotification message={error.message} />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Sản Phẩm | Yến Sào LeGia'Nest </title>
            </Helmet>
            <div className={cx('content')}>
                <div className={cx('filter-toggle-btn')} onClick={toggleFilter}>
                    <FontAwesomeIcon className={cx('icon-filter')} icon={faFilter} />
                    Bộ lọc sản phẩm
                </div>
                <div ref={filterRef} className={cx('filter', { 'filter-open': isFilterOpen })}>
                    <div className={cx('filter-header')}>
                        <h3>Lọc sản phẩm</h3>
                        <FontAwesomeIcon className={cx('icon-close')} icon={faTimes} onClick={closeFilter} />
                    </div>
                    <div className={cx('filter-item')}>
                        <label>Khoảng giá</label>
                        <input type="range" min="0" max="1000000" value={priceRange[1]} onChange={handlePriceChange} />
                        <span>
                            Giá: {Number(priceRange[0]).toLocaleString()} - {Number(priceRange[1]).toLocaleString()}đ
                        </span>
                    </div>
                    <div className={cx('filter-item')}>
                        <label>Loại sản phẩm</label>
                        <div className={cx('checkbox-group')}>
                            {categories.map((category) => (
                                <div className={cx('checkbox-item')} key={category.id}>
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        value={category.id}
                                        checked={categoryFilter.includes(category.id.toString())}
                                        onChange={handleCategoryChange}
                                    />
                                    <label htmlFor={`category-${category.id}`}>{category.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className={cx('filter-button')} onClick={handleFilterSubmit}>
                        Lọc sản phẩm
                    </button>
                    <button className={cx('reset-button')} onClick={handleFilterReset}>
                        Đặt lại
                    </button>
                </div>

                {/* Sản phẩm */}
                <div className={cx('products-section')}>
                    <div className={cx('products-list')}>
                        {paginateProducts().map((product) => (
                            <Product
                                key={product.id}
                                name={product.name}
                                image={product.images[0]}
                                price={product.price}
                                productId={product.id}
                                category={categories.find((cat) => cat.id === product.child_nav_id)?.slug || 'unknown'}
                                link={`${routes.products}/${
                                    categories.find((cat) => cat.id === product.child_nav_id)?.slug || 'unknown'
                                }/${product.id}`}
                            />
                        ))}
                    </div>
                    {/* Phân trang */}
                    <div className={cx('pagination')}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={cx('page-button', { active: currentPage === index + 1 })}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Products;
