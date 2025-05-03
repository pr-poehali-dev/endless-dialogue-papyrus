
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
  ],
  фриск: [
    "ФРИСК? ЭТО ИМЯ ЗВУЧИТ ЗНАКОМО... ТЫ ТОЖЕ ЧЕЛОВЕК?",
    "КАКОЕ СОВПАДЕНИЕ, ЧТО МЫ ВСТРЕТИЛИ ЕЩЁ ОДНОГО ЧЕЛОВЕКА! NYEH HEH HEH!"
  ],
  монстры: [
    "МЫ МОНСТРЫ ЖИВЁМ В ПОДЗЕМЕЛЬЕ УЖЕ ОЧЕНЬ ДАВНО!",
    "КОГДА-НИБУДЬ МЫ ВЫЙДЕМ НА ПОВЕРХНОСТЬ И Я СМОГУ ВОДИТЬ НАСТОЯЩУЮ МАШИНУ!"
  ],
  дружба: [
    "ДРУЖБА - ЭТО ОЧЕНЬ ВАЖНО! Я, ВЕЛИКИЙ ПАПИРУС, ЦЕНЮ СВОИХ ДРУЗЕЙ!",
    "ТЫ ХОЧЕШЬ СТАТЬ МОИМ ДРУГОМ? NYEH HEH HEH! У ТЕБЯ ОТЛИЧНЫЙ ВКУС!"
  ],
  ториэль: [
    "КОРОЛЕВА ТОРИЭЛЬ? ОНА ОЧЕНЬ ЛЮБИТ УЛИТООК И ГОТОВИТЬ ПИРОГИ!",
    "ОНА ОЧЕНЬ ДОБРАЯ И ВСЕГДА ЗВОНИТ СПРОСИТЬ, КАК У МЕНЯ ДЕЛА!"
  ]
};

// Интеллектуальное понимание ввода пользователя
const getResponseKey = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Словарь синонимов и близких фраз
  const keywordMap: Record<string, string[]> = {
    привет: ['привет', 'здравствуй', 'прив', 'хай', 'хеллоу', 'добрый день', 'здравствуйте', 'доброе утро'],
    спагетти: ['спагетти', 'макароны', 'паста', 'еда', 'готовка', 'готовить', 'кулинария'],
    санс: ['санс', 'брат', 'скелет', 'каламбур', 'шутки', 'юмор', 'ленивый'],
    андайн: ['андайн', 'ундайн', 'ундин', 'рыба', 'копье', 'тренер', 'стражник', 'воин'],
    фриск: ['фриск', 'человек', 'дитя', 'ребенок', 'душа'],
    монстры: ['монстры', 'подземелье', 'поверхность', 'свобода', 'барьер'],
    дружба: ['дружба', 'друг', 'друзья', 'дружить', 'товарищ'],
    ториэль: ['ториэль', 'тори', 'королева', 'пирог', 'мама', 'улитки']
  };
  
  // Проверяем все ключевые слова
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(word => lowerInput.includes(word))) {
      return key;
    }
  }
  
  // Анализ общего настроения сообщения
  if (lowerInput.includes('люблю') || lowerInput.includes('нравится') || lowerInput.includes('круто')) {
    return 'дружба';
  }
  
  if (lowerInput.includes('?') || lowerInput.includes('что') || lowerInput.includes('как') || lowerInput.includes('почему')) {
    // Если это вопрос, но мы не знаем на какую тему, выбираем случайный ответ
    const topics = Object.keys(papyrusResponses);
    return topics[Math.floor(Math.random() * topics.length)];
  }
  
  return 'default';
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentMessage = messages[currentMessageIndex] || "";
  
  // Функция для воспроизведения звука
  const playTypingSound = () => {
    if (audioRef.current) {
      // Сброс звука для повторного воспроизведения
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Ошибка воспроизведения звука:", e));
    }
  };
  
  // Эффект печатающегося текста с озвучкой
  useEffect(() => {
    if (charIndex < currentMessage.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentMessage[charIndex]);
        setCharIndex(charIndex + 1);
        
        // Воспроизводим звук при определенных условиях (не на каждый символ)
        if (charIndex % 2 === 0 && currentMessage[charIndex].trim() !== '') {
          playTypingSound();
        }
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
    const responseKey = getResponseKey(userInput);
    
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
      {/* Аудио элемент для воспроизведения звуков */}
      <audio ref={audioRef} className="hidden">
        <source src="https://assets.codepen.io/5703063/undertale-text.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио элемент.
      </audio>
      
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
          <p className="pixel-text text-base leading-relaxed min-h-[6rem] letter-spacing-wide">
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
