import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Product from '~/components/Product';
import { getProductsByCategory } from 'services/productService';
import { getCategoriesBySlug } from 'services/categoryService';
import styles from './Products.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import routes from '~/config/routes';
import Title from 'components/TitleSub';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // // Sample data for categories
    // const categories = [
    //     { id: 1, slug: 'yen-chung' },
    //     { id: 2, slug: 'yen-to' },
    //     { id: 3, slug: 'set-qua-tang' },
    // ];

    // // Sample data for products
    // const products = [
    //     {
    //         id: 101,
    //         name: 'Set Quà Combo 6 Hũ Yến Chưng Cao Cấp',
    //         images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_set_qua_tang-01_njhh9e.png'],
    //         child_nav_id: 1,
    //         price: 50000,
    //     },
    //     {
    //         id: 102,
    //         name: 'Set Quà Combo 10 Hũ Yến Chưng Cao Cấp',
    //         images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
    //         child_nav_id: 1,
    //         price: 50000,
    //     },
    //     {
    //         id: 103,
    //         name: 'Set Quà Combo 6 Hũ Yến Chưng Cao Cấp',
    //         images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728104350/hinh_set_qua_tang-01_njhh9e.png'],
    //         child_nav_id: 2,
    //         price: 50000,
    //     },
    //     {
    //         id: 104,
    //         name: 'Mật Ong Ngâm Saffron Đông Trùng Hạ Thảo',
    //         images: ['https://res.cloudinary.com/drioug4df/image/upload/v1728039222/3ANH-03_kxbobh.jpg'],
    //         child_nav_id: 2,
    //         price: 50000,
    //     },
    // ];

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const [categoriesData, productsData] = await Promise.all([
                    getCategoriesBySlug('san-pham'),
                    getProductsByCategory(3),
                ]);

                setCategories(categoriesData);
                setProducts(productsData);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat.id == categoryId);
        return category ? category.slug : 'unknown';
    };

    if (error) {
        return <PushNotification message={error.message} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title subText="Quà tặng cao cấp" showSeeAll={true} slug={`${routes.products}`} />
                <img
                    className={cx('gift-intro-img')}
                    src="https://res.cloudinary.com/drioug4df/image/upload/v1728011829/f9500f84-3e74-486c-a508-0e7c8057189d.jpg"
                    alt="gift"
                />
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                        1280: { slidesPerView: 4 },
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        0: { slidesPerView: 2 },
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {products.map((product) => {
                        return (
                            <SwiperSlide key={product.id} className={cx('slide')}>
                                <Product
                                    image={product.images[0]}
                                    name={product.name}
                                    productId={product.id}
                                    category={getCategorySlug(product.child_nav_id)}
                                    link={`${routes.products}/${getCategorySlug(product.child_nav_id)}/${product.id}`}
                                    price={product.price}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default Products;
