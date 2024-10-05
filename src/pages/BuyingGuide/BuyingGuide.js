import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './BuyingGuide.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
// import { getPageBySlug } from '~/services/pageService'; // Comment phần import API

const cx = classNames.bind(styles);

const BuyingGuide = () => {
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
                        name: 'Hướng dẫn mua hàng',
                        description: 'Đây là trang hướng dẫn mua hàng dành cho khách hàng của Yến Sào LeGia Nest.',
                        content: `
                            <h3>Cách 1: Hotline</h3>
                            <p>Gọi điện đến Hotline <strong>0772332255</strong> từ 8h đến 20h tất cả các ngày trong tuần. Nhân viên bán hàng sẽ ghi nhận thông tin đặt hàng của bạn.</p>

                            <h3>Cách 2: Mạng xã hội</h3>
                            <p>Truy cập vào trang Facebook hoặc Instagram chính thức của <strong>Yến Sào LeGia'Nest</strong>.</p>
                            <p>Chọn mục “Nhắn tin” để được nhân viên trực chat tư vấn về các loại yến, set quà tặng và nhận đơn đặt hàng.</p>

                            <h3>Cách 3: Website</h3>
                            <p>Truy cập vào website:</p>
                            <p><strong>Tìm kiếm sản phẩm:</strong></p>
                            <ul>
                                <li>Nhập loại yến, set quà tặng bạn mong muốn vào ô tìm kiếm, bạn sẽ có kết quả ngay sau khi hoàn thành.</li>
                                <li>Click vào từng danh mục sản phẩm để tìm kiếm.</li>
                            </ul>
                            <p>Với mỗi sản phẩm ưng ý, bạn bấm nút <strong>THÊM VÀO GIỎ HÀNG</strong>, sản phẩm sẽ tự động được thêm vào <strong>GIỎ HÀNG</strong>.</p>
                            <p>Tại giỏ hàng, bạn có thể bấm nút <strong>Xoá</strong> nếu muốn huỷ sản phẩm đã chọn để mua sản phẩm khác.</p>
                            <p>Sau khi đã chọn được các loại yến, set quà tặng cần mua, bấm vào <strong>THANH TOÁN</strong>, và điền đầy đủ, chính xác thông tin cá nhân trong bảng thông tin.</p>

                            <h4>Chọn hình thức thanh toán</h4>
                            <ul>
                                <li>Thanh toán khi nhận hàng</li>
                                <li>Thanh toán qua QR chuyển khoản hoặc tài khoản khoản ngân hàng</li>
                            </ul>

                            <p>Sau khi điền đầy đủ thông tin và kiểm tra đơn hàng, giá tiền, bạn bấm vào nút <strong>HOÀN TẤT ĐƠN HÀNG</strong> gửi về cho Yến Sào LeGia'Nest.</p>
                            <p>Yến Sào LeGia'Nest sẽ gửi cho bạn email hoặc gọi điện xác nhận đơn hàng.</p>

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
                <meta
                    name="description"
                    content={
                        pageContent.description ||
                        'Yến Sào LeGia Nest  hoạt động đa ngành nghề, trong đó tiêu biểu có thể kể đến là nuôi cá lồng, cải tạo nâng cấp vườn cây quanh các hồ thủy điện, phát triển về du lịch sinh thái, du lịch nông nghiệp. Ngoài ra còn thực hiện sản xuất các loại thực phẩm như chả cá, yến, set quà tặng thực phẩm sấy khô và sấy dẻo, các loại tinh dầu tự nhiên,…'
                    }
                />
                <meta name="keywords" content="giới thiệu, phunongbuondon, thông tin hợp tác xã" />
                <meta name="author" content="Yến Sào LeGia Nest " />
            </Helmet>
            <div className={cx('inner')}>
                <Title subText={pageContent.name} />
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default BuyingGuide;
