import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddNavigation.module.scss';
import Title from '~/components/Title';
import { getNavigationLinks, createNavigationLink } from '~/services/navigationService';
import routes from '~/config/routes';
import { Link, useNavigate } from 'react-router-dom';
import PushNotification from '~/components/PushNotification';
import { Spin } from 'antd';

const AddNavigation = () => {
    const [isError, setIsError] = useState(false);
    const [navigations, setNavigations] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNavigations = async () => {
            const data = await getNavigationLinks();
            setNavigations(data);
        };

        fetchNavigations();
    }, []);

    const initialValues = {
        title: '',
        type: '',
        parentNavId: '',
        position: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề!'),
        type: Yup.number().required('Vui lòng chọn loại Navigation!').oneOf([1, 2], 'Chọn loại không hợp lệ!'),
        parentNavId: Yup.string(),
        position: Yup.number().required('Vui lòng nhập vị trí!').integer().min(0, 'Vị trí không hợp lệ!'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const dataToSend = { ...values };
            if (values.type === 2) {
                delete dataToSend.parentNavId;
            }

            await createNavigationLink(dataToSend);
            resetForm();
            setTimeout(() => {
                navigate(routes.navigationList);
            }, 1000);
            setIsError(false);
            setNotificationMessage('Thêm Navigation thành công');
        } catch (error) {
            setIsError(true);
            setNotificationMessage('Có lỗi khi thêm Navigation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.formContainer}>
                <Title className={styles.pageTitle} text="Thêm mới Navigation" />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className={styles.form}>
                            <div className={styles.formItem}>
                                <label htmlFor="title">Tiêu đề</label>
                                <Field name="title" type="text" />
                                <ErrorMessage name="title" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.formItem}>
                                <label htmlFor="type">Loại Navigation</label>
                                <Field
                                    as="select"
                                    name="type"
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setFieldValue('type', value);
                                        if (value === 1) {
                                            setFieldValue('parentNavId', '');
                                        }
                                    }}
                                >
                                    <option value="">Chọn loại</option>
                                    <option value="2">Navigation chính</option>
                                    <option value="1">Navigation phụ</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className={styles.errorMessage} />
                            </div>

                            {values.type === 1 && (
                                <div className={styles.formItem}>
                                    <label htmlFor="parentNavId">Navigation Cha</label>
                                    <Field as="select" name="parentNavId">
                                        <option value="">Chọn Navigation Cha</option>
                                        {navigations.map((nav) => (
                                            <option key={nav._id} value={nav._id}>
                                                {nav.title}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="parentNavId" component="div" className={styles.errorMessage} />
                                </div>
                            )}

                            <div className={styles.formItem}>
                                <label htmlFor="position">Vị trí</label>
                                <Field name="position" type="number" placeholder="Nhập vị trí ( Ví dụ: 2 )" />
                                <ErrorMessage name="position" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.buttonContainer}>
                                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                                    {isSubmitting ? <Spin size="small" /> : 'Thêm Navigation'}
                                </button>
                                <Link to={routes.navigationList} className={styles.backButton}>
                                    <button type="button" className={styles.cancelButton}>
                                        Hủy
                                    </button>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <PushNotification message={notificationMessage} type={isError ? 'error' : 'success'} />
        </div>
    );
};

export default AddNavigation;
