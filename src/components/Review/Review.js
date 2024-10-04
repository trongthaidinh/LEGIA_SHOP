import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Review.module.scss';

const cx = classNames.bind(styles);

const Review = ({ image, name, content }) => {
    return (
        <div className={cx('review')}>
            <img src={image} alt={name} className={cx('avatar')} />
            <div className={cx('details')}>
                <h3 className={cx('name')}>{name}</h3>
                <p className={cx('content')}>{content}</p>
            </div>
        </div>
    );
};

Review.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Review;
