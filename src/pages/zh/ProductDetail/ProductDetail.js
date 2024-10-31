import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import Title from '~/components/Title';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleDot,
    faShoppingCart,
    faCreditCard,
    faMinus,
    faPlus,
    faCamera,
    faPaperPlane,
    faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import routes from 'config/routes';
import { getZhProductById } from 'services/productService';
import { message, Spin } from 'antd';
import { createComment, getZhCommentsByProductId } from 'services/commentService';

const cx = classNames.bind(styles);

const convertToYuan = (priceInVND) => {
    return (priceInVND / 3300).toFixed(2);
};

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [availableStock, setAvailableStock] = useState(0);
    const [activeTab, setActiveTab] = useState('info');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commentForm, setCommentForm] = useState({
        content: '',
        image: null,
        name: '',
        email: '',
    });

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const data = await getZhProductById(id);
                setProductDetail(data);
                setAvailableStock(data.available_stock);
            } catch (error) {
                setNotification({ message: '获取商品详情失败', type: 'error' });
                console.error('获取商品详情失败:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const commentsData = await getZhCommentsByProductId(id);
                setComments(commentsData);
            } catch (error) {
                setNotification({ message: '加载评论失败', type: 'error' });
                console.error('获取评论失败:', error);
            }
        };

        fetchProductDetail();
        fetchComments();
    }, [id, notification]);

    const handleAddToCart = () => {
        const productToAdd = {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            original_price: productDetail.original_price,
            quantity: quantity,
            image: productDetail.images[0],
        };

        let cart = JSON.parse(localStorage.getItem('zh_cart')) || [];

        const existingProductIndex = cart.findIndex((item) => item.id === productToAdd.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(productToAdd);
        }

        localStorage.setItem('zh_cart', JSON.stringify(cart));

        const cartUpdateEvent = new CustomEvent('zhCartUpdated');
        window.dispatchEvent(cartUpdateEvent);

        setNotification({ message: '已成功添加到购物车！', type: 'success' });
    };

    const handleBuyNow = () => {
        const productToBuy = {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            original_price: productDetail.original_price,
            quantity: quantity,
            image: productDetail.images[0],
        };

        sessionStorage.setItem('selectedZhProduct', JSON.stringify(productToBuy));
    };

    const handleIncrease = () => {
        if (quantity < availableStock) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleCommentFormChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files.length > 0) {
            setCommentForm((prev) => ({
                ...prev,
                image: files,
            }));
            const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagePreviews(previewUrls);
        } else {
            setCommentForm({
                ...commentForm,
                [name]: value,
            });
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', commentForm.name);
        formData.append('email', commentForm.email);
        formData.append('content', commentForm.content);
        formData.append('product_id', productDetail.id);

        console.log(commentForm);
        if (commentForm.image) {
            for (const file of commentForm.image) {
                formData.append('images[]', file);
            }
        }

        try {
            setCommentForm({
                content: '',
                image: null,
                name: '',
                email: '',
            });

            const updatedComments = await getZhCommentsByProductId(productDetail.id);
            setComments(updatedComments);

            setNotification({ message: 'Bình luận đã được gửi thành công!', type: 'success' });
        } catch (error) {
            console.error('Error submitting comment:', error);
            setNotification({ message: 'Gửi bình luận thất bại.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !productDetail) {
        return <LoadingScreen isLoading={loading} />;
    }

    const features = productDetail?.features ? JSON.parse(productDetail.features) : [];

    const discountPercentage =
        productDetail.original_price > productDetail.price
            ? Math.round(((productDetail.original_price - productDetail.price) / productDetail.original_price) * 100)
            : 0;

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{productDetail.name} | 乐嘉燕窝</title>
                <meta
                    name="description"
                    content={`商品详情: ${productDetail.name}。乐嘉燕窝采用天然燕窝制作，确保纯净安全，为消费者健康保驾护航。`}
                />
                <meta name="keywords" content={`商品, ${productDetail.name}, 乐嘉燕窝`} />
            </Helmet>
            {notification && <PushNotification message={notification.message} type={notification.type} />}
            <div className={cx('product-section')}>
                <div className={cx('product-image')}>
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        loop={true}
                        onSwiper={setMainSwiper}
                        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                        className={cx('main-image-wrapper')}
                    >
                        {productDetail.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className={cx('main-image')}
                                    src={image.replace(/\\/g, '')}
                                    alt={`${productDetail.name} main ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        modules={[Thumbs]}
                        slidesPerView={4}
                        spaceBetween={0}
                        watchSlidesProgress={true}
                        className={cx('thumbnail-wrapper')}
                    >
                        {productDetail.images.map((image, index) => (
                            <SwiperSlide
                                className={cx('thumbnail-image-wrapper')}
                                key={index}
                                onClick={() => mainSwiper?.slideTo(index)}
                            >
                                <img
                                    className={cx('thumbnail-image')}
                                    src={image.replace(/\\/g, '')}
                                    alt={`${productDetail.name} thumbnail ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className={cx('product-details')}>
                    {discountPercentage > 0 && <div className={cx('discount-tag')}>-{discountPercentage}%</div>}

                    <h1 className={cx('product-name')}>{productDetail.name}</h1>

                    <p className={cx('product-price')}>
                        <span className={cx('price')}>¥{convertToYuan(productDetail.price)}</span>
                        {productDetail.original_price && (
                            <span className={cx('original-price')}>¥{convertToYuan(productDetail.original_price)}</span>
                        )}
                    </p>
                    <ul className={cx('detail-function')}>
                        <span className={cx('detail-function-label')}>商品描述</span>
                        {features.map((feature, index) => (
                            <li key={index} className={cx('txt-function')}>
                                <FontAwesomeIcon className={cx('icon-function')} icon={faCircleDot} /> {feature}
                            </li>
                        ))}
                    </ul>

                    <div className={cx('quantity-section')}>
                        <span className={cx('quantity-label')}>数量：</span>
                        <div className={cx('quantity-control')}>
                            <button className={cx('quantity-btn')} onClick={handleDecrease}>
                                <FontAwesomeIcon icon={faMinus} className={cx('quantity-icon')} />
                            </button>
                            <span className={cx('quantity')}>{quantity}</span>
                            <button className={cx('quantity-btn')} onClick={handleIncrease}>
                                <FontAwesomeIcon icon={faPlus} className={cx('quantity-icon')} />
                            </button>
                        </div>
                        <span className={cx('available-stock')}>({availableStock} 件库存)</span>
                    </div>

                    <div className={cx('button-container')}>
                        <Link className={cx('button-link')}>
                            <Button className={cx('cart-button')} primary onClick={handleAddToCart}>
                                <FontAwesomeIcon icon={faShoppingCart} className={cx('icon')} />
                                加入购物车
                            </Button>
                        </Link>
                        <Link className={cx('button-link')} to={routes.checkoutZH}>
                            <Button className={cx('checkout-button')} outline onClick={handleBuyNow}>
                                <FontAwesomeIcon icon={faCreditCard} className={cx('icon')} />
                                立即购买
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('button-container')}>
                        <Link className={cx('button-link')} to="tel:0772332255">
                            <Button className={cx('phone-button')} outline>
                                <FontAwesomeIcon icon={faPhoneVolume} className={cx('icon')} />
                                077 233 2255
                            </Button>
                        </Link>
                        <Link className={cx('button-link')} to="https://zalo.me/0772332255">
                            <Button className={cx('zalo-button')} outline>
                                ZALO
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={cx('info-section')}>
                <div className={cx('tab-buttons')}>
                    <button
                        className={cx('tab-button', { active: activeTab === 'info' })}
                        onClick={() => setActiveTab('info')}
                    >
                        商品详情
                    </button>
                    <button
                        className={cx('tab-button', { active: activeTab === 'comments' })}
                        onClick={() => setActiveTab('comments')}
                    >
                        商品评论
                    </button>
                </div>

                {activeTab === 'info' && (
                    <div
                        className={cx('info-content')}
                        dangerouslySetInnerHTML={{ __html: productDetail.content || '' }}
                    />
                )}

                {activeTab === 'comments' && (
                    <>
                        <form className={cx('comment-form')} onSubmit={handleSubmitComment}>
                            <div className={cx('form-group')}>
                                <textarea
                                    name="content"
                                    value={commentForm.content}
                                    onChange={handleCommentFormChange}
                                    placeholder="写下您的评论..."
                                    required
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <div className={cx('image-upload')}>
                                    <label htmlFor="file-input">
                                        <FontAwesomeIcon icon={faCamera} className={cx('image-upload-icon')} />
                                        <span className={cx('image-upload-icon')}>添加图片</span>
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        name="image"
                                        onChange={handleCommentFormChange}
                                        accept="image/*"
                                        multiple
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group-row')}>
                                <input
                                    type="text"
                                    name="name"
                                    value={commentForm.name}
                                    onChange={handleCommentFormChange}
                                    placeholder="姓名"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={commentForm.email}
                                    onChange={handleCommentFormChange}
                                    placeholder="邮箱"
                                    required
                                />
                            </div>
                            <Button type="submit" primary>
                                {isSubmitting ? <Spin size="small" /> : '发表评论'}
                            </Button>
                        </form>

                        <div className={cx('comments-list')}>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div key={index} className={cx('comment-item')}>
                                        <div className={cx('comment-header')}>
                                            <strong>{comment.name}</strong> - <span>{comment.email}</span> -{' '}
                                            <span>{comment.date}</span>
                                        </div>
                                        <div className={cx('comment-content')}>
                                            <p>
                                                <FontAwesomeIcon
                                                    icon={faPaperPlane}
                                                    className={cx('comment-content-icon')}
                                                />{' '}
                                                {comment.content}
                                            </p>
                                            {comment.images && comment.images.length > 0 && (
                                                <div className={cx('comment-images')}>
                                                    {comment.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`User uploaded ${index + 1}`}
                                                            className={cx('comment-image')}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={cx('no-comments')}>暂无评论。</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </article>
    );
};

export default ProductDetail;
