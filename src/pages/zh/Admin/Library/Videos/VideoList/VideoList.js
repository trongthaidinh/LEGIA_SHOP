import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteVideo, getVideos } from '~/services/libraryService';
import styles from './VideoList.module.scss';
import Title from '~/components/Title';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        fetchVideos();
    }, [currentPage, itemsPerPage]);

    const fetchVideos = async () => {
        try {
            const data = await getVideos();
            if (data) {
                setVideos(data);
            } else {
                setNotification({ message: 'Lỗi khi tải thư viện video.', type: 'error' });
            }
        } catch (error) {
            console.error('Lỗi khi lấy video:', error);
            setNotification({ message: 'Lỗi khi tải thư viện video.', type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa video này không?')) {
            try {
                await deleteVideo(id);
                setVideos(videos.filter((video) => video.id !== id));
                setNotification({ message: 'Xóa video thành công!', type: 'success' });
            } catch (error) {
                console.error('Lỗi khi xóa video:', error);
                setNotification({ message: 'Lỗi khi xóa video!', type: 'error' });
            }
        }
    };

    const filteredVideos = videos.filter((video) => video.url.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
    const indexOfLastVideo = currentPage * itemsPerPage;
    const indexOfFirstVideo = indexOfLastVideo - itemsPerPage;
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    return (
        <div className={styles.videoContainer}>
            <Title className={styles.pageTitle} subText="Danh sách video" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm video..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addVideo} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm video mới
                </Link>
            </div>

            <div className={styles.videoList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Video</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVideos.length > 0 ? (
                            currentVideos.map((video) => (
                                <tr key={video.id}>
                                    <td>
                                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                                            {video.url}
                                        </a>
                                    </td>
                                    <td>{new Date(video.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(video.id)} className={styles.deleteButton}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.itemsPerPage}>
                <label htmlFor="itemsPerPage">Hiển thị: </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <div className={styles.pagination}>
                <span>
                    Hiển thị {indexOfFirstVideo + 1} đến {Math.min(indexOfLastVideo, filteredVideos.length)} trong{' '}
                    {filteredVideos.length} mục
                </span>
                <div className={styles.paginationControls}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
        </div>
    );
};

export default VideoList;
