
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface DialogProps {
  initialMessages: Record<string, string[]>;
  characterName?: string;
  character: string;
  language: string;
}

// Содержит ответы для разных персонажей
const characterResponses: Record<string, Record<string, Record<string, string[]>>> = {
  en: {
    papyrus: {
      default: [
        "HMM, INTERESTING! TELL ME MORE, HUMAN!",
        "I DON'T QUITE UNDERSTAND, BUT THAT SOUNDS COOL!",
        "NYEH HEH HEH! YOU SPEAK LIKE A TRUE FRIEND OF PAPYRUS!"
      ],
      hello: [
        "HELLO, HUMAN! GRREAT TO SEE YOU!",
        "NYEH HEH HEH! WELCOME TO MY DIALOGUE!"
      ],
      spaghetti: [
        "AH! YOU LIKE SPAGHETTI? I AM A SPAGHETTI MASTER!",
        "MY SPAGHETTI IS THE BEST IN THE UNDERGROUND! WANT TO TRY SOME?"
      ],
      sans: [
        "MY LAZY BROTHER SANS? HE'S ALWAYS SLEEPING ON THE JOB!",
        "SANS ALWAYS TELLS TERRIBLE PUNS! IT'S SO ANNOYING!"
      ]
    },
    sans: {
      default: [
        "heh, that's pretty interesting, kid.",
        "sounds like you're having a good time.",
        "i'm all ears... well, if i had any. heh."
      ],
      hello: [
        "heya. how's it going?",
        "sup, buddy? nice day today."
      ],
      puns: [
        "did you hear about the skeleton who couldn't go to the dance? he had no-body to go with.",
        "why don't skeletons fight each other? they don't have the guts."
      ],
      papyrus: [
        "my brother? yeah, he's pretty cool.",
        "paps is training really hard to be in the royal guard. he's the coolest."
      ]
    },
    undyne: {
      default: [
        "NGAHHH!!! What are you talking about, punk?!",
        "That's AWESOME! Tell me MORE!",
        "You've got GUTS saying that to my face!"
      ],
      hello: [
        "Hey there, PUNK! Ready for training?!",
        "NGAHHHH!!! HELLO HUMAN!!!"
      ],
      anime: [
        "Anime? OH MY GOD! Alphys and I LOVE that human history!",
        "The way humans swing swords is SO COOL!"
      ],
      cooking: [
        "COOKING IS LIKE FIGHTING! You've gotta GIVE IT YOUR ALL!",
        "SMASH those vegetables! PULVERIZE that dough! NGAHHH!!!"
      ]
    },
    asgore: {
      default: [
        "Oh... that is quite interesting.",
        "Would you like a cup of tea?",
        "The garden is lovely today, isn't it?"
      ],
      hello: [
        "Howdy! It's nice to meet you.",
        "Greetings, human. I hope you are well."
      ],
      garden: [
        "The golden flowers are my favorite to grow.",
        "Gardening brings me peace in these difficult times."
      ],
      family: [
        "Family... is a difficult subject for me.",
        "Tori... I mean, Toriel was always better with children than I was."
      ]
    },
    chara: {
      default: [
        "...",
        "Interesting.",
        "Since when were you the one in control?"
      ],
      hello: [
        "Greetings.",
        "You called for me."
      ],
      power: [
        "Power. That is what I seek.",
        "This world is irredeemable."
      ],
      chocolate: [
        "Chocolate was always my favorite.",
        "Some cravings never die."
      ]
    }
  },
  ru: {
    papyrus: {
      default: [
        "ХММ, ИНТЕРЕСНО! РАССКАЖИ МНЕ БОЛЬШЕ, ЧЕЛОВЕК!",
        "Я НЕ СОВСЕМ ПОНИМАЮ, НО ЭТО ЗВУЧИТ КРУТО!",
        "NYEH HEH HEH! ТЫ ГОВОРИШЬ КАК НАСТОЯЩИЙ ДРУГ ПАПИРУСА!"
      ],
      hello: [
        "ПРИВЕТ, ЧЕЛОВЕК! РРРАД ТЕБЯ ВИДЕТЬ!",
        "NYEH HEH HEH! ПРИВЕТСТВУЮ ТЕБЯ В МОЁМ ДИАЛОГЕ!"
      ],
      spaghetti: [
        "А! ТЫ ЛЮБИШЬ СПАГЕТТИ? Я МАСТЕР СПАГЕТТИ!",
        "МОИ СПАГЕТТИ - САМЫЕ ЛУЧШИЕ В ПОДЗЕМЕЛЬЕ! ХОЧЕШЬ ПОПРОБОВАТЬ?"
      ],
      sans: [
        "МОЙ ЛЕНИВЫЙ БРАТЕЦ САНС? ОН ПОСТОЯННО СПИТ НА РАБОТЕ!",
        "САНС ВСЕГДА РАССКАЗЫВАЕТ УЖАСНЫЕ КАЛАМБУРЫ! ЭТО ТАК РАЗДРАЖАЕТ!"
      ]
    },
    sans: {
      default: [
        "хех, это довольно интересно, малой.",
        "похоже, ты неплохо проводишь время.",
        "я весь внимание... ну, если бы оно у меня было. хех."
      ],
      hello: [
        "хей. как дела?",
        "привет, дружище. хороший сегодня денёк."
      ],
      puns: [
        "слышал о скелете, который не пошёл на танцы? ему было не с кем пойти.",
        "почему скелеты не дерутся друг с другом? у них кишка тонка."
      ],
      papyrus: [
        "мой брат? да, он довольно крутой.",
        "папс очень старается попасть в королевскую стражу. он самый крутой."
      ]
    },
    undyne: {
      default: [
        "НГАААА!!! О чём ты говоришь, панк?!",
        "Это КРУТО! Расскажи МНЕ БОЛЬШЕ!",
        "У тебя СМЕЛОСТЬ говорить мне такое в лицо!"
      ],
      hello: [
        "Привет, ПАНК! Готов к тренировке?!",
        "НГАААА!!! ПРИВЕТ, ЧЕЛОВЕК!!!"
      ],
      anime: [
        "Аниме? О БОЖЕ! Мы с Альфис ОБОЖАЕМ эту человеческую историю!",
        "То, как люди размахивают мечами, ТАК КРУТО!"
      ],
      cooking: [
        "ГОТОВКА КАК БИТВА! Ты должен ОТДАТЬ ВСЁ!",
        "РАЗБЕЙ эти овощи! УНИЧТОЖЬ это тесто! НГАААА!!!"
      ]
    },
    asgore: {
      default: [
        "О... это довольно интересно.",
        "Не хочешь ли чашечку чая?",
        "Сегодня в саду прекрасно, не правда ли?"
      ],
      hello: [
        "Приветствую! Приятно познакомиться.",
        "Здравствуй, человек. Надеюсь, у тебя всё хорошо."
      ],
      garden: [
        "Золотые цветы - мои любимые.",
        "Садоводство приносит мне покой в эти трудные времена."
      ],
      family: [
        "Семья... это сложная тема для меня.",
        "Тори... то есть, Ториэль всегда лучше ладила с детьми, чем я."
      ]
    },
    chara: {
      default: [
        "...",
        "Интересно.",
        "С каких пор это ты здесь главный?"
      ],
      hello: [
        "Приветствую.",
        "Ты звал меня."
      ],
      power: [
        "Сила. Вот что я ищу.",
        "Этот мир неисправим."
      ],
      chocolate: [
        "Шоколад всегда был моим любимым.",
        "Некоторые желания не умирают никогда."
      ]
    }
  }
};

