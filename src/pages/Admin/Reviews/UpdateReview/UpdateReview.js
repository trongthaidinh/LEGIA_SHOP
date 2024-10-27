import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getReviewById, updateReview } from '~/services/reviewService';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateReview.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import Title from '~/components/Title';
import { Spin } from 'antd';
import routes from 'config/routes';

const UpdateReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên là bắt buộc'),
        review: Yup.string().required('Đánh giá là bắt buộc'),
        image: Yup.mixed().required('Hình ảnh là bắt buộc'),
    });

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const review = await getReviewById(id);
                setInitialValues({
                    name: review.name,
                    review: review.review,
                    image: review.image,
                });
            } catch (error) {
                console.error('Lỗi khi tải đánh giá:', error);
            }
        };

        fetchReview();
    }, [id]);

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('review', values.review);
        if (values.image) {
            formData.append('image', values.image);
        }

        try {
            await updateReview(id, formData);
            setNotification({ message: 'Cập nhật đánh giá thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.reviewList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật đánh giá.', type: 'error' });
            console.error('Lỗi khi cập nhật đánh giá:', error);
        }
    };

    if (!initialValues) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.updateReview}>
            <Title subText="Cập nhật đánh giá" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên</label>
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleImageUpload(event, setFieldValue)}
                            />
                            <ErrorMessage name="image" component="div" className={styles.error} />
                        </div>
                        {values.image && (
                            <div className={styles.imagePreview}>
                                <img
                                    src={
                                        typeof values.image === 'string'
                                            ? values.image
                                            : URL.createObjectURL(values.image)
                                    }
                                    alt="Review"
                                    className={styles.reviewImage}
                                />
                            </div>
                        )}
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <Spin size="small" /> : 'Cập nhật'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateReview;
