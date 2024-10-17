import React from 'react';
import { Helmet } from 'react-helmet';
import Overview from './Overview';
import Products from './Products';
import Services from './Services';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
import Experiences from './Experiences';
import Teams from './Teams';
import Gifts from './Gifts';
import Products2 from './Products2';
import Reviews from './Reviews';
import Certification from './Certification/Certification';

const Home = () => (
    <article>
        <Helmet>
            <title>Yến Sào LeGia'Nest </title>
            <meta
                name="description"
                content="Yến Sào LeGia Nest Chuyên phân phối tổ yến tươi, yến sào, yến chưng nguyên chất 100%, cam kết CHẤT LƯỢNG – KHÔNG PHA TRỘN. Với mong muốn mang đến nguồn sản phẩm NÂNG CAO SỨC KHỎE cho người dùng, Legia'Nest luôn đặt chất lượng sản phẩm lên hàng đầu, đặc biệt Yến sào Legia'Nest đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên."
            />
            <meta
                name="keywords"
                content="dịch vụ nông nghiệp du lịch, hợp tác xã, sản phẩm nông nghiệp, phunongbuondon"
            />
            <meta name="author" content="Yến Sào LeGia'Nest" />
        </Helmet>
        <Banner />
        <Overview />
        <Products />
        <Products2 />
        <Gifts />
        <Reviews />
        <Certification />
        <NewsLibrary />
        {/*<Teams /> */}
    </article>
);

export default Home;
