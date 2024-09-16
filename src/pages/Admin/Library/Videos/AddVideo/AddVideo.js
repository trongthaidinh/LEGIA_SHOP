import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createVideo } from '~/services/libraryService';
import PushNotification from '~/components/PushNotification';
import styles from './AddVideo.module.scss';
import routes from '~/config/routes';
import Title from '~/components/Title';

const AddVideo = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        videoUrl: '',
        title: '',
        description: '',
    };

    const validationSchema = Yup.object({
        videoUrl: Yup.string().url('URL không hợp lệ').required('URL video là bắt buộc'),
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const videoData = {
            video: values.videoUrl,
            title: values.title,
            description: values.description,
            // createdBy: 'admin',
        };

        try {
            await createVideo(videoData);
            setNotification({ message: 'Thêm video thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.videosList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm video.', type: 'error' });
            console.error('Lỗi khi tạo video:', error);
        }
    };

    return (
        <div className={styles.addVideo}>
            <Title text="Thêm Video" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>URL Video</label>
                            <Field type="text" name="videoUrl" className={styles.inputField} />
                            <ErrorMessage name="videoUrl" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tiêu đề</label>
                            <Field type="text" name="title" className={styles.inputField} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Mô tả</label>
                            <Field type="text" name="description" className={styles.inputField} />
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Video
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddVideo;
