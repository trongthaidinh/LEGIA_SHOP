import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getProductsByCategory } from '~/services/productService';
import Title from '~/components/Title';
import styles from './Products.module.scss';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import { Empty } from 'antd';
import Product from 'components/Product';

const cx = classNames.bind(styles);

function ProductCategory() {
    const location = useLocation();
    const [product, setProduct] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [subcategoryId, setSubcategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 6;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(1);
                let category = categories.find((cat) => cat.slug === slug);

                if (!category) {
                    for (const cat of categories) {
                        const subcategory = cat.subcategories.find((subcat) => subcat.slug === slug);
                        if (subcategory) {
                            setCategoryId(cat._id);
                            setSubcategoryId(subcategory._id);
                            setCategoryName(subcategory.name);
                            return;
                        }
                    }
                } else {
                    setCategoryId(category._id);
                    setSubcategoryId(null);
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]);

    useEffect(() => {
        async function fetchProductCategory() {
            try {
                let data = [];
                if (subcategoryId) {
                    data = await getProductsByCategory(subcategoryId);
                } else if (categoryId) {
                    data = await getProductsByCategory(categoryId);

                    if (!Array.isArray(data) || data.message === 'No products found') {
                        const categories = await getCategoriesByType(1);
                        const parentCategory = categories.find((cat) => cat._id === categoryId);

                        if (parentCategory && parentCategory.subcategories) {
                            const subcategoryProducts = await Promise.all(
                                parentCategory.subcategories.map(async (subcat) => {
                                    const products = await getProductsByCategory(subcat._id);
                                    if (Array.isArray(products) && products.length > 0) {
                                        return products.filter((product) => product._id || product.name);
                                    } else {
                                        return null;
                                    }
                                }),
                            );

                            data = subcategoryProducts.filter(Boolean).flat();
                        }
                    }
                }
                setProduct(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        if (categoryId || subcategoryId) {
            fetchProductCategory();
        }
    }, [categoryId, subcategoryId, slug]);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProductCategory = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(product.length / productPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderProductCategory = () => {
        if (currentProductCategory.length === 0) {
            return (
                <>
                    <div />
                    <Empty className={cx('empty-element')} description="Đang cập nhật..." />
                    <div />
                </>
            );
        }

        return currentProductCategory.map((productItem) => (
            <Product
                key={productItem._id}
                image={productItem.image ? productItem.image[0] : ''}
                name={productItem.name}
                productId={productItem._id}
                category={slug}
                link={`${routes.products}/${slug}/${productItem._id}`}
            />
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={cx('pageButton', { active: currentPage === index + 1 })}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Helmet>
                <title>{categoryName} | TAKATECH</title>
                <meta name="description" content={`Xem các dịch vụ liên quan đến ${categoryName} trên Taktech.`} />
                <meta name="keywords" content={`${categoryName}, dịch vụ, takatech`} />
            </Helmet>
            <Title text={categoryName} />
            <div className={cx('productGrid')}>{renderProductCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default ProductCategory;
