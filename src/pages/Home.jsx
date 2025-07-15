import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import worldlanguage from '../assets/worldlanguage.png';
import TeacherCard from '../components/TeacherCard';
import lessonImg from '../assets/lesson.png';
import groupImg from '../assets/group.png';
import materialImg from '../assets/materials.png';
import background from '../assets/background.png';
import InfoCard from '../components/InfoCard';
import OfferCard from '../components/OfferCard';
import SuggestionModal from '../components/SuggestionModal';

function Home() {
    const navigate = useNavigate();
    const languages = ["English", "Spanish", "Japanese", "Korean", "French", "German"];
    const [langIndex, setLangIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await fetch('https://edu-platform-3qfk.onrender.com/api/teachers');
                if (!response.ok) throw new Error();
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                toast.error('Lỗi tải dữ liệu giáo viên');
            }
        }
        fetchTeachers();
    }, []);

    useEffect(() => {
        async function fetchSuggestion() {
            try {
                const response = await fetch('https://edu-platform-3qfk.onrender.com/api/suggestion');
                if (!response.ok) throw new Error();
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                toast.error('Lỗi tải dữ liệu suggestion');
            }
        }
        fetchSuggestion();
    }, []);

    useEffect(() => {
        const fullText = languages[langIndex].toUpperCase();

        if (charIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(fullText.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 150);

            return () => clearTimeout(timeout);
        } else {
            const pause = setTimeout(() => {
                const nextIndex = (langIndex + 1) % languages.length;
                setLangIndex(nextIndex);
                setCharIndex(0);
                setDisplayedText('');
            }, 2000);

            return () => clearTimeout(pause);
        }
    }, [charIndex, langIndex]);

    return (
        <>
            <section className='intro'>
                <div className="intro-content">
                    <h1>Become fluent in <span className="highlight">{displayedText}</span></h1>
                    <p>Chỉ cần một nơi để bắt đầu – nơi mọi nội dung học tập, luyện kỹ năng và gợi ý đều được cá nhân hoá cho bạn.</p>
                </div>
                <img src={worldlanguage} alt="" />
            </section>
            <section className="offers">
                <h2 className="offers-title">Khám phá những gì chúng tôi mang lại</h2>
                <div className="offer-items">
                    <OfferCard
                        image={lessonImg}
                        title="Đề xuất sản phẩm"
                        description="Chúng tôi đề xuất những nội dung phù hợp nhất với phong cách học tập và mục tiêu của bạn."
                        linkText="Xem đề xuất cá nhân hóa"
                        onClick={() => setShowSuggestionModal(true)} 
                    />

                    <OfferCard
                        image={groupImg}
                        title="Khóa học trực tuyến"
                        description="Trải nghiệm khóa học trực tuyến sinh động, vui vẻ cùng giáo viên giàu kinh nghiệm khắp thế giới."
                        linkText="Xem tất cả khóa học"
                        onClick={() => navigate('/products')}
                    />
                    <OfferCard
                        image={materialImg}
                        title="Tài liệu học"
                        description="Khám phá hàng ngàn giáo trình, sách điện tử và tài liệu luyện thi giúp bạn học tập hiệu quả hơn mỗi ngày."
                        linkText="Khám phá tài liệu"
                        onClick={() => navigate('/products')}
                    />
                </div>
            </section>
            {showSuggestionModal && (
                <SuggestionModal
                    suggestions={suggestions}
                    onClose={() => setShowSuggestionModal(false)}
                />
            )}

            <section className="teachers">
                <h2 className="teachers-title">Giáo viên nổi bật</h2>
                <div className="teacher-row scroll-left">
                    {[...teachers, ...teachers].map((teacher, index) => (
                        <TeacherCard key={`${teacher.id || index}`} teacher={teacher} />
                    ))}
                </div>
                <div className="teacher-row scroll-right">
                    {[...teachers, ...teachers].map((teacher, index) => (
                        <TeacherCard key={`${teacher.id || index}`} teacher={teacher} />
                    ))}
                </div>
            </section>

            <section className="information">
                <img src={background} alt="" />
                <div className="info-numbers">
                    <InfoCard
                        icon="fa-solid fa-house"
                        title="12+ triệu"
                        detail="Khóa học"
                    />
                    <InfoCard
                        icon="fa-solid fa-folder-open"
                        title="3+ triệu"
                        detail="Tài liệu"
                    />
                    <InfoCard
                        icon="fa-solid fa-users"
                        title="2+ triệu"
                        detail="Người dùng"
                    />
                    <p className="info-tagline">Chúng tôi đồng hành cùng hàng triệu người học trên hành trình chinh phục tri thức.</p>
                </div>
            </section>
        </>
    )
}

export default Home
