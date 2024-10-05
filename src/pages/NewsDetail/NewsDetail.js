import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NewsDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
// import { getNewsById } from '~/services/newsService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

// Sample data for news detail
const sampleNewsDetail = {
    id: 1,
    title: 'Người Cao Huyết Áp Có Ăn Yến Được Không? – Một Số Tác Dụng Và Lưu Ý',
    summary: 'This is a summary of the sample news.',
    content: `<h2>Người cao huyết áp có ăn yến được không?</h2>
    <br/>
<p>
    Cao huyết áp là căn bệnh có thể gây ra những biến chứng nguy hiểm cho cơ thể người bệnh. Người cao huyết áp thường có thực đơn và chế độ ăn uống riêng so với người bình thường. Do đó việc chăm sóc sức khỏe cho người cao huyết áp là vô cùng quan trọng. “Yến sào” được xem là thực phẩm bổ sung nhiều dưỡng chất cho cơ thể. Tuy nhiên người cao huyết áp có ăn yến được không? Hãy cùng LAGIA NEST tìm hiểu trong bài viết này nhé!
</p>
<br/>
<div style="width: 100%; display:flex; justify-content: center; align-items: center;">
    <img src="https://lagianest.com/wp-content/uploads/2023/08/nguoi-cao-huyet-ap-co-an-yen-duoc-khong.jpg" alt="test"/>
</div>

<br/>
<h3>1. Cao huyết áp là bệnh gì và nguyên nhân gây ra bệnh?</h3>
<br/>
<p>
    Cao huyết áp hay còn gọi là gia tăng đường huyết là một bệnh lý mãn tính khi áp lực của máu tác động lên đến thành động mạch và khi huyết áp tăng cao có thể gây nhiều áp lực cho tim. Đây được xem là nguyên nhân của nhiều căn bệnh nghiêm trọng như: nhồi máu cơ tim, tai biến mạch máu não,…
</p>
<br/>
<p>
    Theo thống kê hiện nay chỉ có khoảng 10% người bị cao huyết áp là biết được nguyên nhân (tăng huyết áp thứ phát). Phần lớn tăng huyết áp ở người trưởng thành thì lại không rõ nguyên nhân. Theo nghiên cứu y học, đối tượng bị cao huyết áp thường là: người cao tuổi, người thừa cân, béo phì, người hay uống rượu bia, thuốc lá, thiếu tập luyện…Nghiên cứu khác cũng chỉ ra rằng cao huyết áp cũng có thể do di truyền.
</p>
<br/>
<div style="width: 100%; display:flex; justify-content: center; align-items: center;">
    <img src="https://lagianest.com/wp-content/uploads/2023/08/cao-huyet-ap-va-nguyen-nhan.jpg" alt="test"/>
</div>
<br/>
<h3>2. Người cao huyết áp có ăn yến được không?</h3>
<br/>
<p>
    Người cao huyết áp có ăn yến được không? Người cao huyết áp có thể ăn yến bên cạnh đó cần phải cân nhắc về liều lượng và mức độ. Theo nghiên cứu y học và khoa học thì trong yến sào có chứa nhiều loại axit amin như: arginine, amide, lysine, cystine, humin,..cùng với 60% chất đạm tự nhiên.
</p>
<br/>
<p>
    Yến sào có tác dụng rất tốt trong việc điều hòa huyết áp, mang đến sự tỉnh táo cùng tinh thần sảng khoái, minh mẫn. Do đó, bệnh nhân cao huyết áp đặc biệt là đối với những người lớn tuổi nên thường xuyên bổ sung yến sào để tăng cường sức khỏe và mang đến nhiều dưỡng chất cần thiết cho cơ thế. Đặc biệt, yến sào còn có chứa nhiều axit amin có lợi cho hệ tim mạch. Những dưỡng chất này có thể hỗ trợ tăng cường sức khỏe tổng thể.
</p>
<br/>
<h3>3. Một số tác dụng của yến sào đối với sức khỏe người cao huyết áp</h3>
<br/>
<ul>
    <li>
        <strong>Tăng cường sức khỏe tổng thể:</strong> Yến sào chứa nhiều protein và dưỡng chất quý giá như canxi, sắt, kali và vitamin B. Protein giúp duy trì cơ bắp và hệ thống miễn dịch, trong khi các dưỡng chất trên hỗ trợ cơ thể hoạt động hiệu quả và tăng cường sức khỏe tổng thể.
    </li>
    <li>
        <strong>Chất chống oxy hóa:</strong> Yến sào chứa các hợp chất chống oxy hóa như enzyme Glutathione và Sialic Acid, giúp chống lại sự hủy hoại tế bào và giảm nguy cơ các bệnh liên quan đến tuổi tác, bao gồm cả bệnh cao huyết áp.
    </li>
    <li>
        <strong>Hỗ trợ làm giảm stress:</strong> Có một số nghiên cứu cho thấy yến sào có khả năng giúp giảm stress và cải thiện tâm trạng. Stress là một trong những yếu tố gây ra cao huyết áp, do đó, việc giảm stress có thể hỗ trợ điều trị và kiểm soát tình trạng cao huyết áp.
    </li>
    <li>
        <strong>Tăng cường chức năng tim mạch:</strong> Một số thành phần trong yến sào, như Acid amin và Peptide, có thể hỗ trợ chức năng tim mạch và tuần hoàn máu, giúp điều chỉnh huyết áp và giảm nguy cơ mắc các bệnh về tim mạch.
    </li>
    <li>
        <strong>Tốt cho tiêu hóa:</strong> Yến sào còn có khả năng giúp cải thiện chức năng tiêu hóa, hấp thụ dinh dưỡng tốt hơn, giúp cơ thể hấp thu các dưỡng chất quan trọng từ thực phẩm và duy trì cân bằng nước điện giải, điều quan trọng để kiểm soát huyết áp.
    </li>
</ul>
<br/>
<h3>4. Liều lượng sử dụng yến sào cho người cao huyết áp</h3>
<br/>
<p>
    Người bị cao huyết áp có thể bổ sung yến sào khoảng 50gr/tháng và sử dụng một tuần khoản 2 lần, mỗi lần có thể sử dụng khoảng 4gr yến là hợp lý khoảng 1 đến 2 chén yến sào mỗi tuần. Không nên dùng nhiều có thể dẫn đến nguy cơ bị tăng huyết áp. Trong tổ yến có chứa nhiều acid amin, các khoáng chất Mg, Ca,… giúp chống oxy hóa.
</p>
<br/>
<h3>5. Một số lưu ý khi sử dụng yến sào cho người cao huyết áp</h3>
<br/>
<ul>
    <li>
        <strong>Thời điểm sử dụng yến sào:</strong> Bạn có thể sử dụng vào sáng sớm, xế chiều hoặc buổi tối trước khi ngủ, đây là “thời điểm vàng” để hấp thu nhiều dưỡng chất nhất.
    </li>
    <li>
        <strong>Kiểm tra thành phần dinh dưỡng:</strong> Tránh sử dụng tổ yến chứa chất bảo quản, chất tạo màu hay các hương liệu nhân tạo.
    </li>
    <li>
        <strong>Kết hợp với thực phẩm khác:</strong> Nên ăn yến sào kết hợp với các thực phẩm có lợi như rau xanh, hoa quả tươi, cá hồi, thịt gà không da.
    </li>
    <li>
        <strong>Theo dõi tình trạng sức khỏe:</strong> Hãy theo dõi sức khỏe thường xuyên nếu sử dụng yến sào. Nếu có biến chứng về huyết áp, hãy điều chỉnh lại chế độ ăn uống theo lời khuyên của bác sĩ.
    </li>
</ul>
<br/>
<h3>6. Gợi ý một số món ăn với yến sào phù hợp với người bị bệnh cao huyết áp</h3>
<br/>
<ul>
    <li>
        Tổ yến chưng đường phèn là món ăn đơn giản và dễ ăn với người bệnh cao huyết áp.
    </li>
    <li>
        Chè tổ yến hạt sen là sự kết hợp hài hòa giữa yến sào và hạt sen, giúp tăng cường trí nhớ, chống mất ngủ, và làm đẹp da.
    </li>
    <li>
        Súp yến sào nấu với nấm hương, gà và rau củ là món ăn giàu dinh dưỡng cho người cao huyết áp.
    </li>
</ul>
<br/>
<h3>7. Tổng kết</h3>
<br/>
<p>
    Yến sào có nhiều tác dụng tuyệt vời với tất cả mọi người và với những người bệnh cao huyết áp. LAGIA NEST đã cùng bạn tìm hiểu qua người cao huyết áp có ăn yến được không? Mọi thắc mắc cần giải đáp cũng như những câu hỏi về các sản phẩm yến sào, mọi người có thể liên hệ ngay Yến Sào Cao Cấp LAGIA NEST để được giải đáp kịp thời nhé!
</p>
`,
    created_at: '2024-10-01',
    views: 345,
};

const NewsDetail = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const detail = sampleNewsDetail;
            setNewsDetail(detail);
            setLoading(false);
            setError(null);
        } else {
            setError(new Error('Invalid news ID'));
            setLoading(false);
        }
    }, [id]);

    if (error) {
        const errorMessage = error.message || 'Something went wrong';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{newsDetail.title} | Yến Sào LeGia Nest</title>
                <meta name="description" content={newsDetail.summary} />
                <meta name="keywords" content="tin tức, phunongbuondon, chi tiết tin tức" />
                <meta name="author" content="Yến Sào LeGia Nest" />
            </Helmet>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <Title subText={newsDetail.title} className={cx('title')} />
                </div>
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
                <DateTime
                    timestamp={newsDetail.created_at}
                    views={newsDetail.views}
                    showDate={true}
                    showTime={true}
                    showViews={true}
                />
            </div>
        </article>
    );
};

export default NewsDetail;
