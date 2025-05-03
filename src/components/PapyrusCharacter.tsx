
import { useState } from 'react';
import UndertaleDialog from './UndertaleDialog';

const papyrusMessages = [
  "ПРИВЕТСТВУЮ, ЧЕЛОВЕК! Я ВЕЛИКИЙ ПАПИРУС!",
  "NYEH HEH HEH! Я ВИЖУ ТЫ ЗАИНТЕРЕСОВАН В МОЕЙ ПЕРСОНЕ!",
  "ЗНАЕШЬ ЛИ ТЫ, ЧТО Я ЭКСПЕРТ В ПРИГОТОВЛЕНИИ СПАГЕТТИ?",
  "МОИ КУЛИНАРНЫЕ СПОСОБНОСТИ ДАЖЕ ЗАСТАВЛЯЮТ АНДАЙН ПОТЕТЬ ОТ ЗАВИСТИ!",
  "МОЖЕТ БЫТЬ ОДНАЖДЫ... Я СТАНУ ЧАСТЬЮ КОРОЛЕВСКОЙ СТРАЖИ!",
  "НО ПОКА Я ПАТРУЛИРУЮ ЭТУ СТРАНИЦУ В ПОИСКАХ ЛЮДЕЙ!",
  "И ПОХОЖЕ Я НАШЁЛ ОДНОГО! NYEH HEH HEH!",
  "СПАСИБО ЗА ВСТРЕЧУ, ЧЕЛОВЕК! ТЕПЕРЬ МНЕ ПОРА ЗАНИМАТЬСЯ ОЧЕНЬ ВАЖНЫМИ ДЕЛАМИ!",
  "НО НЕ ВОЛНУЙСЯ! ВЕЛИКИЙ ПАПИРУС ВЕРНЁТСЯ СНОВА!"
];

const PapyrusCharacter = () => {
  const [isDialogActive, setIsDialogActive] = useState(true);
  const [isRestarting, setIsRestarting] = useState(false);
  
  const handleDialogComplete = () => {
    setIsDialogActive(false);
  };
  
  const restartDialog = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setIsDialogActive(true);
      setIsRestarting(false);
    }, 500);
  };
  
  return (
    <div className="relative">
      {/* Изображение Папируса */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="https://images.unsplash.com/photo-1575540325855-4b5d285a3845?auto=format&fit=crop&w=300&h=300" 
          alt="Papyrus" 
          className="w-32 h-32 object-contain"
        />
      </div>
      
      {/* Диалоговое окно */}
      {isDialogActive && (
        <UndertaleDialog 
          messages={papyrusMessages} 
          characterName="PAPYRUS" 
          onComplete={handleDialogComplete} 
        />
      )}
      
      {/* Кнопка для перезапуска диалога */}
      {!isDialogActive && !isRestarting && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={restartDialog}
            className="bg-white text-black border-2 border-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 transition-colors"
          >
            Начать диалог заново
          </button>
        </div>
      )}
    </div>
  );
};

export default PapyrusCharacter;
