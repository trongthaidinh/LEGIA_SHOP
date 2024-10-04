import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const availableStock = 10;
    const [activeTab, setActiveTab] = useState('info');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [commentForm, setCommentForm] = useState({
        content: '',
        image: null,
        name: '',
        email: '',
    });
    const [comments, setComments] = useState([
        // Bình luận mẫu
        {
            name: 'Nguyen Van A',
            content: 'Sản phẩm tốt',
            image: null,
            date: '2024-10-03 10:00',
            email: 'email@example.com',
        },
        {
            name: 'Nguyen Van B',
            content: 'Hàng chất lượng',
            images: [
                'https://lagianest.com/wp-content/uploads/2022/11/yen-chung-nhan-sam-LAGIA-NEST.jpg',
                'https://lagianest.com/wp-content/uploads/2022/11/hop-yen-chung-nhan-sam-247x247.jpg',
            ],
            date: '2024-10-03 11:00',
            email: 'email2@example.com',
        },
    ]);

    useEffect(() => {
        const mockData = {
            id: 101,
            name: "Yến Sào Cao Cấp LeGia'Nest",
            price: 500000,
            original_price: 700000,
            images: [
                'https://lagianest.com/wp-content/uploads/2022/11/yen-chung-nhan-sam-LAGIA-NEST.jpg',
                'https://lagianest.com/wp-content/uploads/2022/11/hop-yen-chung-nhan-sam-247x247.jpg',
                'https://lagianest.com/wp-content/uploads/2022/11/3-1-247x247.png',
                'https://lagianest.com/wp-content/uploads/2022/11/yen-chung-nhan-sam-LAGIA-NEST.jpg',
                'https://lagianest.com/wp-content/uploads/2022/11/hop-yen-chung-nhan-sam-247x247.jpg',
                'https://lagianest.com/wp-content/uploads/2022/11/3-1-247x247.png',
            ],
            features: JSON.stringify(['Giá trị dinh dưỡng cao', 'Yến sào 100% tự nhiên', 'Không chất bảo quản']),
            phone_number: '123456789',
            content: `
                <div>
                    <h2 style="text-align: center;">Yến Sào Cao Cấp LeGia Nest</h2>
                    <p>Yến Sào Cao Cấp LeGia'Nest là sản phẩm yến sào chất lượng cao, được chế biến từ những tổ yến tự nhiên, đảm bảo sự tinh khiết và an toàn cho sức khỏe người tiêu dùng.</p>
                    <h3>Thông Tin Sản Phẩm</h3>
                    <ul>
                        <li><strong>Giá:</strong> 500,000 VNĐ (Giá gốc: 700,000 VNĐ)</li>
                        <li><strong>Khối lượng:</strong> 100g</li>
                        <li><strong>Xuất xứ:</strong> Việt Nam</li>
                    </ul>
                    <h3>Đặc Điểm Nổi Bật</h3>
                    <p>Yến sào LeGia Nest không chỉ là món ăn ngon mà còn là thực phẩm bổ dưỡng cho sức khỏe. Một số lợi ích nổi bật của sản phẩm bao gồm:</p>
                    <ul>
                        <li>Giàu dinh dưỡng, hỗ trợ tăng cường sức đề kháng.</li>
                        <li>Thích hợp cho mọi đối tượng, đặc biệt là trẻ em và người cao tuổi.</li>
                        <li>Được sản xuất theo quy trình khép kín, đảm bảo vệ sinh an toàn thực phẩm.</li>
                    </ul>
                    <h3>Cách Sử Dụng</h3>
                    <p>Để tận hưởng trọn vẹn hương vị và lợi ích dinh dưỡng từ Yến Sào Cao Cấp LeGia Nest, bạn có thể chế biến theo các cách sau:</p>
                    <ol>
                        <li>Ngâm yến trong nước ấm khoảng 30 phút trước khi chế biến.</li>
                        <li>Chế biến yến cùng với đường phèn và nước dừa để tạo ra món ăn thơm ngon.</li>
                        <li>Thêm yến vào các món cháo hoặc súp để tăng cường dinh dưỡng.</li>
                    </ol>

                </div>
            `,
            comments: ['Bình luận 1', 'Bình luận 2', 'Bình luận 3'],
        };

        setProductDetail(mockData);
        setLoading(false);
    }, [id]);

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
            const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagePreviews(previewUrls);
        } else {
            setCommentForm({
                ...commentForm,
                [name]: value,
            });
        }
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const newComment = {
            name: commentForm.name,
            content: commentForm.content,
            image: commentForm.image ? URL.createObjectURL(commentForm.image) : null,
            date: new Date().toLocaleString(),
            email: commentForm.email,
        };

        setComments((prevComments) => [newComment, ...prevComments]);
        setCommentForm({
            content: '',
            image: null,
            name: '',
            email: '',
        });
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading || !productDetail) {
        return <LoadingScreen isLoading={loading} />;
    }

    const features = productDetail?.features ? JSON.parse(productDetail.features) : [];

    // Calculate discount percentage
    const discountPercentage =
        productDetail.original_price > productDetail.price
            ? Math.round(((productDetail.original_price - productDetail.price) / productDetail.original_price) * 100)
            : 0;

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{productDetail.name} | Yến Sào LeGia Nest</title>
                <meta name="description" content={`Chi tiết về sản phẩm: ${productDetail.name}.`} />
                <meta name="keywords" content={`sản phẩm, ${productDetail.name}, phunongbuondon`} />
            </Helmet>

            <div className={cx('product-section')}>
                <div className={cx('product-image')}>
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        loop={true}
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
                            <SwiperSlide className={cx('thumbnail-image-wrapper')} key={index}>
                                <img
                                    className={cx('thumbnail-image')}
                                    src={image.replace(/\\/g, '')}
                                    alt={`${productDetail.name} main ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className={cx('product-details')}>
                    {discountPercentage > 0 && <div className={cx('discount-tag')}>-{discountPercentage}%</div>}

                    <h2 className={cx('product-name')}>{productDetail.name}</h2>

                    <p className={cx('product-price')}>
                        {productDetail.price.toLocaleString()}
                        <span className={cx('product-price-currency')}>đ</span>
                        {productDetail.original_price > productDetail.price && (
                            <span className={cx('original-price')}>
                                {productDetail?.original_price?.toLocaleString()}
                                <span className={cx('product-price-currency')}>đ</span>
                            </span>
                        )}
                    </p>
                    <ul className={cx('detail-function')}>
                        <span className={cx('detail-function-label')}>Mô tả sản phẩm</span>
                        {features.map((feature, index) => (
                            <li key={index} className={cx('txt-function')}>
                                <FontAwesomeIcon className={cx('icon-function')} icon={faCircleDot} /> {feature}
                            </li>
                        ))}
                    </ul>

                    <div className={cx('quantity-section')}>
                        <span className={cx('quantity-label')}>Số lượng:</span>
                        <div className={cx('quantity-control')}>
                            <button className={cx('quantity-btn')} onClick={handleDecrease}>
                                <FontAwesomeIcon icon={faMinus} className={cx('quantity-icon')} />
                            </button>
                            <span className={cx('quantity')}>{quantity}</span>
                            <button className={cx('quantity-btn')} onClick={handleIncrease}>
                                <FontAwesomeIcon icon={faPlus} className={cx('quantity-icon')} />
                            </button>
                        </div>
                        <span className={cx('available-stock')}>({availableStock} sản phẩm có sẵn)</span>
                    </div>

                    <div className={cx('button-container')}>
                        <Button className={cx('cart-button')} primary>
                            <FontAwesomeIcon icon={faShoppingCart} className={cx('icon')} />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button className={cx('checkout-button')} outline>
                            <FontAwesomeIcon icon={faCreditCard} className={cx('icon')} />
                            Thanh Toán
                        </Button>
                    </div>
                </div>
            </div>

            <div className={cx('info-section')}>
                <div className={cx('tab-buttons')}>
                    <button
                        className={cx('tab-button', { active: activeTab === 'info' })}
                        onClick={() => setActiveTab('info')}
                    >
                        Thông tin sản phẩm
                    </button>
                    <button
                        className={cx('tab-button', { active: activeTab === 'comments' })}
                        onClick={() => setActiveTab('comments')}
                    >
                        Bình luận về sản phẩm
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
                                    placeholder="Viết bình luận..."
                                    required
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <div className={cx('image-upload')}>
                                    <label htmlFor="file-input">
                                        <FontAwesomeIcon icon={faCamera} className={cx('image-upload-icon')} />
                                        <span className={cx('image-upload-icon')}>Thêm hình ảnh</span>
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
                                {imagePreviews.length > 0 && (
                                    <div className={cx('image-previews')}>
                                        {imagePreviews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className={cx('preview-image')}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={cx('form-group-row')}>
                                <input
                                    type="text"
                                    name="name"
                                    value={commentForm.name}
                                    onChange={handleCommentFormChange}
                                    placeholder="Họ và tên"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={commentForm.email}
                                    onChange={handleCommentFormChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <Button type="submit" primary>
                                Gửi bình luận
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
                                <div className={cx('no-comments')}>Chưa có bình luận nào.</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </article>
    );
};

export default ProductDetail;
