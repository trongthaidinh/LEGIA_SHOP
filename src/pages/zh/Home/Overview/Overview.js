import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import overviewGif from '~/assets/images/overview';
import legiaLogo from '~/assets/images/title.png';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} style={{ perspective: '1000px' }}>
                <div className={cx('content')}>
                    <div className={cx('logo-wrapper')}>
                        <img className={cx('logo')} src={legiaLogo} alt="logo legia nest" />
                    </div>
                    <h2 className={cx('title')}>乐家燕窝</h2>
                    <p className={cx('text')}>
                        专门经销<strong>新鲜燕窝、燕窝制品、炖燕窝</strong>，100%纯天然，承诺质量保证 – 绝不掺假。
                        为了给用户带来提升健康的优质产品，<strong>乐家燕窝</strong>始终将产品质量放在首位， 特别是
                        <strong>乐家燕窝</strong>保证100%保持天然燕窝的原味。
                    </p>
                    <Link to={`/介紹`}>
                        <Button
                            className={cx('button')}
                            rounded
                            primary
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        >
                            查看更多
                        </Button>
                    </Link>
                </div>

                <div
                    className={cx('sticker-container')}
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img className={cx('sticker')} src={overviewGif.image} alt="Animated Sticker" />
                </div>
            </div>
        </div>
    );
}

export default Overview;
