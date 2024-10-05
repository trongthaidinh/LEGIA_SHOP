import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import Product from '~/components/Product';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const sampleProducts = [
    {
        id: 101,
        name: 'Yến Chưng Táo Đỏ Hạt Sen',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 102,
        name: 'Yến Chưng Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 103,
        name: 'Yến Chưng Đông Trùng Hạ Thảo',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039225/3ANH-02_ck64qc.jpg'],
        child_nav_id: 2,
        price: 50000,
    },
    {
        id: 104,
        name: 'Yến Chưng Nhân Sâm',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
    {
        id: 105,
        name: 'Yến Chưng Collagen Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
    {
        id: 106,
        name: 'Yến Chưng Táo Đỏ Hạt Sen',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 107,
        name: 'Yến Chưng Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 108,
        name: 'Yến Chưng Đông Trùng Hạ Thảo',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039225/3ANH-02_ck64qc.jpg'],
        child_nav_id: 2,
        price: 50000,
    },
    {
        id: 109,
        name: 'Yến Chưng Nhân Sâm',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
    {
        id: 110,
        name: 'Yến Chưng Collagen Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
    {
        id: 111,
        name: 'Yến Chưng Táo Đỏ Hạt Sen',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 112,
        name: 'Yến Chưng Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039223/3ANH-01_waz0f8.jpg'],
        child_nav_id: 1,
        price: 50000,
    },
    {
        id: 113,
        name: 'Yến Chưng Đông Trùng Hạ Thảo',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039225/3ANH-02_ck64qc.jpg'],
        child_nav_id: 2,
        price: 50000,
    },
    {
        id: 114,
        name: 'Yến Chưng Nhân Sâm',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
    {
        id: 115,
        name: 'Yến Chưng Collagen Saffron',
        images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
        child_nav_id: 3,
        price: 50000,
    },
];

const sampleCategories = [
    { id: 1, slug: 'yen-chung', title: 'Yến Chưng' },
    { id: 2, slug: 'yen-to', title: 'Yến Tổ' },
    { id: 3, slug: 'qua-tang', title: 'Quà Tặng' },
];

const getCategorySlug = (categoryId) => {
    const category = sampleCategories.find((cat) => cat.id == categoryId);
    return category ? category.slug : 'unknown';
};

const Products = () => {
    const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Phân trang
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

    const handleFilterReset = () => {
        setPriceRange([0, 100000]);
        setCategoryFilter([]);
        setFilteredProducts(sampleProducts);
        setCurrentPage(1);
    };

    const handleFilterSubmit = () => {
        const filtered = sampleProducts.filter((product) => {
            const isPriceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
            const isCategorySelected = categoryFilter.length
                ? categoryFilter.includes(product.child_nav_id.toString())
                : true;

            return isPriceInRange && isCategorySelected;
        });
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset trang về 1 sau khi lọc
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Sản Phẩm | Yến Sào LeGia'Nest </title>
            </Helmet>
            <div className={cx('content')}>
                <div className={cx('filter')}>
                    <h3>
                        <FontAwesomeIcon className={cx('icon-filter')} icon={faFilter} />
                        Lọc sản phẩm
                    </h3>
                    <div className={cx('filter-item')}>
                        <label>Khoảng giá</label>
                        <input type="range" min="0" max="100000" value={priceRange[1]} onChange={handlePriceChange} />
                        <span>
                            Giá: {priceRange[0]} - {priceRange[1]} VND
                        </span>
                    </div>
                    <div className={cx('filter-item')}>
                        <label>Loại sản phẩm</label>
                        <div className={cx('checkbox-group')}>
                            {sampleCategories.map((category) => (
                                <div className={cx('checkbox-item')} key={category.id}>
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        value={category.id}
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
                    {paginateProducts().map((product) => (
                        <Product
                            key={product.id}
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            productId={product.id}
                            category={sampleCategories.find((cat) => cat.id === product.child_nav_id).slug}
                            link={`${routes.products}/${getCategorySlug(product.child_nav_id)}/${product.id}`}
                        />
                    ))}
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
