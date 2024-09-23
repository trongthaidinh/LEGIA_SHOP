import React from 'react';
import { Helmet } from 'react-helmet';
import Overview from './Overview';
import Products from './Products';
import Services from './Services';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
import Experiences from './Experiences';
import Teams from './Teams';

const Home = () => (
    <article>
        <Helmet>
            <title>HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
            <meta
                name="description"
                content="HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn hoạt động đa ngành nghề, trong đó tiêu biểu có thể kể đến là nuôi cá lồng, cải tạo nâng cấp vườn cây quanh các hồ thủy điện, phát triển về du lịch sinh thái, du lịch nông nghiệp. Ngoài ra còn thực hiện sản xuất các loại thực phẩm như chả cá, trái cây thực phẩm sấy khô và sấy dẻo, các loại tinh dầu tự nhiên,…"
            />
            <meta
                name="keywords"
                content="dịch vụ nông nghiệp du lịch, hợp tác xã, sản phẩm nông nghiệp, phunongbuondon"
            />
            <meta name="author" content="HTX Nông Nghiệp - Du Lịch Phú Nông Buôn" />
        </Helmet>
        <Banner />
        <Overview />
        <Products />
        <Services />
        <Experiences />
        <NewsLibrary />
        <Teams />
    </article>
);

export default Home;
