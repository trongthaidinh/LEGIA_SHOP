import classNames from 'classnames/bind';
import React from 'react';
import Title from '~/components/Title';
import styles from './About.module.scss';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const About = () => (
    <article className={cx('wrapper')}>
        <Helmet>
            <title>Giới thiệu | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
            <meta
                name="description"
                content="Công ty TNHH Công nghệ TakaTech cung cấp sản phẩm, dịch vụ xây dựng, phát triển phần mềm, ứng dụng di động - mobile app, website."
            />
            <meta name="keywords" content="dịch vụ thiết kế website, lập trình website, mobile-app, Takatech" />
            <meta name="author" content="CÔNG TY TNHH CÔNG NGHỆ HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn" />
        </Helmet>
        <div className={cx('inner')}>
            <Title text="Tổng quan về TakaTech" />
            <div className={cx('content')}>
                <img
                    src="https://res.cloudinary.com/dxehzrouf/image/upload/v1724929251/3327b5b3-d1d3-4d19-b182-702c2ccd3e0f_sid9ne.jpg"
                    alt="Trụ sở công ty VNETC"
                />
                <p>
                    <strong>Công ty TNHH Công nghệ TakaTech, hoạt động trong các lĩnh vực: </strong>
                </p>
                <ul>
                    <li>Xây dựng, phát triển phần mềm, ứng dụng di động - mobile app</li>
                    <li>Thiết kế, xây dựng Cổng thông tin điện tử, Trang thông tin điện tử</li>
                    <li>Tư vấn, triển khai các giải pháp chuyển đổi số cho Tổ chức - Doanh nghiệp</li>
                </ul>
                <p>
                    Qua một chặng đường xây dựng và phát triển, TakaTech đã khẳng định được vị trí của mình trong ngành
                    công nghệ thông tin. Chúng tôi không ngừng nỗ lực phát triển với sứ mệnh cung cấp những giải pháp
                    công nghệ thông tin, phần mềm, sản phẩm tốt nhất tới tay khách hàng.
                </p>
                <p>
                    TakaTech quy tụ đội ngũ chuyên gia giàu kinh nghiệm luôn cập nhật các xu hướng công nghệ mới nhất
                    trên thế giới.
                </p>
                <p>
                    Đến với TakaTech, quý khách hàng không chỉ yên tâm về sản phẩm mà còn cảm nhận được sự nhiệt huyết
                    đam mê công nghệ của đội ngũ nhân viên có trình độ và giàu kinh nghiệm.
                </p>
            </div>
        </div>
    </article>
);

export default About;
