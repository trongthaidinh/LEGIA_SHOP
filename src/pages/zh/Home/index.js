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
            <title>乐嘉燕窝</title>
            <meta
                name="description"
                content="乐嘉燕窝专业销售新鲜燕窝、燕窝制品、即食燕窝，100%纯天然，承诺品质保证 – 绝不掺假，确保保持100%天然燕窝的原味。"
            />
            <meta name="keywords" content="燕窝, 新鲜燕窝, 燕窝制品, 即食燕窝, 礼品套装, 乐嘉燕窝" />
            <meta name="author" content="乐嘉燕窝" />
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
