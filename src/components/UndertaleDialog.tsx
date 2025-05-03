
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface DialogProps {
  initialMessages: string[];
  characterName?: string;
}

// Ответы Папируса на разные фразы пользователя
const papyrusResponses: Record<string, string[]> = {
  default: [
    "ХММ, ИНТЕРЕСНО! РАССКАЖИ МНЕ БОЛЬШЕ, ЧЕЛОВЕК!",
    "Я НЕ СОВСЕМ ПОНИМАЮ, НО ЭТО ЗВУЧИТ КРУТО!",
    "NYEH HEH HEH! ТЫ ГОВОРИШЬ КАК НАСТОЯЩИЙ ДРУГ ПАПИРУСА!"
  ],
  привет: [
    "ПРИВЕТ, ЧЕЛОВЕК! РРРАД ТЕБЯ ВИДЕТЬ!",
    "NYEH HEH HEH! ПРИВЕТСТВУЮ ТЕБЯ В МОЁМ ДИАЛОГЕ!"
  ],
  спагетти: [
    "А! ТЫ ЛЮБИШЬ СПАГЕТТИ? Я МАСТЕР СПАГЕТТИ!",
    "МОИ СПАГЕТТИ - САМЫЕ ЛУЧШИЕ В ПОДЗЕМЕЛЬЕ! ХОЧЕШЬ ПОПРОБОВАТЬ?"
  ],
  санс: [
    "МОЙ ЛЕНИВЫЙ БРАТЕЦ САНС? ОН ПОСТОЯННО СПИТ НА РАБОТЕ!",
    "САНС ВСЕГДА РАССКАЗЫВАЕТ УЖАСНЫЕ КАЛАМБУРЫ! ЭТО ТАК РАЗДРАЖАЕТ!"
  ],
  андайн: [
    "АНДАЙН - МОЙ ТРЕНЕР! ОНА ОЧЕНЬ СИЛЬНАЯ И КРУТАЯ!",
    "ОДНАЖДЫ Я БУДУ ТАКИМ ЖЕ КРУТЫМ КАК АНДАЙН! NYEH HEH HEH!"
  ]
};

const UndertaleDialog = ({ initialMessages, characterName = "PAPYRUS" }: DialogProps) => {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
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
    } else {
      // Показать поле ввода для пользователя
      setShowInput(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };
  
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Добавляем ответ пользователя в диалог
    const updatedMessages = [...messages, `ТЫ: ${userInput}`];
    
    // Определяем ответ Папируса на сообщение пользователя
    let responseKey = 'default';
    
    // Проверяем ключевые слова в сообщении пользователя
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('привет')) responseKey = 'привет';
    if (lowerInput.includes('спагетти')) responseKey = 'спагетти';
    if (lowerInput.includes('санс')) responseKey = 'санс';
    if (lowerInput.includes('андайн')) responseKey = 'андайн';
    
    // Выбираем случайный ответ из соответствующей категории
    const possibleResponses = papyrusResponses[responseKey];
    const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    // Добавляем ответ Папируса
    updatedMessages.push(randomResponse);
    
    // Обновляем состояние диалога
    setMessages(updatedMessages);
    setCurrentMessageIndex(updatedMessages.length - 1);
    setDisplayedText("");
    setCharIndex(0);
    setIsTyping(true);
    setUserInput("");
    setShowInput(false);
  };
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end p-4 bg-black">
      <div className="w-full max-w-3xl mb-16">
        {/* Диалоговое окно */}
        <div className="bg-black border-2 border-white p-6 rounded-md text-white relative undertale-dialog">
          {/* Имя персонажа */}
          {characterName && !showInput && (
            <div className="absolute -top-6 left-4 bg-black border-2 border-white px-3 py-1 rounded-md text-white font-bold pixel-text text-sm">
              {characterName}
            </div>
          )}
          
          {/* Текст диалога */}
          <p className="pixel-text text-base leading-relaxed min-h-[6rem]">
            {displayedText}
          </p>
          
          {/* Индикатор "далее" */}
          {!isTyping && !showInput && (
            <div className="absolute bottom-2 right-4 animate-bounce pixel-text">▼</div>
          )}
          
          {/* Поле ввода для пользователя */}
          {showInput && (
            <form onSubmit={handleUserSubmit} className="mt-4">
              <div className="flex flex-col">
                <label className="mb-2 pixel-text text-sm">Ваш ответ:</label>
                <Input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="bg-black border-white text-white pixel-text p-2"
                  placeholder="Напишите что-нибудь..."
                />
                <button 
                  type="submit" 
                  className="mt-2 border-2 border-white bg-black text-white pixel-text p-2 hover:bg-gray-900"
                >
                  Отправить
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Невидимая кнопка для продолжения диалога */}
      {!showInput && (
        <button 
          onClick={handleNext}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Продолжить диалог"
        />
      )}
    </div>
  );
};

export default UndertaleDialog;
