import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createRecruitment } from '~/services/recruitmentService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddRecruitment.module.scss';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames/bind';
import { Spin } from 'antd';

const AddRecruitment = () => {
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    const initialValues = {
        title: '',
        summary: '',
        images: [],
        categoryId: '',
        content: '',
        isFeatured: false,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        categoryId: Yup.string().required('Danh mục là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
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
        fetchCategories();
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
        accept: 'image/*',
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('summary', values.summary);
        files.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('categoryId', values.categoryId);
        formData.append('content', values.content);
        formData.append('isFeatured', values.isFeatured);

        try {
            await createRecruitment(formData);
            setNotification({ message: 'Thêm tuyển dụng thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.recruitmentList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm tuyển dụng.', type: 'error' });
            console.error('Lỗi khi tạo tuyển dụng:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={cx('addRecruitment')}>
            <Title text="Thêm mới tuyển dụng" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={cx('form')}>
                        <div className={cx('formGroup')}>
                            <label htmlFor="title">Tiêu Đề</label>
                            <Field name="title" type="text" className={cx('input')} />
                            <ErrorMessage name="title" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formGroup')}>
                            <label htmlFor="summary">Tóm Tắt</label>
                            <Field name="summary" type="text" className={cx('input')} />
                            <ErrorMessage name="summary" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formGroup')}>
                            <label>Chọn Hình Ảnh</label>
                            <div {...getRootProps()} className={cx('dropzone')}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            <ErrorMessage name="images" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('imagesPreview')}>
                            {files.map((img, index) => (
                                <div key={index} className={cx('imageContainer')}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Recruitment ${index}`}
                                        className={cx('productImage')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className={cx('removeButton')}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={cx('formGroup')}>
                            <label htmlFor="categoryId">Danh Mục</label>
                            <Field as="select" name="categoryId" className={cx('input')}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formGroup')}>
                            <label htmlFor="content">Nội Dung</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={cx('error')} />
                        </div>
                        <div className={cx('formGroup')}>
                            <label>
                                <Field type="checkbox" name="isFeatured" />
                                Đánh dấu là nổi bật
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={cx('submitButton')}>
                            {isSubmitting ? <Spin size="small" /> : 'Thêm Tuyển Dụng'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddRecruitment;
