import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './CustomerLogin.module.scss'; // Sử dụng module.scss để styling
import loginLogo from '~/assets/images/loginImage.jpg';

const CustomerLogin = () => {
    const [loginError, setLoginError] = useState(null);

    // Schema xác thực dữ liệu đầu vào
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    });

    // Xử lý form submit
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);

        // Giả lập kiểm tra đăng nhập
        if (values.email === 'customer@example.com' && values.password === 'password123') {
            setLoginError(null);
            alert('Đăng nhập thành công!');
        } else {
            setLoginError('Email hoặc mật khẩu không chính xác.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.leftSide}>
                    <img src={loginLogo} alt="Login Illustration" className={styles.loginImage} />
                </div>
                <div className={styles.rightSide}>
                    <h2 className={styles.title}>Đăng nhập</h2>
                    {loginError && <div className={styles.error}>{loginError}</div>}

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className={styles.loginForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className={styles.inputField} />
                                    <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Mật khẩu</label>
                                    <Field type="password" name="password" className={styles.inputField} />
                                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.actionsRow}>
                                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                        Đăng nhập
                                    </button>
                                    <a href="#" className={styles.forgotPassword}>
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                <div className={styles.signupPrompt}>
                                    <span>Bạn chưa có tài khoản?</span>
                                    <a href="#" className={styles.signupLink}>
                                        Đăng ký ngay
                                    </a>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
