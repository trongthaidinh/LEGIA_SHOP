/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
    // faMobileAlt,
    // faWrench,
    // faCogs,
    // faChartLine,
    // faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { createMessage } from '~/services/contactService';
import PushNotification from '~/components/PushNotification';
import { Helmet } from 'react-helmet';
import styles from './Contact.module.scss';
import {
    faFacebook,
    faInstagram,
    faSkype,
    faTelegram,
    faTwitter,
    faViber,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContactPage = () => {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Vui lòng nhập Họ và Tên của bạn!'),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
        phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
        subject: Yup.string().required('Vui lòng chọn chủ đề!'),
        message: Yup.string().required('Vui lòng nhập nội dung tin nhắn!'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await createMessage(values);
            setNotification({ message: 'Gửi tin nhắn thành công!', type: 'success' });
            resetForm();
        } catch (error) {
            console.error('Error sending message:', error);
            setNotification({ message: 'Lỗi khi gửi tin nhắn.', type: 'error' });
        }
    };

    return (
        <div className={cx('contactPage')}>
            <Helmet>
                <title>Liên Hệ | Yến Sào LeGia Nest </title>
                <meta name="description" content="Hãy gửi tin nhắn cho chúng tôi nếu bạn có bất kỳ câu hỏi nào." />
                <meta name="keywords" content="liên hệ, phunongbuondon, gửi tin nhắn" />
                <meta name="author" content="Yến Sào LeGia Nest " />
            </Helmet>
            <div className={cx('mapContainer')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.1974919759023!2d108.05976667454256!3d12.700529320764453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f7e82916a097%3A0xf624f682171e01ef!2zNjIgTmd1eeG7hW4gSOG7r3UgVGjhu40sIFTDom4gQW4sIEJ1w7RuIE1hIFRodeG7mXQsIMSQ4bqvayBM4bqvaywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1727944007225!5m2!1sen!2s"
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={cx('inner')}>
                <div className={cx('formWrapper')}>
                    <div className={cx('contactInfo')}>
                        <div className={cx('infoTitle')}>
                            <h2 className={cx('title')}>Thông tin liên hệ</h2>
                            <p className={cx('subTitle')}>Hãy liên hệ với chúng tôi!</p>
                        </div>
                        <div className={cx('infoDetails')}>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('icon')} />
                                <a href="tel:0961862450">
                                    Mobile/Zalo: <span>077 233 2255</span>
                                </a>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                <a href="mailto:htxphunong.buondon@gmail.com">
                                    Email: <span>lxchinh@gmail.com</span>
                                </a>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('icon')} />
                                <span>
                                    Địa chỉ: 60 - 62 Nguyễn Hữu Thọ, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đăk Lăk
                                </span>
                            </div>
                        </div>

                        <div className={cx('socialLinks')}>
                            <Link to="https://www.facebook.com/takatechsoft/">
                                <FontAwesomeIcon icon={faFacebook} className={cx('socialIcon')} />
                            </Link>
                            <Link to="https://www.instagram.com/dinhtuan.le/">
                                <FontAwesomeIcon icon={faInstagram} className={cx('socialIcon')} />
                            </Link>
                            <Link to="https://x.com/takatech_bmt">
                                <FontAwesomeIcon icon={faTwitter} className={cx('socialIcon')} />
                            </Link>
                        </div>
                    </div>
                    <div className={cx('contactForm')}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className={cx('formGroup')}>
                                        <label htmlFor="fullName">Họ và Tên</label>
                                        <Field type="text" id="fullName" name="fullName" className={cx('input')} />
                                        <ErrorMessage name="fullName" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('formGroup', 'formRow')}>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" id="email" name="email" className={cx('input')} />
                                            <ErrorMessage name="email" component="div" className={cx('error')} />
                                        </div>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="phoneNumber">Số điện thoại</label>
                                            <Field
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className={cx('input')}
                                            />
                                            <ErrorMessage name="phoneNumber" component="div" className={cx('error')} />
                                        </div>
                                    </div>
                                    {/* <div className={cx('formGroup')}>
                                        <label>Chủ đề</label>
                                        <div className={cx('subject')}>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject1"
                                                value="Dịch vụ"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject1" className={cx('radioLabel')}>
                                                Dịch vụ
                                            </label>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject2"
                                                value="Sản phẩm"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject2" className={cx('radioLabel')}>
                                                Sản phẩm
                                            </label>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject3"
                                                value="Trải nghiệm"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject3" className={cx('radioLabel')}>
                                                Trải nghiệm
                                            </label>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject4"
                                                value="Khác"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject3" className={cx('radioLabel')}>
                                                Khác
                                            </label>
                                        </div>
                                        <ErrorMessage name="subject" component="div" className={cx('error')} />
                                    </div> */}
                                    <div className={cx('formGroup')}>
                                        <label htmlFor="message">Nội dung lời nhắn</label>
                                        <Field
                                            as="textarea"
                                            id="message"
                                            name="message"
                                            className={cx('input', 'textarea')}
                                        />
                                        <ErrorMessage name="message" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('formActions')}>
                                        <Button type="submit" disabled={isSubmitting}>
                                            Gửi
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <PushNotification message={notification.message} type={notification.type} />
        </div>
    );
};

export default ContactPage;
