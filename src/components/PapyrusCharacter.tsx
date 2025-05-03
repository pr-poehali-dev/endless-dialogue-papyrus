
import { useState, useEffect } from 'react';

interface PapyrusCharacterProps {
  isAnimating?: boolean;
}

const PapyrusCharacter = ({ isAnimating = false }: PapyrusCharacterProps) => {
  const [frame, setFrame] = useState(0);
  
  // Анимация Папируса при печатании текста
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 3); // 3 кадра анимации
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setFrame(0); // Возвращаемся к стандартной позе
    }
  }, [isAnimating]);
  
  return (
    <div className="relative w-64 h-64">
      {/* Спрайт Папируса в стиле пиксель-арт */}
      <div className={`absolute inset-0 papyrus-sprite papyrus-frame-${frame} pixel-art`}>
        {/* SVG изображение Папируса в пиксельном стиле */}
        <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Тело скелета */}
          <rect x="100" y="80" width="40" height="100" fill="white" className="papyrus-body" />
          
          {/* Красный шарф, развевающийся по-разному в зависимости от кадра */}
          <rect 
            x={100 + frame * 5} 
            y={70 - frame * 2} 
            width={80 + frame * 10} 
            height="20" 
            fill="#FF0000" 
            className="papyrus-scarf"
          />
          
          {/* Голова */}
          <rect x="90" y="30" width="60" height="50" fill="white" className="papyrus-head" />
          
          {/* Глаза */}
          <circle cx="110" cy="50" r={5 + frame} fill="black" className="papyrus-eye" />
          <circle cx="130" cy="50" r={5 + frame} fill="black" className="papyrus-eye" />
          
          {/* Рот, который меняется при разговоре */}
          {frame === 0 && (
            <rect x="105" y="65" width="30" height="3" fill="black" className="papyrus-mouth" />
          )}
          {frame === 1 && (
            <rect x="105" y="65" width="30" height="6" fill="black" className="papyrus-mouth" />
          )}
          {frame === 2 && (
            <rect x="100" y="65" width="40" height="4" fill="black" className="papyrus-mouth-wide" />
          )}
          
          {/* Руки, которые двигаются при анимации */}
          <rect 
            x={70 - frame * 10} 
            y={100 + frame * 5} 
            width="30" 
            height="10" 
            fill="white" 
            className="papyrus-left-arm"
            transform={`rotate(${-10 - frame * 15} 70 100)`}
          />
          <rect 
            x={140 + frame * 10} 
            y={100 + frame * 5} 
            width="30" 
            height="10" 
            fill="white" 
            className="papyrus-right-arm"
            transform={`rotate(${10 + frame * 15} 140 100)`}
          />
          
          {/* Ноги */}
          <rect x="100" y="180" width="15" height="30" fill="white" className="papyrus-left-leg" />
          <rect x="125" y="180" width="15" height="30" fill="white" className="papyrus-right-leg" />
          
          {/* Броня на груди */}
          <rect x="100" y="80" width="40" height="40" fill="#FF8C00" className="papyrus-chest-plate" />
          <rect x="105" y="85" width="30" height="30" fill="#FF4500" className="papyrus-chest-detail" />
          
          {/* Перчатки */}
          <circle cx={70 - frame * 10} cy={100 + frame * 5 + 5} r="8" fill="red" className="papyrus-glove" />
          <circle cx={170 + frame * 10} cy={100 + frame * 5 + 5} r="8" fill="red" className="papyrus-glove" />
          
          {/* Сапоги */}
          <rect x="95" y="210" width="25" height="10" fill="red" className="papyrus-boot" />
          <rect x="120" y="210" width="25" height="10" fill="red" className="papyrus-boot" />
        </svg>
      </div>
    </div>
  );
};

export default PapyrusCharacter;
