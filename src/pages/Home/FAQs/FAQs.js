import React, { useState, useEffect, useRef } from 'react';
import Title from '~/components/Title';
import styles from './FAQs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ContactForm from '~/components/ContactForm';
import PushNotification from '~/components/PushNotification';

const cx = classNames.bind(styles);

const faqsData = [
    {
        title: 'Tư vấn Thương hiệu và Tiếp thị',
        questions: [
            {
                question:
                    'Tôi có thể yêu cầu dịch vụ thiết kế thương hiệu và tiếp thị bao gồm thiết kế Website, Logo, Ấn phẩm.v.v. không?',
                answer: 'Vâng bạn có thể hoàn toàn tìm đến chúng tôi. Xây dựng thương hiệu là một trong những thế mạnh của chúng tôi, nên hãy đừng ngần ngại mà liên hệ nhé.',
            },
            {
                question: 'Việc thiết kế Logo được thực hiện như nào?',
                answer: 'Đầu tiên chúng tôi sẽ lắng nghe hình dung và phương hướng của thương hiệu từ khách hàng. Sau đó chúng tôi sẽ suy nghĩ và thực hiện đề xuất một số ý tưởng Logo thể hiện được giá trị của thương hiệu. Từ đó, bằng việc trải qua quá trình thảo luận và sàng lọc thiết kế liên tục, chúng tôi sẽ chọn ra được thiết kế cuối cùng và tinh chỉnh những chi tiết nhỏ. Tuỳ theo yêu cầu của khách hàng, chúng tôi cũng có thể chuẩn bị tài liệu Quy tắc thương hiệu và Khái niệm thương hiệu.',
            },
            {
                question: 'Các bạn có thể vận hành quảng cáo Website không?',
                answer: 'Liên quan đến quy định về giấy phép kinh doanh, chúng tôi không thể hạch toán như chi phí quảng cáo nhưng chúng tôi có thể tư vấn quảng cáo cho Website.',
            },
        ],
    },
    {
        title: 'Thiết kế Website',
        questions: [
            {
                question: 'Các bạn có thể thiết kế Website đa ngôn ngữ không? Chi phí có thay đổi không?',
                answer: `Vâng, chúng tôi có thể thiết kế Website đa ngôn ngữ. Trường hợp này, tuỳ theo ngôn ngữ và độ dài và cỡ chữ sẽ khác nhau. nên có trường hợp layout sẽ lệch, chúng tôi cần điều chỉnh layout cho ngôn ngữ tương ứng nên chúng tôi sẽ tính thêm phí “Điều chỉnh đa ngôn ngữ.
                Ngoài ra, trường hợp Website dùng CMS như WordPress, Chúng tôi cần cài đặt phía backend để có các trường nhập cho các ngôn ngữ cũng như nút chuyển ngữ,… nên sẽ có phát sinh phí cho những phần cài đặt đó.`,
            },
        ],
    },
    {
        title: 'Thiết kế UI/UX',
        questions: [
            {
                question: 'Tôi có thể yêu cầu thiết kế ứng dụng điện thoại không?',
                answer: `Vâng, có thể ạ. Chúng tôi có thể đề xuất những thiết kế UI có thể đem lại trải nghiệm tốt cho người dùng.`,
            },
        ],
    },
    {
        title: 'Bảo trì Website',
        questions: [
            {
                question: 'Có những phí nào phải trả hàng tháng sau khi Website được hoàn thành không?',
                answer: `Ngoài chi phí Tên Miền và Server thì không có chi phí nào phải trả hàng tháng. Trường hợp phát sinh chỉnh sửa cho website, chúng tôi xin phép báo giá cho mỗi lần chỉnh sửa.`,
            },
            {
                question: 'Tôi có thể yêu cầu dịch vụ bào trì Server và Domain không?',
                answer: `Vâng, có thể ạ. Khi server có phát sinh vấn đề gì, chúng tôi sẽ nhanh chóng báo cáo cho khách hàng.`,
            },
        ],
    },
];

function FAQs() {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [expandedQuestions, setExpandedQuestions] = useState({ 0: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const wrapperRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            },
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(wrapperRef.current);
            }
        };
    }, []);

    const toggleTitle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
        if (expandedIndex === index) {
            setExpandedQuestions({});
        }
    };

    const toggleQuestion = (titleIndex, questionIndex) => {
        setExpandedQuestions((prev) => ({
            ...prev,
            [titleIndex]: prev[titleIndex] === questionIndex ? null : questionIndex,
        }));
    };

    const handleSuccess = (message) => {
        setNotification({ message, type: 'success' });
    };

    const handleError = (message) => {
        setNotification({ message, type: 'error' });
    };

    return (
        <div className={cx('wrapper')}>
            <motion.div
                className={cx('inner')}
                ref={wrapperRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Title subText="FAQs" />
                <div className={cx('section-grid')}>
                    <div className={cx('faqs')}>
                        {faqsData.map((faq, titleIndex) => (
                            <motion.div
                                key={titleIndex}
                                className={cx('faq-title')}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                                transition={{ duration: 0.5, delay: titleIndex * 0.1 }}
                            >
                                <div
                                    className={cx('faq-title-question', { active: expandedIndex === titleIndex })}
                                    onClick={() => toggleTitle(titleIndex)}
                                >
                                    <span>{faq.title}</span>
                                    <FontAwesomeIcon
                                        icon={expandedIndex === titleIndex ? faMinus : faPlus}
                                        className={cx('toggle-icon')}
                                    />
                                </div>
                                {expandedIndex === titleIndex && (
                                    <motion.div
                                        className={cx('faq-questions')}
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {faq.questions.map((item, questionIndex) => (
                                            <div
                                                key={questionIndex}
                                                className={cx('faq-item')}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.1, delay: questionIndex * 0.2 }}
                                            >
                                                <div
                                                    className={cx('faq-question', {
                                                        active: expandedQuestions[titleIndex] === questionIndex,
                                                    })}
                                                    onClick={() => toggleQuestion(titleIndex, questionIndex)}
                                                >
                                                    <span>{item.question}</span>
                                                    <FontAwesomeIcon
                                                        icon={
                                                            expandedQuestions[titleIndex] === questionIndex
                                                                ? faMinus
                                                                : faPlus
                                                        }
                                                        className={cx('toggle-icon')}
                                                    />
                                                </div>
                                                <motion.div
                                                    className={cx('faq-answer', {
                                                        active: expandedQuestions[titleIndex] === questionIndex,
                                                    })}
                                                    initial={{ maxHeight: 0, opacity: 0 }}
                                                    animate={{
                                                        maxHeight:
                                                            expandedQuestions[titleIndex] === questionIndex
                                                                ? '500px'
                                                                : 0,
                                                        opacity:
                                                            expandedQuestions[titleIndex] === questionIndex ? 1 : 0,
                                                    }}
                                                    exit={{ maxHeight: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <p>{item.answer}</p>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className={cx('formSection')}>
                        <ContactForm onSubmitSuccess={handleSuccess} onSubmitError={handleError} />
                    </div>
                </div>
                <PushNotification message={notification.message} type={notification.type} />
            </motion.div>
        </div>
    );
}

export default FAQs;
