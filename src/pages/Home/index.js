import React from 'react';
import { Helmet } from 'react-helmet';
import Products from './Products';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
import Gifts from './Gifts';
import Products2 from './Products2';
import Reviews from './Reviews';
import Certification from './Certification/Certification';
import Overview from './Overview';

const Home = () => (
    <article>
        <Helmet>
            <title>Yến Sào LeGia'Nest </title>
            <meta
                name="description"
                content="Yến Sào LeGia Nest chuyên phân phối tổ yến tươi, yến sào, yến chưng nguyên chất 100%, cam kết CHẤT LƯỢNG – KHÔNG PHA TRỘN để đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên."
            />
            <meta name="keywords" content="yến, yến tươi, yến sào, yến chưng, set quà tặng, LegiaNest" />
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
    </article>
);

export default Home;
