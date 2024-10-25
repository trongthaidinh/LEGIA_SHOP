import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Product({ image, name, price, link, original_price }) {
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <Link to={link}>
            <div className={cx('product-item')}>
                <div className={cx('product-item-image-wrapper')}>
                    <img className={cx('product-item-image')} src={image} alt={name} />
                </div>
                <div className={cx('product-item-details')}>
                    <h2 className={cx('product-item-name')}>{name}</h2>
                    <div className={cx('product-item-price-wrapper')}>
                        <p className={cx('product-item-price')}>
                            <span className={cx('product-item-currency')}>
                                {Number(formatPrice(price)).toLocaleString()}đ
                            </span>
                            {original_price > price && (
                                <span className={cx('product-item-original-price')}>
                                    <span className={cx('product-item-currency')}>
                                        {Number(formatPrice(original_price)).toLocaleString()}đ
                                    </span>
                                </span>
                            )}
                        </p>
                        <span>
                            <FontAwesomeIcon icon={faPlus} className={cx('product-item-icon')} />
                            <span className={cx('product-item-details-tag')}>Xem chi tiết</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

Product.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Product;
