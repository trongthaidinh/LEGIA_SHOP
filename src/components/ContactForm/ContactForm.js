import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '~/components/Button';
import { createMessage } from '~/services/contactService';
import PushNotification from '~/components/PushNotification';
import styles from './ContactForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ContactForm = () => {
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
        <div className={cx('contactForm')}>
            <div className={cx('formText')}>
                <h2>Đăng ký tư vấn miễn phí</h2>
                <p>
                    Vui lòng hoàn thành biểu mẫu và gửi cho chúng tôi, nhân viên của chúng tôi sẽ liên hệ lại sau ít
                    phút.
                </p>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                                <Field type="text" id="phoneNumber" name="phoneNumber" className={cx('input')} />
                                <ErrorMessage name="phoneNumber" component="div" className={cx('error')} />
                            </div>
                        </div>
                        <div className={cx('formGroup')}>
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
                                    value="Khác"
                                    className={cx('customRadio')}
                                />
                                <label htmlFor="subject3" className={cx('radioLabel')}>
                                    Khác
                                </label>
                            </div>
                            <ErrorMessage name="subject" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formGroup')}>
                            <label htmlFor="message">Nội dung</label>
                            <Field as="textarea" id="message" name="message" className={cx('input', 'textarea')} />
                            <ErrorMessage name="message" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formActions')}>
                            <Button primary type="submit" disabled={isSubmitting}>
                                Gửi
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <PushNotification message={notification.message} type={notification.type} />
        </div>
    );
};

export default ContactForm;
