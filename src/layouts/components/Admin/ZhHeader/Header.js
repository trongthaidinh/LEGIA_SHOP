import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChevronDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import styles from './Header.module.scss';
import { useAuth } from '~/hooks/useAuth';
import { getMessages } from '~/services/contactService';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import LoadingScreen from 'components/LoadingScreen';

const Header = () => {
    const [isEmailDropdownVisible, setIsEmailDropdownVisible] = useState(false);
    const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const emailDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const { signoutZH } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                setUser(userEmail);
            } catch (error) {
                console.error('获取用户信息失败:', error);
            }
        };

        const fetchNotifications = async () => {
            try {
                const messages = await getMessages(10);
                setNotifications(messages);
            } catch (error) {
                console.error('获取通知失败:', error);
            }
        };

        const loadData = async () => {
            await Promise.all([fetchUser(), fetchNotifications()]);
            setLoading(false);
        };

        loadData();
    }, []);

    const handleClickOutside = (event) => {
        if (
            emailDropdownRef.current &&
            !emailDropdownRef.current.contains(event.target) &&
            userDropdownRef.current &&
            !userDropdownRef.current.contains(event.target)
        ) {
            setIsEmailDropdownVisible(false);
            setIsUserDropdownVisible(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signoutZH();
        } catch (error) {
            console.error('退出登录失败:', error);
        }
    };

    const handleChangePassword = () => {
        navigate(routes.changePassword);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const userDropdownItems = [
        { icon: faUser, text: '修改密码', action: handleChangePassword },
        { icon: faSignOutAlt, text: '退出登录', action: handleLogout },
    ];

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <div className={styles.header}>
            <div className={styles.companyName}>乐嘉燕窝</div>
            <div
                className={styles.iconWrapper}
                ref={emailDropdownRef}
                onClick={() => {
                    setIsEmailDropdownVisible(!isEmailDropdownVisible);
                    setIsUserDropdownVisible(false);
                }}
            >
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <Dropdown isVisible={isEmailDropdownVisible} notifications={notifications} isUserDropdown={false} />
            </div>
            <div
                className={styles.userWrapper}
                ref={userDropdownRef}
                onClick={() => {
                    setIsUserDropdownVisible(!isUserDropdownVisible);
                    setIsEmailDropdownVisible(false);
                }}
            >
                <span className={styles.userName}>{user}</span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.chevronIcon} />
                <Dropdown isVisible={isUserDropdownVisible} notifications={userDropdownItems} isUserDropdown={true} />
            </div>
        </div>
    );
};

export default Header;
