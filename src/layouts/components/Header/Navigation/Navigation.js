import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faChevronRight,
    faChevronDown,
    faShoppingCart,
    faUser,
    faPhone,
    faPhoneVolume,
    // faHome,
    // faInfoCircle,
    // faBox,
    // faLayerGroup,
    // faProjectDiagram,
    // faNewspaper,
    // faUsers,
    // faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

// const iconsData = [
//     { position: 1, icon: faInfoCircle },
//     { position: 2, icon: faBox },
//     { position: 3, icon: faLayerGroup },
//     { position: 4, icon: faProjectDiagram },
//     { position: 5, icon: faNewspaper },
//     { position: 6, icon: faUsers },
//     { position: 7, icon: faEnvelope },
// ];

const cx = classNames.bind(styles);

function Navigation({ isFixed }) {
    const [navigationLinks, setNavigationLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const [openSubSubMenus, setOpenSubSubMenus] = useState({});

    const mockNavigationLinks = [
        {
            id: 1,
            title: 'Giới Thiệu',
            slug: 'gioi-thieu',
            position: 1,
            children: [
                {
                    id: 11,
                    title: 'Về Chúng Tôi',
                    slug: 've-chung-toi',
                    position: 1,
                    children: [],
                },
                {
                    id: 12,
                    title: 'Tầm Nhìn & Sứ Mệnh',
                    slug: 'tam-nhin-su-menh',
                    position: 1,
                    children: [],
                },
            ],
        },
        {
            id: 2,
            title: 'Sản Phẩm',
            slug: 'san-pham',
            position: 2,
            children: [
                {
                    id: 21,
                    title: 'Yến Chưng',
                    slug: 'yen-chung',
                    position: 1,
                    children: [
                        // {
                        //     id: 211,
                        //     title: 'Chi Tiết Sản Phẩm A1',
                        //     slug: 'chi-tiet-san-pham-a1',
                        //     position: 1,
                        // },
                        // {
                        //     id: 212,
                        //     title: 'Chi Tiết Sản Phẩm A2',
                        //     slug: 'chi-tiet-san-pham-a2',
                        //     position: 2,
                        // },
                    ],
                },
                {
                    id: 22,
                    title: 'Yến Tổ',
                    slug: 'san-pham-b',
                    position: 2,
                    children: [],
                },
                {
                    id: 23,
                    title: 'Set Quà Tặng',
                    slug: 'set-qua-tang',
                    position: 3,
                    children: [],
                },
            ],
        },
        {
            id: 3,
            title: 'Tin Tức',
            slug: 'tin-tuc',
            position: 3,
            children: [],
        },
        {
            id: 4,
            title: 'Chính sách',
            slug: 'chinh-sach',
            position: 4,
            children: [],
        },
        {
            id: 6,
            title: 'Hướng dẫn mua hàng',
            slug: 'huong-dan-mua-hang',
            position: 5,
            children: [],
        },
        {
            id: 7,
            title: 'Liên Hệ',
            slug: 'lien-he',
            position: 5,
            children: [],
        },
    ];

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                // Thay thế API call bằng dữ liệu mẫu
                const links = mockNavigationLinks;
                const sortedLinks = links.sort((a, b) => a.position - b.position);
                setNavigationLinks(sortedLinks);
            } catch (error) {
                setError(error);
                console.error('Error fetching navigation links:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavigationLinks();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const toggleSubMenu = (id, fromChild = false) => {
        if (!fromChild) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };

    const toggleSubSubMenu = (parentId, childId) => {
        setOpenSubSubMenus((prevState) => ({
            ...prevState,
            [`${parentId}-${childId}`]: !prevState[`${parentId}-${childId}`],
        }));
    };

    const handleMouseEnter = (id) => {
        if (window.innerWidth >= 1280) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        }
    };

    const handleMouseLeave = (id) => {
        if (window.innerWidth >= 1280) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    const handleMouseEnterChild = (parentId, childId) => {
        if (window.innerWidth >= 1280) {
            setOpenSubSubMenus((prevState) => ({
                ...prevState,
                [`${parentId}-${childId}`]: true,
            }));
        }
    };

    const handleMouseLeaveChild = (parentId, childId) => {
        if (window.innerWidth >= 1280) {
            setOpenSubSubMenus((prevState) => ({
                ...prevState,
                [`${parentId}-${childId}`]: false,
            }));
        }
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('wrapper', { fixed: isFixed })}>
            <div className={cx('inner')}>
                <div className={cx('mobile-menu-icon')} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <Link to="/">
                    <img src={images.logo} alt="Logo" className={cx('logo')} />
                </Link>
                <div className={cx('navigation-wrapper')}>
                    <div className={cx('navigation-utilities')}>
                        <div className={cx('left-section')}>
                            <Search />
                        </div>
                        <div className={cx('right-section')}>
                            <div className={cx('hotline')}>
                                <FontAwesomeIcon icon={faPhoneVolume} className={cx('icon')} />
                                <div className={cx('text')}>
                                    <span>Hotline</span>
                                    <span className={cx('phone-number')}>0901234567</span>
                                </div>
                            </div>
                            <div className={cx('account')}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                                <div className={cx('text')}>
                                    <span>Tài khoản</span>
                                    <span className={cx('username')}>Nguyễn Văn A</span>
                                </div>
                            </div>
                            <div className={cx('cart')}>
                                <FontAwesomeIcon icon={faShoppingCart} className={cx('icon')} />
                                <Link to="/gio-hang" className={cx('cart-link')}>
                                    <div className={cx('text')}>
                                        <span>Giỏ hàng</span>
                                        <span className={cx('cart-items')}>02 sản phẩm</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <ul className={cx('navigation-links', { open: isMenuOpen })}>
                        <li onClick={handleLinkClick}>
                            <div className={cx('menu-item')}>
                                <NavLink end to="/" className={({ isActive }) => cx({ 'active-link': isActive })}>
                                    <div className={cx('item-icon')}>Trang Chủ</div>
                                </NavLink>
                            </div>
                        </li>
                        {navigationLinks.map((link) => {
                            // const iconData = iconsData.find((icon) => icon.position === link.position);
                            const sortedChilds = link.children.sort((a, b) => a.position - b.position);
                            return (
                                <li
                                    key={link.id}
                                    className={cx({ 'has-children': link.children.length > 0 })}
                                    onMouseEnter={() => handleMouseEnter(link.id)} // Hover event
                                    onMouseLeave={() => handleMouseLeave(link.id)} // Leave event
                                    onClick={() => toggleSubMenu(link.id)} // Click event for mobile
                                >
                                    <div className={cx('menu-item')}>
                                        <NavLink
                                            end
                                            to={`/${link.slug}`}
                                            className={({ isActive }) => cx({ 'active-link': isActive })}
                                            onClick={handleLinkClick}
                                        >
                                            <div className={cx('item-icon')}>
                                                {/* {iconData && (
                                                <FontAwesomeIcon icon={iconData.icon} className={cx('nav-icon')} />
                                            )} */}
                                                {link.title}
                                            </div>
                                        </NavLink>
                                        {link.children.length > 0 && (
                                            <FontAwesomeIcon
                                                icon={openSubMenus[link.id] ? faChevronDown : faChevronRight}
                                                className={cx('submenu-icon')}
                                            />
                                        )}
                                    </div>
                                    {sortedChilds.length > 0 && (
                                        <ul className={cx('dropdown', { open: openSubMenus[link.id] })}>
                                            {sortedChilds.map((childLink) => {
                                                const sortedSubChilds = (childLink.children || []).sort(
                                                    (a, b) => a.position - b.position,
                                                );
                                                return (
                                                    <li
                                                        key={childLink.id}
                                                        className={cx({
                                                            'has-sub-children': sortedSubChilds.length > 0,
                                                        })}
                                                        onMouseEnter={() =>
                                                            handleMouseEnterChild(link.id, childLink.id)
                                                        }
                                                        onMouseLeave={() =>
                                                            handleMouseLeaveChild(link.id, childLink.id)
                                                        }
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleSubSubMenu(link.id, childLink.id);
                                                        }}
                                                    >
                                                        <div className={cx('sub-link-wrapper')}>
                                                            <NavLink
                                                                // to={`/${link.slug}/${childLink.slug}`}
                                                                to={`/${link.slug}`}
                                                                className={({ isActive }) =>
                                                                    cx({ 'active-lin-sub': isActive })
                                                                }
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleLinkClick();
                                                                }}
                                                            >
                                                                {childLink.title}
                                                            </NavLink>
                                                            {sortedSubChilds.length > 0 && (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        openSubSubMenus[`${link.id}-${childLink.id}`]
                                                                            ? faChevronDown
                                                                            : faChevronRight
                                                                    }
                                                                    className={cx('submenu-icon')}
                                                                />
                                                            )}
                                                        </div>
                                                        {sortedSubChilds.length > 0 && (
                                                            <ul
                                                                className={cx('dropdown-second-level', {
                                                                    open: openSubSubMenus[`${link.id}-${childLink.id}`],
                                                                })}
                                                            >
                                                                {sortedSubChilds.map((subChildLink) => {
                                                                    return (
                                                                        <li key={subChildLink.id}>
                                                                            <NavLink
                                                                                to={`/${link.slug}/${childLink.slug}/${subChildLink.slug}`}
                                                                                className={({ isActive }) =>
                                                                                    cx({ 'active-link': isActive })
                                                                                }
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleLinkClick();
                                                                                }}
                                                                            >
                                                                                {subChildLink.title}
                                                                            </NavLink>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
