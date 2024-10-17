import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Title from '~/components/Title';
import Modal from './ModalLibrary';
import { getPublicImages, getVideos } from '~/services/libraryService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Library.module.scss';
// import ButtonGroup from '~/components/ButtonGroup';
import LoadingScreen from '~/components/LoadingScreen';

// Dữ liệu mẫu
// const mockData = {
//     videos: [
//         { url: 'https://www.youtube.com/watch?v=2qwl0b0V5cg', title: 'Video 1' },
//         { url: 'https://www.youtube.com/watch?v=NwXpQsqgwwI', title: 'Video 2' },
//         { url: 'https://www.youtube.com/watch?v=TC7ADuq5jHs', title: 'Video 3' },
//         { url: 'https://www.youtube.com/watch?v=Ji7zMUwvgfM', title: 'Video 4' },
//         { url: 'https://www.youtube.com/watch?v=SjuUXYJS2Hs', title: 'Video 5' },
//     ],
//     images: [
//         {
//             url: 'https://res.cloudinary.com/drioug4df/image/upload/v1727949944/459308648_922517279897374_3737888819875963803_n_x0apml.jpg',
//         },
//         {
//             url: 'https://res.cloudinary.com/drioug4df/image/upload/v1727949944/458088060_916907960458306_2913117309935623470_n_k31udu.jpg',
//         },
//         {
//             url: 'https://res.cloudinary.com/drioug4df/image/upload/v1727949944/386550265_710226451126459_3412908169742757295_n_wpmohi.jpg',
//         },
//         {
//             url: 'https://res.cloudinary.com/drioug4df/image/upload/v1727949945/405201279_739047324911038_7266107287639205966_n_ddvict.jpg',
//         },
//         {
//             url: 'https://res.cloudinary.com/drioug4df/image/upload/v1727949945/368007736_678468484302256_5115575071258065358_n_jt0sv5.jpg',
//         },
//     ],
// };

const cx = classNames.bind(styles);

function Library() {
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [, setModalContentType] = useState(null);

    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const [videoData, imageData] = await Promise.all([getVideos(), getPublicImages()]);
                const updatedVideos = videoData.map((item) => ({
                    ...item,
                    url: extractVideoId(item.url),
                }));
                setVideos(updatedVideos);
                setImages(imageData);
                setActiveVideo(updatedVideos[0]?.url);
                setActiveImage(imageData[0]?.url);
            } catch (error) {
                console.error('Failed to load library data', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadLibrary();
    }, []);

    const getThumbnailUrl = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    const handleVideoClick = (videoLink) => {
        setActiveVideo(videoLink);
    };

    const handleImageClick = (imageSrc) => {
        setActiveImage(imageSrc);
        setModalContentType('image');
    };

    const videoSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
    };

    const imageSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <div className={cx('inner')}>
                    <Title subText="Thư viện" subText="Hình ảnh & Video" />
                    <div className={cx('library-wrapper')}>
                        <div className={cx('library-videos')}>
                            <div className={cx('library')}>
                                {activeVideo && (
                                    <div className={cx('main-video')}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${activeVideo}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Main Video"
                                        />
                                    </div>
                                )}
                                <Slider {...videoSettings}>
                                    {videos.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('thumbnail')}
                                            onClick={() => handleVideoClick(item.url)}
                                        >
                                            <img
                                                src={getThumbnailUrl(item.url)}
                                                alt={item.title}
                                                className={cx('thumbnail-image')}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        <div className={cx('library-images')}>
                            <div className={cx('library')}>
                                {activeImage && (
                                    <div className={cx('main-image')}>
                                        <img
                                            src={activeImage}
                                            alt="Main"
                                            className={cx('main-image-content')}
                                            onClick={() => {
                                                setModalContentType('image');
                                                setModalOpen(true);
                                            }}
                                        />
                                    </div>
                                )}
                                <Slider {...imageSettings}>
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={cx('thumbnail')}
                                            onClick={() => handleImageClick(image.url)}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={cx('thumbnail-image')}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <img src={activeImage} alt="Modal" className={cx('modal-image')} />
            </Modal>
        </div>
    );
}

export default Library;
