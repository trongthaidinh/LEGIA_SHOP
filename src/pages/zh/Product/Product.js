import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import Product from '~/components/ZhProduct';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getZhProducts, getZhProductListBySlug } from '~/services/productService';
import { getZhCategoriesBySlug } from '~/services/categoryService';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const cx = classNames.bind(styles);

const Products = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 5000000]);
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
                        getZhProductListBySlug(slug),
                        getZhCategoriesBySlug('产品'),
                    ]);
                    setProducts(fetchedProducts);
                    setFilteredProducts(fetchedProducts);
                    setCategories(fetchedCategories);
                } else {
                    const [fetchedProducts, fetchedCategories] = await Promise.all([
                        getZhProducts(),
                        getZhCategoriesBySlug('产品'),
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
    }, [slug]);

    const handleFilterSubmit = async () => {
        try {
            setIsLoading(true);

            const fetchedProducts = await getZhProducts();

            const filtered = fetchedProducts.filter((product) => {
                const productPrice = Number(product.price);
                const isPriceInRange = productPrice >= priceRange[0] && productPrice <= priceRange[1];
                const isCategorySelected = categoryFilter.length
                    ? categoryFilter.includes(product.zh_child_nav_id.toString())
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
        setPriceRange([0, 5000000]);
        setCategoryFilter([]);
        setFilteredProducts(products);
        setCurrentPage(1);
    };

    const paginateProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
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

    const closeFilter = useCallback(() => {
        setIsFilterOpen(false);
    }, []);

    const handleClickOutside = useCallback(
        (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                closeFilter();
            }
        },
        [filterRef, closeFilter],
    );

    useEffect(() => {
        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen, handleClickOutside]);

    if (isLoading) {
        return <LoadingScreen isLoading={isLoading} />;
    }

    if (error) {
        return <PushNotification message={error.message} />;
    }

    const convertToYuan = (priceInVND) => {
        return (priceInVND / 3300).toFixed(2);
    };

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>产品 | 乐嘉燕窝</title>
                <meta
                    name="description"
                    content="乐嘉燕窝专业销售新鲜燕窝、燕窝制品、即食燕窝，100%纯天然，承诺品质保证 – 绝不掺假，确保保持100%天然燕窝的原味。"
                />
                <meta name="keywords" content="燕窝, 新鲜燕窝, 燕窝制品, 即食燕窝, 礼品套装, 乐嘉燕窝" />
                <meta name="author" content="乐嘉燕窝" />
            </Helmet>
            <div className={cx('content')}>
                <div className={cx('filter-toggle-btn')} onClick={toggleFilter}>
                    <FontAwesomeIcon className={cx('icon-filter')} icon={faFilter} />
                    筛选产品
                </div>
                <div ref={filterRef} className={cx('filter', { 'filter-open': isFilterOpen })}>
                    <div className={cx('filter-header')}>
                        <h3>筛选产品</h3>
                        <FontAwesomeIcon className={cx('icon-close')} icon={faTimes} onClick={closeFilter} />
                    </div>
                    <div className={cx('filter-item')}>
                        <label>价格范围</label>
                        <Slider range min={0} max={5000000} value={priceRange} onChange={handlePriceChange} />
                        <span>
                            价格: ¥{convertToYuan(priceRange[0])} - ¥{convertToYuan(priceRange[1])}
                        </span>
                    </div>
                    <div className={cx('filter-item')}>
                        <label>产品类别</label>
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
                        应用筛选
                    </button>
                    <button className={cx('reset-button')} onClick={handleFilterReset}>
                        重置
                    </button>
                </div>

                <div className={cx('products-section')}>
                    <div className={cx('products-list')}>
                        {paginateProducts().map((product) => (
                            <Product
                                key={product.id}
                                name={product.name}
                                image={product.images[0]}
                                price={product.price}
                                productId={product.id}
                                category={
                                    categories.find((cat) => cat.id === product.zh_child_nav_id)?.slug || 'unknown'
                                }
                                link={`${routes.productsZH}/${
                                    categories.find((cat) => cat.id === product.zh_child_nav_id)?.slug || 'unknown'
                                }/${product.id}`}
                            />
                        ))}
                    </div>
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
