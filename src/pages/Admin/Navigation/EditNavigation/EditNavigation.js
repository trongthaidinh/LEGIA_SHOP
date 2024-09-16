import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getNavigationById, updateNavigationLink, getNavigationLinks } from '~/services/navigationService';
import styles from './EditNavigation.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const EditNavigation = () => {
    const { id } = useParams();
    const [, setNavigations] = useState([]);
    const navigate = useNavigate();
    const [navigation, setNavigation] = useState(null);
    const [title, setTitle] = useState('');
    const [type, setType] = useState(2);
    const [position, setPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchNavigation = async () => {
            setLoading(true);
            try {
                const data = await getNavigationById(id);
                setNavigation(data);
                setTitle(data.title);
                setType(data.parentNavId ? 1 : 2);
                setPosition(data.position);
            } catch (error) {
                setIsError(true);
                setNotificationMessage('Có lỗi xảy ra khi tải dữ liệu!');
            } finally {
                setLoading(false);
            }
        };

        fetchNavigation();
    }, [id]);

    useEffect(() => {
        const fetchNavigations = async () => {
            setLoading(true);
            try {
                const data = await getNavigationLinks();
                setNavigations(data);
            } catch (error) {
                setIsError(true);
                setNotificationMessage('Có lỗi khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchNavigations();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateNavigationLink(id, { title, type, position });
            setIsError(false);
            setTimeout(() => {
                navigate(routes.navigationList);
            }, 1000);
            setNotificationMessage('Navigation đã được cập nhật!');
        } catch (error) {
            console.error('Error updating navigation:', error);
            setIsError(true);
            setNotificationMessage('Có lỗi xảy ra khi cập nhật!');
        } finally {
            setLoading(false);
        }
    };

    if (!navigation) return <LoadingScreen />;

    return (
        <div className={styles.navigationContainer}>
            <Title className={styles.pageTitle} text="Chỉnh sửa Navigation" />
            <form onSubmit={handleSave}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Tiêu đề</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Loại Navigation</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(parseInt(e.target.value, 10))}
                        className={styles.inputField}
                    >
                        <option value={2}>Navigation chính</option>
                        <option value={1}>Navigation phụ</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="position">Vị trí</label>
                    <input
                        type="number"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(parseInt(e.target.value, 10))}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.actionsContainer}>
                    <button type="submit" className={styles.saveButton}>
                        <FontAwesomeIcon icon={faSave} /> Lưu
                    </button>
                    <Link to={routes.navigationList} className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
                    </Link>
                </div>
            </form>
            {loading && <LoadingScreen />}
            <PushNotification message={notificationMessage} type={isError ? 'error' : 'success'} />
        </div>
    );
};

export default EditNavigation;