// Словари ключевых слов для разных языков
const keywordDictionaries: Record<string, Record<string, string[]>> = {
  en: {
    hello: ['hello', 'hi', 'hey', 'greetings', 'sup', 'howdy'],
    spaghetti: ['spaghetti', 'pasta', 'food', 'cooking', 'cook', 'recipe'],
    sans: ['sans', 'brother', 'skeleton', 'pun', 'joke', 'lazy'],
    puns: ['pun', 'joke', 'funny', 'humor', 'laugh'],
    papyrus: ['papyrus', 'cool', 'puzzle', 'spaghetti', 'nyeh'],
    anime: ['anime', 'alphys', 'cartoon', 'show', 'mew mew'],
    cooking: ['cook', 'food', 'kitchen', 'recipe', 'spaghetti'],
    garden: ['garden', 'flower', 'plant', 'growing', 'golden'],
    family: ['family', 'toriel', 'asriel', 'child', 'son', 'wife'],
    power: ['power', 'strong', 'strength', 'control', 'determination'],
    chocolate: ['chocolate', 'sweet', 'candy', 'dessert', 'cocoa']
  },
  ru: {
    hello: ['привет', 'здравствуй', 'здравствуйте', 'приветствую', 'хай'],
    spaghetti: ['спагетти', 'макароны', 'еда', 'готовка', 'готовить', 'рецепт'],
    sans: ['санс', 'брат', 'скелет', 'шутка', 'каламбур', 'ленивый'],
    puns: ['шутка', 'каламбур', 'юмор', 'смешно', 'смех'],
    papyrus: ['папирус', 'крутой', 'головоломка', 'спагетти', 'ньех'],
    anime: ['аниме', 'альфис', 'мультик', 'шоу', 'мью мью'],
    cooking: ['готовка', 'еда', 'кухня', 'рецепт', 'спагетти'],
    garden: ['сад', 'цветок', 'растение', 'выращивать', 'золотой'],
    family: ['семья', 'ториэль', 'азриэль', 'ребёнок', 'сын', 'жена'],
    power: ['сила', 'мощь', 'контроль', 'решимость'],
    chocolate: ['шоколад', 'сладкий', 'конфета', 'десерт', 'какао']
  }
};

