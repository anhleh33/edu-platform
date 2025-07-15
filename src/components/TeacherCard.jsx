// src/components/TeacherCard.jsx
import React, { useState } from 'react';

function TeacherCard({ teacher }) {
    const [isHovered, setIsHovered] = useState(false);
    const [color, setColor] = useState('');

    function getRandomColor() {
        const colors = [
            "#3B82F6", "#10B981", "#F97316",
            "#8B5CF6", "#06B6D4", "#F43F5E",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handleMouseEnter = () => {
        setColor(getRandomColor());
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="teacher-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                boxShadow: isHovered ? `4px 4px 0 ${color}` : '4px 4px 0 transparent',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <img src={teacher.avatar} alt={teacher.name} />
            <div className="teacher-info">
                <h4>{teacher.name}</h4>
                <p>{teacher.language}</p>
            </div>
        </div>
    );
}

export default TeacherCard;
