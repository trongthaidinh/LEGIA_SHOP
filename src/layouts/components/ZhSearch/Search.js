import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { searchZhItems } from '~/services/searchService';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Search() {
    const [query, setQuery] = useState('');
    const [, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim()) {
            try {
                const searchResults = await searchZhItems(query);
                setResults(searchResults);
                navigate(`/zh/搜索?q=${query.trim()}`);
            } catch (error) {
                console.error('搜索结果获取失败:', error);
                navigate(`/zh/搜索?q=${query.trim()}`);
            }
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-container')}>
                <input
                    type="text"
                    placeholder="搜索..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={cx('search-input')}
                    autoFocus
                />
                <button className={cx('search-button')} onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                </button>
            </div>
        </div>
    );
}

export default Search;
