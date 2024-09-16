import React from 'react';
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardItem({ image, link, alt }) {
    return (
        <Link to={link} className={cx('card-item')}>
            <img className={cx('card-item-image')} src={image} alt={alt} />
        </Link>
    );
}

export default CardItem;
