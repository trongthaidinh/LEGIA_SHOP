import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createImage } from '~/services/libraryService';
import PushNotification from '~/components/PushNotification';
import { useDropzone } from 'react-dropzone';
import styles from './AddImage.module.scss';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const AddImage = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);

    const initialValues = {
        image: [],
        type: 'public',
    };

    const validationSchema = Yup.object({
        image: Yup.array().required('Logo là bắt buộc'),
        type: Yup.string().oneOf(['public', 'private']).required('Vui lòng chọn loại hình ảnh!'),
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
        accept: 'image/*',
    });

    const handleSubmit = async (values, { resetForm }) => {
        if (files.length === 0) {
            setNotification({ message: 'Vui lòng chọn ảnh!', type: 'error' });
            return;
        }

        const formData = new FormData();
        files.forEach((image) => {
            formData.append('image', image);
            formData.append('name', 'legia_image');
        });
        formData.append('type', values.type);

        try {
            await createImage(formData);
            setNotification({ message: 'Thêm ảnh thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.imagesList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm ảnh.', type: 'error' });
            console.error('Lỗi khi tạo ảnh:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addImage}>
            <Title text="Thêm hình ảnh" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div {...getRootProps()} className={styles.dropzone}>
                            <input {...getInputProps()} />
                            <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                        </div>
                        <ErrorMessage name="image" component="div" className={styles.error} />
                        <div className={styles.imagePreview}>
                            {files.map((img, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Logo ${index}`}
                                        className={styles.imageLogo}
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
                            <label htmlFor="type">Loại hình ảnh</label>
                            <Field as="select" name="type" className={styles.formGroup}>
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </Field>
                            <ErrorMessage name="type" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <div className={styles.spinner}></div> : 'Thêm ảnh'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddImage;
