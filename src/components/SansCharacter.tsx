
import { useState, useEffect } from 'react';

interface SansCharacterProps {
  isAnimating?: boolean;
}

const SansCharacter = ({ isAnimating = false }: SansCharacterProps) => {
  const [frame, setFrame] = useState(0);
  
  // Анимация моргания и движения Санса
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 4); // 4 кадра анимации
      }, 400);
      
      return () => clearInterval(interval);
    } else {
      // Статичный кадр с мигающим глазом каждые 5 секунд
      const interval = setInterval(() => {
        setFrame(prev => {
          if (prev === 0) return 3; // Моргнуть
          return 0; // Вернуться к стандартной позе
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAnimating]);
  
  return (
    <div className="relative w-64 h-64">
      <div className={`absolute inset-0 sans-sprite sans-frame-${frame} pixel-art`}>
        {/* SVG изображение Санса в пиксельном стиле */}
        <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Тело (синяя куртка) */}
          <rect x="90" y="100" width="60" height="80" fill="#006FB9" className="sans-jacket" />
          
          {/* Шорты */}
          <rect x="90" y="180" width="60" height="30" fill="#000000" className="sans-shorts" />
          
          {/* Тапки */}
          <rect x="90" y="210" width="20" height="10" fill="#FFF5E6" className="sans-slipper" />
          <rect x="130" y="210" width="20" height="10" fill="#FFF5E6" className="sans-slipper" />
          
          {/* Голова (круглый череп) */}
          <circle cx="120" cy="70" r="40" fill="#FFF5E6" className="sans-head" />
          
          {/* Улыбка, меняется при разговоре */}
          {frame === 0 && (
            <path 
              d="M100 80 Q120 90 140 80" 
              stroke="black" 
              strokeWidth="3" 
              fill="none" 
              className="sans-smile"
            />
          )}
          {frame === 1 && (
            <path 
              d="M100 80 Q120 95 140 80" 
              stroke="black" 
              strokeWidth="4" 
              fill="none" 
              className="sans-smile-wide"
            />
          )}
          {frame === 2 && (
            <path 
              d="M100 80 Q120 90 140 80" 
              stroke="black" 
              strokeWidth="3" 
              fill="none" 
              className="sans-smile"
            />
          )}
          {frame === 3 && (
            <path 
              d="M100 80 Q120 85 140 80" 
              stroke="black" 
              strokeWidth="2" 
              fill="none" 
              className="sans-smile-slight"
            />
          )}
          
          {/* Глаза */}
          {/* Левый глаз (обычно просто черный круг) */}
          <circle 
            cx="105" 
            cy="60" 
            r={frame === 3 ? 0 : 5} 
            fill="black" 
            className="sans-eye-left"
          />
          
          {/* Правый глаз (может светиться голубым) */}
          {frame !== 3 ? (
            <circle 
              cx="135" 
              cy="60" 
              r="5" 
              fill={isAnimating && frame === 1 ? "#00FFFF" : "black"} 
              className={`sans-eye-right ${isAnimating && frame === 1 ? 'sans-eye-glow' : ''}`}
            />
          ) : (
            <line 
              x1="130" 
              y1="60" 
              x2="140" 
              y2="60" 
              stroke="black" 
              strokeWidth="2" 
              className="sans-eye-closed"
            />
          )}
          
          {/* Руки */}
          <rect 
            x="70" 
            y={120 + frame * 2} 
            width="20" 
            height="5" 
            fill="#FFF5E6" 
            className="sans-hand-left"
          />
          <rect 
            x="150" 
            y={120 + ((frame + 2) % 4) * 2} 
            width="20" 
            height="5" 
            fill="#FFF5E6" 
            className="sans-hand-right"
          />
          
          {/* Карманы на куртке */}
          <rect x="90" y="140" width="15" height="10" fill="#005A94" className="sans-pocket" />
          <rect x="135" y="140" width="15" height="10" fill="#005A94" className="sans-pocket" />
          
          {/* Опционально: бутылка кетчупа в руке */}
          {frame === 1 && (
            <>
              <rect x="170" y="120" width="10" height="20" fill="#FF0000" className="sans-ketchup" />
              <rect x="168" y="115" width="14" height="5" fill="#800000" className="sans-ketchup-cap" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default SansCharacter;
