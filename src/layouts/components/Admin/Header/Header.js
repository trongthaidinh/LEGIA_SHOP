import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChevronDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import styles from './Header.module.scss';
import { useAuth } from '~/hooks/useAuth';
import { getMessages } from '~/services/contactService';
import { getUserByEmail } from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

const Header = () => {
    const [isEmailDropdownVisible, setIsEmailDropdownVisible] = useState(false);
    const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const emailDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const { signout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const userData = await getUserByEmail(userEmail);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchNotifications = async () => {
            try {
                const messages = await getMessages(10);
                setNotifications(messages);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchUser();
        fetchNotifications();
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
            await signout();
        } catch (error) {
            console.error('Logout error:', error);
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
        { icon: faUser, text: 'Đổi mật khẩu', action: handleChangePassword },
        { icon: faSignOutAlt, text: 'Đăng xuất', action: handleLogout },
    ];

    if (!user) {
        return null;
    }

    return (
        <div className={styles.header}>
            <div className={styles.companyName}>CÔNG TY TNHH CÔNG NGHỆ TAKATECH</div>
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
                <span className={styles.userName}>{user.username}</span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.chevronIcon} />
                <Dropdown isVisible={isUserDropdownVisible} notifications={userDropdownItems} isUserDropdown={true} />
            </div>
        </div>
    );
};

export default Header;
