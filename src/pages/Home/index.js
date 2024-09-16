import React from 'react';
import { Helmet } from 'react-helmet';
import Overview from './Overview';
import Products from './Products';
import Services from './Services';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
// import Partners from './Partners';
import FAQs from './FAQs';

const Home = () => (
    <article>
        <Helmet>
            <title>CÔNG TY TNHH CÔNG NGHỆ TAKA TECH</title>
            <meta
                name="description"
                content="TakaTech cung cấp sản phẩm, dịch vụ xây dựng, phát triển phần mềm, ứng dụng di động - mobile app, website."
            />
            <meta
                name="keywords"
                content="sản phẩm, dịch vụ phần mềm, thiết kế website, tin tức ngành công nghệ thông tin, takatech"
            />
            <meta name="author" content="CÔNG TY TNHH CÔNG NGHỆ TAKATECH" />
        </Helmet>
        <Banner />
        <Overview />
        <Services />
        <Products />
        <NewsLibrary />
        <FAQs />
        {/* <Partners /> */}
    </article>
);

export default Home;
