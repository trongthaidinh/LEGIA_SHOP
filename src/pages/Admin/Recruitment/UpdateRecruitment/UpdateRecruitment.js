import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getRecruitmentById, updateRecruitment } from '~/services/recruitmentService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateRecruitment.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { Spin } from 'antd';

const UpdateRecruitment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        image: Yup.mixed().required('Hình ảnh là bắt buộc'),
        categoryId: Yup.string().required('Danh mục là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        isFeatured: Yup.boolean(),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(4);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };

        const fetchRecruitment = async () => {
            try {
                const recruitment = await getRecruitmentById(id);
                setInitialValues({
                    title: recruitment.title,
                    summary: recruitment.summary,
                    image: recruitment.images,
                    categoryId: recruitment.categoryId,
                    content: recruitment.content,
                    isFeatured: recruitment.isFeatured,
                });
            } catch (error) {
                console.error('Lỗi khi tải tuyển dụng:', error);
            }
        };

        fetchCategories();
        fetchRecruitment();
    }, [id]);

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('summary', values.summary);

        if (values.image) {
            formData.append('images', values.image);
        } else {
            formData.append('images', initialValues.images);
        }

        formData.append('categoryId', values.categoryId);
        formData.append('content', values.content);
        formData.append('isFeatured', values.isFeatured);

        try {
            await updateRecruitment(id, formData);
            setNotification({ message: 'Cập nhật tuyển dụng thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.recruitmentList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật tuyển dụng.', type: 'error' });
            console.error('Lỗi khi cập nhật tuyển dụng:', error);
        }
    };

    if (!initialValues) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.editRecruitment}>
            <Title subText="Cập nhật tuyển dụng" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Tiêu Đề</label>
                            <Field name="title" type="text" className={styles.input} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="summary">Tóm Tắt</label>
                            <Field name="summary" type="text" className={styles.input} />
                            <ErrorMessage name="summary" component="div" className={styles.error} />
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
                                    alt="Recruitment"
                                    className={styles.recruitmentImage}
                                />
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="categoryId">Danh Mục</label>
                            <Field as="select" name="categoryId" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Nội Dung</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                <Field type="checkbox" name="isFeatured" />
                                Đánh dấu là nổi bật
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <Spin size="small" /> : 'Cập Nhật'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateRecruitment;
