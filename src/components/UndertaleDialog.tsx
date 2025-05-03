
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface DialogProps {
  messages: string[];
  characterName?: string;
  onComplete?: () => void;
}

const UndertaleDialog = ({ messages, characterName = "PAPYRUS", onComplete }: DialogProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  
  const currentMessage = messages[currentMessageIndex] || "";
  
  // Эффект печатающегося текста
  useEffect(() => {
    if (charIndex < currentMessage.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentMessage[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50); // скорость печати
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [charIndex, currentMessage, isTyping]);
  
  const handleNext = () => {
    if (isTyping) {
      // Если текст ещё печатается, показать весь текст сразу
      setDisplayedText(currentMessage);
      setCharIndex(currentMessage.length);
      setIsTyping(false);
    } else if (currentMessageIndex < messages.length - 1) {
      // Перейти к следующему сообщению
      setCurrentMessageIndex(currentMessageIndex + 1);
      setDisplayedText("");
      setCharIndex(0);
      setIsTyping(true);
    } else if (onComplete) {
      // Завершение диалога
      onComplete();
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center">
      <div className="relative w-full max-w-3xl">
        {/* Диалоговое окно */}
        <div className="bg-black border-2 border-white p-4 rounded-md text-white font-mono relative">
          {/* Имя персонажа */}
          {characterName && (
            <div className="absolute -top-6 left-4 bg-black border-2 border-white px-3 py-1 rounded-md text-white font-bold">
              {characterName}
            </div>
          )}
          
          {/* Текст диалога */}
          <p className="text-xl leading-relaxed min-h-[4rem]">{displayedText}</p>
          
          {/* Индикатор "далее" */}
          {!isTyping && (
            <div className="absolute bottom-2 right-4 animate-bounce">▼</div>
          )}
        </div>
      </div>
      
      {/* Невидимая кнопка для продолжения диалога */}
      <button 
        onClick={handleNext}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Продолжить диалог"
      />
    </div>
  );
};

export default UndertaleDialog;
