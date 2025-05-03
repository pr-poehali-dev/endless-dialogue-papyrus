
import { useState, useEffect } from 'react';

interface UndyneCharacterProps {
  isAnimating?: boolean;
}

const UndyneCharacter = ({ isAnimating = false }: UndyneCharacterProps) => {
  const [frame, setFrame] = useState(0);
  
  // Анимация Андайн при разговоре
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 4); // 4 кадра анимации
      }, 200); // Быстрее, чем у других - она энергичная!
      
      return () => clearInterval(interval);
    } else {
      setFrame(0); // Возвращаемся к стандартной позе
    }
  }, [isAnimating]);
  
  return (
    <div className="relative w-64 h-70">
      <div className={`absolute inset-0 undyne-sprite undyne-frame-${frame} pixel-art`}>
        {/* SVG изображение Андайн в пиксельном стиле */}
        <svg className="w-full h-full" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Тело в броне */}
          <rect x="90" y="110" width="60" height="100" fill="#107C91" className="undyne-armor" />
          
          {/* Плечи брони */}
          <path d="M90 120 L70 140 L85 160 L90 150 Z" fill="#107C91" className="undyne-armor-shoulder" />
          <path d="M150 120 L170 140 L155 160 L150 150 Z" fill="#107C91" className="undyne-armor-shoulder" />
          
          {/* Голова (синяя кожа) */}
          <circle cx="120" cy="70" r="40" fill="#107C91" className="undyne-head" />
          
          {/* Красные волосы - разные положения в зависимости от кадра */}
          <path 
            d={`M120 30 
                L${130 + frame * 5} ${10 - frame * 3} 
                L${140 + frame * 3} ${20 - frame * 2} 
                L${150 + frame * 2} ${40 - frame * 1}
                L${145 - frame * 3} ${60 + frame * 2}
                L120 50 Z`} 
            fill="#FF0000" 
            className="undyne-hair"
          />
          
          {/* Глаз (желтый, меняющийся) */}
          <circle 
            cx="120" 
            cy={62 + frame} 
            r={9 - frame} 
            fill="#FFFF00" 
            className="undyne-eye"
          />
          <circle 
            cx="120" 
            cy={62 + frame} 
            r={4 - frame/2} 
            fill="black" 
            className="undyne-pupil"
          />
          
          {/* Повязка на глазу */}
          <rect 
            x="100" 
            y="55" 
            width="40" 
            height="15" 
            fill="#000000" 
            className="undyne-eyepatch"
          />
          
          {/* Зубы (острые) - меняются при разговоре */}
          <path 
            d={`M${105 - frame * 2} ${85 + frame} 
                L${110 - frame} ${95 - frame} 
                L${115 + frame} ${85 + frame * 2}
                L${125 - frame} ${95 - frame}
                L${130 + frame * 2} ${85 + frame}
                L${135 - frame} ${95 - frame}
                Z`} 
            fill="#FFFFFF" 
            className="undyne-teeth"
          />
          
          {/* Руки в перчатках */}
          <rect 
            x={60 - frame * 10} 
            y={140 + frame * 5} 
            width="30" 
            height="15" 
            fill="#FFFFFF" 
            className="undyne-glove-left"
            transform={`rotate(${-10 - frame * 10} 70 140)`}
          />
          <rect 
            x={150 + frame * 10} 
            y={140 + frame * 5} 
            width="30" 
            height="15" 
            fill="#FFFFFF" 
            className="undyne-glove-right"
            transform={`rotate(${10 + frame * 10} 150 140)`}
          />
          
          {/* Копьё (появляется в некоторых кадрах) */}
          {(frame === 2 || frame === 3) && (
            <>
              <rect 
                x={35 - frame * 10} 
                y={120 + frame * 5} 
                width="50" 
                height="5" 
                fill="#00FFFF" 
                className="undyne-spear"
                transform={`rotate(${-20 - frame * 10} 60 130)`}
              />
              <path 
                d={`M${15 - frame * 10} ${110 + frame * 5} 
                    L${25 - frame * 10} ${120 + frame * 5}
                    L${35 - frame * 10} ${110 + frame * 5}
                    Z`} 
                fill="#00FFFF" 
                className="undyne-spearhead"
                transform={`rotate(${-20 - frame * 10} 60 130)`}
              />
            </>
          )}
          
          {/* Ноги */}
          <rect x="90" y="210" width="20" height="40" fill="#000000" className="undyne-leg" />
          <rect x="130" y="210" width="20" height="40" fill="#000000" className="undyne-leg" />
          
          {/* Сапоги */}
          <rect x="85" y="250" width="30" height="10" fill="#FF0000" className="undyne-boot" />
          <rect x="125" y="250" width="30" height="10" fill="#FF0000" className="undyne-boot" />
        </svg>
      </div>
    </div>
  );
};

export default UndyneCharacter;
