
import { useState } from 'react';
import UndertaleDialog from '@/components/UndertaleDialog';
import CharacterSelector from '@/components/CharacterSelector';

// Начальные сообщения для каждого персонажа
const characterMessages = {
  papyrus: [
    "ПРИВЕТСТВУЮ, ЧЕЛОВЕК! Я ВЕЛИКИЙ ПАПИРУС!",
    "NYEH HEH HEH! КАКАЯ ПРЕКРАСНАЯ ВСТРЕЧА!",
    "ТЫ ВЫГЛЯДИШЬ ТАК, БУДТО ХОЧЕШЬ ПОГОВОРИТЬ С КУЛИНАРНЫМ ГЕНИЕМ!",
    "ЗНАЕШЬ ЛИ ТЫ, ЧТО Я ЭКСПЕРТ В ПРИГОТОВЛЕНИИ СПАГЕТТИ?",
    "МОИ КУЛИНАРНЫЕ СПОСОБНОСТИ ДАЖЕ ЗАСТАВЛЯЮТ АНДАЙН ПОТЕТЬ ОТ ЗАВИСТИ!",
    "ХМММ, ТЫ НЕ ОЧЕНЬ РАЗГОВОРЧИВ, НЕ ТАК ЛИ?",
    "МОЖЕТ БЫТЬ, ТЫ ХОЧЕШЬ СКАЗАТЬ ЧТО-ТО ВЕЛИКОМУ ПАПИРУСУ?"
  ],
  sans: [
    "хей. как дела?",
    "что привело тебя сюда, приятель?",
    "знаешь, мой брат папирус действительно хочет поймать человека.",
    "он так старается, что я не могу не восхищаться им.",
    "в любом случае... тебе нравятся каламбуры?"
  ],
  undyne: [
    "НГААААА!!! ЕЩЁ ОДИН ЧЕЛОВЕК?!",
    "Я АНДАЙН, КАПИТАН КОРОЛЕВСКОЙ СТРАЖИ!",
    "Я ДОЛЖНА ВЗЯТЬ ТВОЮ ДУШУ! ... но, возможно, мы можем сначала поговорить.",
    "ТЫ ЛЮБИШЬ ГОТОВИТЬ? ИЛИ АНИМЕ?!"
  ],
  asgore: [
    "Здравствуй. Я Асгор, король подземелья.",
    "Прекрасный сегодня день, не так ли? Птицы поют, цветы цветут...",
    "Я бы предложил тебе чашечку чая, но...",
    "Знаешь... я не хочу сражаться с тобой. Но у меня нет выбора.",
    "Впрочем, давай сперва поговорим."
  ],
  chara: [
    "...",
    "Приветствую.",
    "Меня зовут Чара.",
    "Зачем ты меня позвал?"
  ]
};

// Английские сообщения
const englishMessages = {
  papyrus: [
    "GREETINGS, HUMAN! I AM THE GREAT PAPYRUS!",
    "NYEH HEH HEH! WHAT A WONDERFUL MEETING!",
    "YOU LOOK LIKE SOMEONE WHO WANTS TO TALK TO A CULINARY GENIUS!",
    "DID YOU KNOW THAT I AM AN EXPERT AT MAKING SPAGHETTI?",
    "MY CULINARY SKILLS EVEN MAKE UNDYNE SWEAT WITH ENVY!",
    "HMMM, YOU'RE NOT VERY TALKATIVE, ARE YOU?",
    "PERHAPS YOU WANT TO SAY SOMETHING TO THE GREAT PAPYRUS?"
  ],
  sans: [
    "hey. how's it going?",
    "what brings you here, buddy?",
    "y'know, my brother papyrus really wants to catch a human.",
    "he's trying so hard that i can't help but admire him.",
    "anyway... do you like puns?"
  ],
  undyne: [
    "NGAAAAAAH!!! ANOTHER HUMAN?!",
    "I'M UNDYNE, CAPTAIN OF THE ROYAL GUARD!",
    "I SHOULD TAKE YOUR SOUL! ...but maybe we can talk first.",
    "DO YOU LIKE COOKING? OR ANIME?!"
  ],
  asgore: [
    "Howdy. I am Asgore, king of the underground.",
    "Beautiful day today, isn't it? Birds are singing, flowers are blooming...",
    "I would offer you a cup of tea, but...",
    "You know... I don't want to fight you. But I have no choice.",
    "Still, let's talk for a while first."
  ],
  chara: [
    "...",
    "Greetings.",
    "I am Chara.",
    "Why did you call me?"
  ]
};

// Объединяем сообщения для разных языков
const allMessages = {
  ru: characterMessages,
  en: englishMessages
};

const Index = () => {
  const [currentCharacter, setCurrentCharacter] = useState('papyrus');
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  
  return (
    <div className="min-h-screen bg-black">
      <CharacterSelector 
        onSelectCharacter={setCurrentCharacter}
        currentCharacter={currentCharacter}
        onSelectLanguage={setCurrentLanguage}
        currentLanguage={currentLanguage}
      />
      <UndertaleDialog 
        initialMessages={allMessages[currentLanguage as keyof typeof allMessages]}
        character={currentCharacter}
        language={currentLanguage}
      />
    </div>
  );
};

export default Index;
