import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Certification.module.scss';
import Title from 'components/TitleSub';

const cx = classNames.bind(styles);

const mockCertificates = [
    { id: 1, url: 'https://lagianest.com/wp-content/uploads/2022/11/quang-cao-yen-1.2.jpg', title: 'Chứng nhận 2' },
    {
        id: 2,
        url: 'https://res.cloudinary.com/drioug4df/image/upload/v1728013729/ec36f79c-f114-4004-959d-93dc38f7b82d.jpg',
    },
    { id: 3, url: 'https://lagianest.com/wp-content/uploads/2022/11/quang-cao-yen-1.3.jpg', title: 'Chứng nhận 3' },
];

function Certification() {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        setCertificates(mockCertificates);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title subText="Chứng nhận an toàn" />
                <div className={cx('certificates')}>
                    {certificates.map((cert) => (
                        <div key={cert.id} className={cx('certificate')}>
                            <img src={cert.url} alt={cert.title} className={cx('certificate-image')} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Certification;
