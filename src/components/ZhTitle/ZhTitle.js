import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ZhTitle.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ZhTitle({ text, subText, showSeeAll = false, slug, categoryId }) {
    return (
        <div className={cx('header')}>
            <div className={cx('text-wrapper')}>
                {/* <span className={cx('title')}>{text}</span> */}
                {subText && <h1 className={cx('sub-title')}>{subText}</h1>}
            </div>
            {showSeeAll && (
                <Link
                    to={{
                        pathname: slug,
                        state: { categoryId },
                    }}
                >
                    <button className={cx('see-all')}>
                        查看更多 <FontAwesomeIcon icon={faChevronRight} className={cx('see-all-icon')} />
                    </button>
                </Link>
            )}
            {/* <div className={cx('line')} /> */}
        </div>
    );
}

ZhTitle.propTypes = {
    text: PropTypes.string,
    subText: PropTypes.string,
    showSeeAll: PropTypes.bool,
    slug: PropTypes.string,
    categoryId: PropTypes.string,
};

export default ZhTitle;
