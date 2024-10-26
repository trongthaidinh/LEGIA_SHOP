import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProduct } from '~/services/productService';
import { getCategoriesBySlug } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import { useDropzone } from 'react-dropzone';
import styles from './AddProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Spin } from 'antd';
import Button from 'components/Button';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);
    const [featureInput, setFeatureInput] = useState('');
    const [features, setFeatures] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        images: [],
        price: '',
        original_price: '',
        available_stock: '',
        content: '',
        child_nav_id: '',
        features: [],
        phone_number: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên sản phẩm là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        price: Yup.number().required('Giá là bắt buộc'),
        available_stock: Yup.number().required('Số lượng là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        child_nav_id: Yup.string().required('Danh mục là bắt buộc'),
        features: Yup.array().of(Yup.string().required('Chức năng không được bỏ trống')),
        phone_number: Yup.string().required('Số điện thoại là bắt buộc'),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesBySlug('san-pham');
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

        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('original_price', values.original_price);
        formData.append('available_stock', values.available_stock);
        files.forEach((image) => {
            formData.append('images[]', image);
        });
        formData.append('content', values.content);
        formData.append('child_nav_id', values.child_nav_id);
        formData.append('features', JSON.stringify(features));
        formData.append('phone_number', values.phone_number);

        try {
            await createProduct(formData);

            setNotification({ message: 'Thêm sản phẩm thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setFeatures([]);
            setTimeout(() => {
                navigate(routes.productList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm sản phẩm hoặc navigation.', type: 'error' });
            console.error('Lỗi khi tạ   o sản phẩm hoặc navigation:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        setFeatures((prevFeatures) => prevFeatures.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addProduct}>
            <Title subText="Thêm sản phẩm mới" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Sản Phẩm</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chọn Hình Ảnh</label>
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            <ErrorMessage name="images" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagesPreview}>
                            {files.map((img, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Product ${index}`}
                                        className={styles.productImage}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className={styles.removeButton}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Giá bán</label>
                            <Field name="price" type="number" className={styles.input} />
                            <ErrorMessage name="price" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="original_price">Giá Gốc</label>
                            <Field name="original_price" type="number" className={styles.input} />
                            <ErrorMessage name="original_price" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="available_stock">Số Lượng Tồn Kho</label>
                            <Field name="available_stock" type="number" className={styles.input} />
                            <ErrorMessage name="available_stock" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="child_nav_id">Danh Mục</label>
                            <Field as="select" name="child_nav_id" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="child_nav_id" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone_number">Số Điện Thoại</label>
                            <Field name="phone_number" type="text" className={styles.input} />
                            <ErrorMessage name="phone_number" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Thông tin tổng quan</label>
                            <div className={styles.featuresInput}>
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    className={styles.input}
                                    placeholder="Nhập thông tin và nhấn nút thêm"
                                />
                                <Button type="button" primary onClick={addFeature} className={styles.addButton}>
                                    Thêm
                                </Button>
                            </div>
                            <div className={styles.featuresList}>
                                {features.map((feature, index) => (
                                    <div key={index} className={styles.featureItem}>
                                        <span className={styles.featureTitle}>
                                            {index + 1}. {feature}
                                        </span>
                                        <button
                                            primary
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className={styles.removeButtonFeat}
                                        >
                                            <FontAwesomeIcon icon={faClose} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Nội Dung</label>
                            <CustomEditor
                                value={values.content}
                                onChange={(value) => setFieldValue('content', value)}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.buttonGroup}>
                            <Button primary type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Spin size="small" /> : 'Thêm Sản Phẩm'}
                            </Button>
                            <Button secondary type="button" onClick={() => navigate(routes.productList)}>
                                Hủy
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;
