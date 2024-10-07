import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './Policy.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
// import { getPageBySlug } from '~/services/pageService'; // Comment phần import API

const cx = classNames.bind(styles);

const Policy = () => {
    const { slug } = useParams();
    console.log(slug);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                if (slug) {
                    // const data = await getPageBySlug(slug); // Comment phần gọi API
                    // Sử dụng dữ liệu mẫu (mock data)
                    const mockData = {
                        name: 'Chính sách bảo hành và đổi trả',
                        description: 'Đây là trang hướng dẫn mua hàng dành cho khách hàng của Yến Sào LeGia Nest.',
                        content: `
                                <h3>Thời hạn đổi trả</h3>
                                
                                <p>Thời gian đổi trả có thể linh động tuỳ vào tính chất của từng loại yến.</p>
                                

                                <h3>Kênh tiếp nhận đổi trả</h3>
                                <ul>
                                    <li>Tại cửa hàng đã mua sản phẩm</li>
                                    <li>Tại trang Facebook hoặc Instagram</li>
                                    <li>Thông qua Hotline: <strong>0772332255</strong> (8:00 – 22:00)</li>
                                </ul>

                                <h3>Phương thức đổi trả</h3>
                                <ul>
                                    <li>Đổi sản phẩm mới</li>
                                    <li>Tặng voucher</li>
                                    <li>Hoàn tiền</li>
                                </ul>
                                <p>Phương thức đổi trả có thể linh động dựa vào mức độ lỗi của sản phẩm và nguyện vọng của khách hàng.</p>

                                <h3>Các trường hợp được đổi trả</h3>
                                <ul>
                                    <li>Sản phẩm giao sai hoặc giao thiếu theo đơn hàng</li>
                                    <li>Sản phẩm bị lỗi chất lượng, hư hỏng do lỗi của nhà sản xuất</li>
                                    <li>Sản phẩm có dấu hiệu đã qua sử dụng hoặc hết hạn sử dụng tại thời điểm nhận hàng</li>
                                    <li>Sản phẩm bị hư hỏng, cấn dập trong quá trình vận chuyển tới khách hàng</li>
                                </ul>

                                <h3>Điều kiện đổi trả sản phẩm</h3>
                                <ul>
                                    <li>Sản phẩm được mua tại của hàng chính thức của Yến Sào LeGia'Nest (Khách hàng cung cấp số điện thoại có lịch sử mua hàng trên hệ thống)</li>
                                    <li>Sản phẩm được bảo quản đúng cách, theo khuyến cáo của Yến Sào LeGia'Nest</li>
                                </ul>

                        `,
                    };
                    setPageContent(mockData);
                } else {
                    setError(new Error('No slug provided'));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching page content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    if (!pageContent) {
        return <PushNotification message="No content available" />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{pageContent.name} | Yến Sào LeGia Nest </title>
                <meta name="description" content={pageContent.description || 'Yến Sào LeGia Nest'} />
                <meta name="keywords" content="chính sách, LeGia'Nest" />
                <meta name="author" content="Yến Sào LeGia Nest" />
            </Helmet>
            <div className={cx('inner')}>
                <Title subText={pageContent.name} />
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default Policy;
