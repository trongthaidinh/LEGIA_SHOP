import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '~/hooks/useAuth';
import styles from './Login.module.scss';
import companyLogo from '~/assets/images/nest-logo.png';

const Login = () => {
    const { signinZH } = useAuth();

    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            await signinZH(values);
        } catch (error) {
            setErrors({ email: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <img src={companyLogo} alt="Logo công ty" className={styles.logo} />
                <h1>Đăng nhập</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Vui lòng nhập tên đăng nhập';
                        }
                        if (!values.password) {
                            errors.password = 'Vui lòng nhập mật khẩu';
                        }
                        return errors;
                    }}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.formItem}>
                                <label htmlFor="email">Tên đăng nhập</label>
                                <Field name="email" type="email" />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <div className={styles.formItem}>
                                <label htmlFor="password">Mật khẩu</label>
                                <Field name="password" type="password" />
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <div className={styles.formItem}>
                                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                                    Đăng nhập
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