// Звуки для разных персонажей
const characterSounds: Record<string, string> = {
  papyrus: '/undertale-text.mp3',
  sans: 'https://assets.codepen.io/5703063/sans-text.mp3',
  undyne: 'https://assets.codepen.io/5703063/undyne-text.mp3',
  asgore: 'https://assets.codepen.io/5703063/asgore-text.mp3',
  chara: 'https://assets.codepen.io/5703063/chara-text.mp3'
};

// Интеллектуальное понимание ввода пользователя
const getResponseKey = (input: string, character: string, language: string): string => {
  if (!input) return 'default';
  
  const lowerInput = input.toLowerCase();
  const availableKeywords = Object.keys(characterResponses[language][character]);
  const keywords = keywordDictionaries[language];
  
  // Проверяем все ключевые слова для текущего языка
  for (const [key, wordList] of Object.entries(keywords)) {
    if (wordList.some(word => lowerInput.includes(word))) {
      // Проверяем, есть ли у персонажа ответы на эту тему
      if (availableKeywords.includes(key)) {
        return key;
      }
    }
  }
  
  // Если ничего не найдено, используем ответ по умолчанию
  return 'default';
};

const UndertaleDialog = ({ initialMessages, characterName = "PAPYRUS", character, language }: DialogProps) => {
  const [messages, setMessages] = useState<string[]>(initialMessages[character] || initialMessages['papyrus']);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentMessage = messages[currentMessageIndex] || "";
  
  // Обновляем сообщения при смене персонажа
  useEffect(() => {
    setMessages(initialMessages[character] || initialMessages['papyrus']);
    setCurrentMessageIndex(0);
    setDisplayedText("");
    setCharIndex(0);
    setIsTyping(true);
    setShowInput(false);
  }, [character, initialMessages]);
  
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
    const updatedMessages = [...messages, `YOU: ${userInput}`];
    
    // Определяем ответ персонажа на сообщение пользователя
    const responseKey = getResponseKey(userInput, character, language);
    
    // Получаем ответы персонажа
    const characterResponseList = characterResponses[language][character][responseKey] || 
                                 characterResponses[language][character]['default'];
    
    // Выбираем случайный ответ из соответствующей категории
    const randomResponse = characterResponseList[Math.floor(Math.random() * characterResponseList.length)];
    
    // Добавляем ответ персонажа
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
  
  // Получаем имя персонажа для отображения
  const displayName = {
    papyrus: "PAPYRUS",
    sans: "sans",
    undyne: "UNDYNE",
    asgore: "ASGORE",
    chara: "Chara"
  }[character] || characterName;
  
  // Получаем цвет текста для персонажа
  const textColor = {
    papyrus: "text-orange-500",
    sans: "text-blue-400",
    undyne: "text-cyan-500",
    asgore: "text-red-600",
    chara: "text-red-700"
  }[character] || "";
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end p-4 bg-black">
      {/* Аудио элемент для воспроизведения звуков */}
      <audio ref={audioRef} className="hidden">
        <source src={characterSounds[character]} type="audio/mpeg" />
      </audio>
      
      <div className="w-full max-w-3xl mb-16">
        {/* Диалоговое окно */}
        <div className="bg-black border-2 border-white p-6 rounded-md text-white relative undertale-dialog">
          {/* Имя персонажа */}
          {displayName && !showInput && (
            <div className={`absolute -top-6 left-4 bg-black border-2 border-white px-3 py-1 rounded-md font-bold pixel-text text-sm ${textColor}`}>
              {displayName}
            </div>
          )}
          
          {/* Текст диалога */}
          <p className={`pixel-text text-base leading-relaxed min-h-[6rem] letter-spacing-wide ${textColor}`}>
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
                <label className="mb-2 pixel-text text-sm">
                  {language === 'ru' ? 'Ваш ответ:' : 'Your response:'}
                </label>
                <Input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="bg-black border-white text-white pixel-text p-2"
                  placeholder={language === 'ru' ? "Напишите что-нибудь..." : "Type something..."}
                />
                <button 
                  type="submit" 
                  className="mt-2 border-2 border-white bg-black text-white pixel-text p-2 hover:bg-gray-900"
                >
                  {language === 'ru' ? 'Отправить' : 'Send'}
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
