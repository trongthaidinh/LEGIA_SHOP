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
                content="HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn hoạt động đa ngành nghề, trong đó tiêu biểu có thể kể đến là nuôi cá lồng, cải tạo nâng cấp vườn cây quanh các hồ thủy điện, phát triển về du lịch sinh thái, du lịch nông nghiệp. Ngoài ra còn thực hiện sản xuất các loại thực phẩm như chả cá, trái cây thực phẩm sấy khô và sấy dẻo, các loại tinh dầu tự nhiên,…"
            />
            <meta
                name="keywords"
                content="dịch vụ nông nghiệp du lịch, hợp tác xã, sản phẩm nông nghiệp, phunongbuondon"
            />
            <meta name="author" content="HTX Nông Nghiệp - Du Lịch Phú Nông Buôn" />
        </Helmet>
        <div className={cx('inner')}>
            <Title text="Về Chúng Tôi" />
            <div className={cx('content')}>
                <p>
                    Ngày 27/05/2019 Hợp tác xã Nông nghiệp và Du lịch Phú Nông – Buôn Đôn chính thức được thành lập và
                    ra đời nhằm mục đích khai thác thế mạnh của thiên nhiên, điều kiện tự nhiên, văn hóa, xã hội để phát
                    triển du lịch và nông nghiệp – sinh thái cộng đồng. Ngoài ra Hợp tác xã Nông nghiệp và Du lịch Phú
                    Nông còn mang trong mình trọng trách thúc đẩy nền kinh tế địa phương, tạo công ăn việc làm, góp phần
                    bảo vệ môi trường và một số vấn đề quan trọng trên địa bàn tỉnh Đắk Lăk và huyện Buôn Đôn.
                </p>
                <p>
                    <strong>PHÁT TRIỂN LÀM GIÀU BỀN VỮNG</strong>
                </p>
                <p>
                    Sau quá trình nghiên cứu và chuẩn bị chúng tôi đã nhận ra rằng những khu vực trên địa bàn có thể kể
                    đến như thôn Tân Phú là nơi có tiềm năng trong việc phát triển nguồn tài nguyên thiên nhiên có sẵn
                    phù hợp trong việc khai thác và canh tác nông nghiệp. Hiện nay có hơn 200 hộ dân từ khắp mọi miền
                    đất nước tập trung về đây sinh sống, chủ yếu người dân sống bằng nghề truyền thống là sản xuất nông
                    nghiệp. Hàng năm thu hoạch hàng nghìn kg các loại thực phẩm như: bò, gà, lợn, bê, và các loại trái
                    cây như: cam, quýt, mít,…. Không thể quên nhắc thới các cây công nghiệp quan trọng: hồ tiêu, cà phê
                </p>
                <p>
                    Từ những ngành sản xuất nông nghiệp truyền thống nhỏ lẻ phát triển thành các tổ chức sản xuất về
                    nhiều mảng khác nhau: Tổ sản xuất tiêu và cà phê sạch, Tổ nuôi trồng thủy sản, Tổ chăn nuôi gia súc,
                    Tổ du lịch sinh thái, du lịch nông nghiệp,… Ngày mới thành lập HTX chỉ có 22 thành viên, sau một
                    thời gian nỗ lực, không ngừng phấn đấu Phú Nông lấy được sự tin tưởng của người dân tiếp tục đăng ký
                    tham gia tới nay số thành viên đã tăng lên hơn gấp đôi. Điều quan trọng không chỉ nông dân sản xuất
                    nông nghiệp mà còn có cả sự tham gia của các cán bộ, cơ quan viên chức Nhà nước,…
                </p>
                <p>
                    <strong>Ngành nghề của chúng tôi</strong>
                </p>
                <p>
                    HTX Phú Nông hoạt động đa ngành nghề, trong đó tiêu biểu có thể kể đến là nuôi cá lồng, cải tạo nâng
                    cấp vườn cây quanh các hồ thủy điện, phát triển về du lịch sinh thái, du lịch nông nghiệp. Ngoài ra
                    còn thực hiện sản xuất các loại thực phẩm như chả cá, trái cây thực phẩm sấy khô và sấy dẻo, các
                    loại tinh dầu tự nhiên,…
                </p>
                <p>
                    <strong>Tình trạng hoạt động</strong>
                </p>
                <p>Sau một thời gian hoạt động, tính đến nay HTX đã có một số hoạt động cụ thể</p>
                <p>
                    Phấn đấu thực hiện công tác đưa HTX đi vào hoạt động theo đúng quy định của pháp luật. Thúc đẩy
                    truyền thông, giới thiệu về HTX qua các trang mạng xã hội và người dân xung quanh.
                </p>
                <p>
                    Tra cứu các văn bản pháp luật, các văn bản liên quan đến chủ trương, chính sách hướng dẫn các hoạt
                    động và phát triển của HTX. Tham gia đầy đủ các chương trình liên quan đến nông nghiệp.
                </p>
                <p>
                    Chia sẻ các kinh nghiệm về sản xuất, chăn nuôi, trồng chọt cho các thành viên có trong HTX và các mô
                    hình mà sản phẩm tiêu thụ trên thị trường. Chúng tôi không ngừng tìm kiếm đối tác, liên kết tìm đầu
                    ra cho các sản phẩm của thành viên. Tập trung thu hút nguồn lực từ các nhà đầu tư bên ngoài địa bàn.
                    Tập trung liên kết với các Công ty, Doanh nghiệp , HTX nhằm mục đích tiêu thụ sản phẩm cho nông dân.
                </p>
                <p>
                    HTX từ khi ra đời nhận được rất nhiều sự ủng hộ và giúp đỡ của nhiều cơ quan chức năng đưa Phú Nông
                    ngày một hoàn thiện và phát triển hơn nữa. Để đáp lại sự ủng hộ đó chúng tôi không ngừng phấn đấu và
                    luôn lấy trách nhiệm “giúp đời sống của bà con nông dân ngày càng đi lên” đặt lên hàng đầu.
                </p>
            </div>
        </div>
    </article>
);

export default About;
