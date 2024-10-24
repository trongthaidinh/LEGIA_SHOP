import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Certification.module.scss';
import Title from 'components/TitleSub';

const cx = classNames.bind(styles);

const mockCertificates = [
    {
        id: 1,
        url: 'https://res.cloudinary.com/drioug4df/image/upload/v1729792595/514a5cb7-b6ba-48f6-905e-dccc1513d4d0_rnv1k8.jpg',
        title: 'Chứng nhận 2',
    },
    {
        id: 2,
        url: 'https://res.cloudinary.com/drioug4df/image/upload/v1728013729/ec36f79c-f114-4004-959d-93dc38f7b82d.jpg',
    },
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
