import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Product from '~/components/ZhProduct';
import { getZhProductsByCategory } from 'services/productService';
import { getZhCategoriesBySlug } from 'services/categoryService';
import styles from './Products.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import routes from '~/config/routes';
import Title from '~/components/ZhTitleSub';

const cx = classNames.bind(styles);

function Products() {
    // Commented out API calls
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const [categoriesData, productsData] = await Promise.all([
                    getZhCategoriesBySlug('产品'),
                    getZhProductsByCategory(4),
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
                <Title text="产品" subText="高级精品燕窝" showSeeAll={true} slug={`${routes.productsZH}`} />
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
                                    category={getCategorySlug(product.zh_child_nav_id)}
                                    link={`${routes.productsZH}/${getCategorySlug(product.zh_child_nav_id)}/${
                                        product.id
                                    }`}
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
