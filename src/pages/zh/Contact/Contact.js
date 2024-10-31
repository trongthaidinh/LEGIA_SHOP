/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { createMessage } from '~/services/contactService';
import PushNotification from '~/components/PushNotification';
import { Helmet } from 'react-helmet';
import styles from './Contact.module.scss';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContactPage = () => {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('请输入您的姓名！'),
        email: Yup.string().email('邮箱格式不正确').required('请输入邮箱！'),
        phoneNumber: Yup.string().required('请输入电话号码'),
        message: Yup.string().required('请输入留言内容！'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await createMessage(values);
            setNotification({ message: '消息发送成功！', type: 'success' });
            resetForm();
        } catch (error) {
            console.error('Error sending message:', error);
            setNotification({ message: '发送消息时出错。', type: 'error' });
        }
    };

    return (
        <div className={cx('contactPage')}>
            <Helmet>
                <title>联系我们 | 乐嘉燕窝</title>
                <meta name="description" content="如果您有任何问题，请给我们留言。" />
                <meta name="keywords" content="联系我们, 乐嘉燕窝, 留言" />
                <meta name="author" content="乐嘉燕窝" />
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
                            <h2 className={cx('title')}>联系方式</h2>
                            <p className={cx('subTitle')}>欢迎联系我们！</p>
                        </div>
                        <div className={cx('infoDetails')}>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('icon')} />
                                <a href="tel:0961862450">
                                    手机/Zalo: <span>077 233 2255</span>
                                </a>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                <a href="mailto:lxchinh@gmail.com">
                                    邮箱: <span>lxchinh@gmail.com</span>
                                </a>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('icon')} />
                                <span>
                                    地址: 60 - 62 Nguyễn Hữu Thọ, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đăk Lăk
                                </span>
                            </div>
                        </div>

                        <div className={cx('socialLinks')}>
                            <Link to="https://www.facebook.com/profile.php?id=100064173304425">
                                <FontAwesomeIcon icon={faFacebook} className={cx('socialIcon')} />
                            </Link>
                            <Link to="https://www.instagram.com">
                                <FontAwesomeIcon icon={faInstagram} className={cx('socialIcon')} />
                            </Link>
                            <Link to="https://x.com">
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
                                        <label htmlFor="fullName">姓名</label>
                                        <Field type="text" id="fullName" name="fullName" className={cx('input')} />
                                        <ErrorMessage name="fullName" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('formGroup', 'formRow')}>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="email">邮箱</label>
                                            <Field type="email" id="email" name="email" className={cx('input')} />
                                            <ErrorMessage name="email" component="div" className={cx('error')} />
                                        </div>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="phoneNumber">电话号码</label>
                                            <Field
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className={cx('input')}
                                            />
                                            <ErrorMessage name="phoneNumber" component="div" className={cx('error')} />
                                        </div>
                                    </div>
                                    <div className={cx('formGroup')}>
                                        <label htmlFor="message">留言内容</label>
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
                                            发送
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
