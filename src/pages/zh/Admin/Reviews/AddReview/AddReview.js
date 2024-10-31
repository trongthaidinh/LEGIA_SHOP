import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createZhReview } from '~/services/reviewService';
import PushNotification from '~/components/PushNotification';
import styles from './AddReview.module.scss';
import { useNavigate } from 'react-router-dom';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';
import { Spin } from 'antd';
import routes from 'config/routes';

const AddReview = () => {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        review: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên là bắt buộc'),
        review: Yup.string().required('Đánh giá là bắt buộc'),
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
        accept: 'image/*',
        multiple: false,
    });

    const handleSubmit = async (values, { resetForm }) => {
        if (!file) {
            setNotification({ message: 'Vui lòng chọn một hình ảnh', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('review', values.review);
        formData.append('image', file);

        try {
            await createZhReview(formData);
            setNotification({ message: 'Thêm đánh giá thành công!', type: 'success' });
            resetForm();
            setFile(null);
            setTimeout(() => {
                navigate(routes.reviewListZH);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm đánh giá.', type: 'error' });
            console.error('Lỗi khi tạo đánh giá:', error);
        }
    };

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => setNotification({ message: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className={styles.addReview}>
            <Title subText="Thêm mới đánh giá" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Họ Tên Người Đánh giá</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="review">Đánh Giá</label>
                            <Field name="review" as="textarea" className={styles.input} />
                            <ErrorMessage name="review" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chọn Hình Ảnh</label>
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            {!file && <div className={styles.error}>Hình ảnh là bắt buộc</div>}
                        </div>
                        {file && (
                            <div className={styles.imageContainer}>
                                <img src={URL.createObjectURL(file)} alt="Review" className={styles.reviewImage} />
                                <button type="button" onClick={() => setFile(null)} className={styles.removeButton}>
                                    X
                                </button>
                            </div>
                        )}
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <Spin size="small" /> : 'Thêm Đánh Giá'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddReview;
