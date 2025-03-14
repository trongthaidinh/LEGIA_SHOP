import classNames from 'classnames/bind';
import React from 'react';
import Title from '~/components/Title';
import styles from './About.module.scss';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const About = () => (
    <article className={cx('wrapper')}>
        <Helmet>
            <title>Giới thiệu | Yến Sào LeGia Nest </title>
            <meta
                name="description"
                content="Yến Sào LeGia Nest chuyên phân phối tổ yến tươi, yến sào, yến chưng nguyên chất 100%, cam kết CHẤT LƯỢNG – KHÔNG PHA TRỘN. Với mong muốn mang đến nguồn sản phẩm NÂNG CAO SỨC KHỎE cho người dùng, Legia'Nest luôn đặt chất lượng sản phẩm lên hàng đầu, đặc biệt Yến sào Legia'Nest đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên."
            />
            <meta name="keywords" content="dịch vụ nông nghiệp du lịch, hợp tác xã, sản phẩm nông nghiệp, LegiaNest" />
            <meta name="author" content="Yến Sào LeGia Nest " />
        </Helmet>
        <div className={cx('inner')}>
            <Title text="Giới thiệu" subText="Về Chúng Tôi" />
            <div className={cx('content')}>
                <p>
                    LeGia'Nest tự hào là một trong những thương hiệu hàng đầu trong lĩnh vực sản xuất và cung cấp yến
                    sào chất lượng cao tại Việt Nam. Với sự tận tâm và kinh nghiệm lâu năm, chúng tôi mang đến cho khách
                    hàng những sản phẩm yến sào nguyên chất, tinh khiết và giàu dinh dưỡng, đáp ứng nhu cầu bồi bổ sức
                    khỏe một cách toàn diện.
                </p>
                <p>
                    LeGia'Nest cam kết chỉ sử dụng nguồn yến tự nhiên từ những vùng biển sạch, đảm bảo quá trình thu
                    hoạch và chế biến đều tuân thủ các tiêu chuẩn an toàn và chất lượng nghiêm ngặt. Chúng tôi không chỉ
                    chú trọng đến việc giữ gìn giá trị dinh dưỡng vốn có của yến sào mà còn không ngừng cải tiến, nâng
                    cao quy trình sản xuất nhằm mang đến những sản phẩm tốt nhất cho người tiêu dùng.
                </p>
                <p>
                    Sản phẩm của LeGia'Nest phù hợp với mọi lứa tuổi, từ trẻ em, người lớn đến người cao tuổi, giúp tăng
                    cường sức khỏe, nâng cao hệ miễn dịch, và hỗ trợ phục hồi cơ thể. Bên cạnh đó, chúng tôi luôn đặt
                    chữ “tâm” lên hàng đầu, không ngừng nỗ lực xây dựng uy tín và tạo dựng niềm tin nơi khách hàng.
                </p>
                <p>
                    Với phương châm "Chất lượng tạo nên thương hiệu", LeGia'Nest mong muốn đồng hành cùng sức khỏe của
                    mọi gia đình, trở thành người bạn đáng tin cậy trên hành trình chăm sóc sức khỏe từ thiên nhiên.
                </p>
            </div>
        </div>
    </article>
);

export default About;
