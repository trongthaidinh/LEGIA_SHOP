import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProduct } from '~/services/productService';
import { getCategoriesByType } from '~/services/categoryService';
import { createNavigationLink } from '~/services/navigationService';
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
import { getNavigationById } from 'services/navigationService';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [parentNavigations, setParentNavigations] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        images: [],
        content: '',
        summary: '',
        categoryID: '',
        parentNavId: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên sản phẩm là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        categoryID: Yup.string().required('Danh mục là bắt buộc'),
        parentNavId: Yup.string().required('Navigation cha là bắt buộc'),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(1);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };

        const fetchParentNavigations = async () => {
            try {
                const fetchedParentNavigations = await getNavigationById('66b826d912bc125879e8e651');
                setParentNavigations(fetchedParentNavigations.childs);
                console.log(fetchedParentNavigations);
            } catch (error) {
                console.error('Lỗi khi tải navigation cha:', error);
            }
        };

        fetchCategories();
        fetchParentNavigations();
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
        files.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('content', values.content);
        formData.append('summary', values.summary);
        formData.append('categoryID', values.categoryID);

        try {
            await createProduct(formData);
            const navigationData = {
                title: values.name,
                parentNavId: values.parentNavId,
                type: 1,
            };
            await createNavigationLink(navigationData);

            setNotification({ message: 'Thêm sản phẩm thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.productList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm sản phẩm hoặc navigation.', type: 'error' });
            console.error('Lỗi khi tạo sản phẩm hoặc navigation:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addProduct}>
            <Title text="Thêm sản phẩm mới" />
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
                            <label htmlFor="categoryID">Danh Mục</label>
                            <Field as="select" name="categoryID" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryID" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="parentNavId">Navigation Cha</label>
                            <Field as="select" name="parentNavId" className={styles.input}>
                                <option value="">Chọn navigation cha</option>
                                {parentNavigations.map((nav) => (
                                    <option key={nav._id} value={nav._id}>
                                        {nav.title}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="parentNavId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="summary">Tóm Tắt</label>
                            <Field name="summary" type="text" className={styles.input} />
                            <ErrorMessage name="summary" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Nội Dung</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <Spin size="small" /> : 'Thêm Sản Phẩm'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;
