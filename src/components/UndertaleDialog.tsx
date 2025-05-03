
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import PapyrusCharacter from './PapyrusCharacter';

interface DialogProps {
  initialMessages: Record<string, string[]>;
  characterName?: string;
  character: string;
  language: string;
}

// Значительно расширенный набор ответов для персонажей
const characterResponses: Record<string, Record<string, Record<string, string[]>>> = {
  en: {
    papyrus: {
      default: [
        "HMM, INTERESTING! TELL ME MORE, HUMAN!",
        "I DON'T QUITE UNDERSTAND, BUT THAT SOUNDS COOL!",
        "NYEH HEH HEH! YOU SPEAK LIKE A TRUE FRIEND OF PAPYRUS!",
        "THE GREAT PAPYRUS IS INTRIGUED BY YOUR WORDS!",
        "THAT'S FASCINATING! ALMOST AS FASCINATING AS MY PUZZLES!"
      ],
      hello: [
        "HELLO, HUMAN! GRREAT TO SEE YOU!",
        "NYEH HEH HEH! WELCOME TO MY DIALOGUE!",
        "GREETINGS, HUMAN! ARE YOU READY TO BE AMAZED BY THE GREAT PAPYRUS?",
        "HELLO THERE! I WAS JUST PRACTICING MY 'ROYAL GUARDSMAN' STANCE!",
        "WOWIE! A HUMAN THAT SPEAKS! WHAT A FASCINATING DAY!"
      ],
      spaghetti: [
        "AH! YOU LIKE SPAGHETTI? I AM A SPAGHETTI MASTER!",
        "MY SPAGHETTI IS THE BEST IN THE UNDERGROUND! WANT TO TRY SOME?",
        "SPAGHETTI! MY CULINARY MASTERPIECE! UNDYNE TAUGHT ME HOW TO MAKE IT!",
        "MY SPAGHETTI RECIPE IS SECRET! BUT IT INVOLVES PASSIONATE PUNCHING!",
        "YOU MUST HAVE GREAT TASTE TO APPRECIATE MY ARTISANAL PASTA CREATIONS!"
      ],
      sans: [
        "MY LAZY BROTHER SANS? HE'S ALWAYS SLEEPING ON THE JOB!",
        "SANS ALWAYS TELLS TERRIBLE PUNS! IT'S SO ANNOYING!",
        "MY BROTHER IS BOTH LAZY AND MYSTERIOUS. HOW DOES HE GET AROUND SO QUICKLY?",
        "SANS COULD BE A GREAT ROYAL GUARD IF HE WASN'T SO... SANS-LIKE!",
        "I WORRY ABOUT SANS SOMETIMES. ALL HE DOES IS DRINK KETCHUP AND TELL JOKES!"
      ],
      puzzle: [
        "PUZZLES ARE AN ANCIENT MONSTER TRADITION! MY SPECIALTY!",
        "I'VE BEEN DESIGNING TRAP PUZZLES TO CAPTURE HUMANS! LIKE YOU!",
        "MY PUZZLES ARE PERFECTLY CALIBRATED FOR MAXIMUM BEFUDDLEMENT!",
        "THE PERFECT PUZZLE SHOULD BE CHALLENGING BUT SOLVABLE! LIKE ME!",
        "NYEH HEH HEH! MY LATEST PUZZLE INVOLVES SPIKES, ICE AND DETERMINATION!"
      ],
      dream: [
        "MY DREAM? TO BECOME A ROYAL GUARDSMAN, OF COURSE!",
        "I DREAM OF POPULARITY! PRESTIGE! BEING THE WORLD'S GREATEST FRIEND!",
        "SOMEDAY I'LL HAVE A COOL CAR TO DRIVE ON THE SURFACE!",
        "I WISH TO MAKE THE PERFECT SPAGHETTI AND SHARE IT WITH THE WORLD!",
        "MY GREATEST DREAM IS TO HAVE MANY FRIENDS WHO APPRECIATE MY GREATNESS!"
      ]
    },
    sans: {
      default: [
        "heh, that's pretty interesting, kid.",
        "sounds like you're having a good time.",
        "i'm all ears... well, if i had any. heh.",
        "huh. didn't expect to hear that today.",
        "cool. cool cool cool."
      ],
      hello: [
        "heya. how's it going?",
        "sup, buddy? nice day today.",
        "hey pal. you look like you've seen a skeleton before.",
        "heya. you've been busy, huh?",
        "oh hey. didn't see you there. or maybe i did. who knows."
      ],
      puns: [
        "did you hear about the skeleton who couldn't go to the dance? he had no-body to go with.",
        "why don't skeletons fight each other? they don't have the guts.",
        "what do skeletons order at restaurants? spare ribs.",
        "i'm not lazy, i'm just bone tired.",
        "i'd tell you a skeleton pun but you wouldn't find it very humerus."
      ],
      papyrus: [
        "my brother? yeah, he's pretty cool.",
        "paps is training really hard to be in the royal guard. he's the coolest.",
        "my brother's puzzles are getting better. he's really putting his backbone into it.",
        "papyrus? yeah, he's the real star around here. i'm just his comic relief.",
        "you gotta admire papyrus's enthusiasm. nothing gets under his skin. heh."
      ],
      grillbys: [
        "grillby's has the best burgers in the underground. wanna grab one?",
        "i've got a tab at grillby's that's probably taller than papyrus by now.",
        "you know what's great about grillby's? the atmosphere. literally made of fire.",
        "the nice thing about grillby's is that it's always warm. perfect for these old bones.",
        "ever tried grillby's fries? they're fire. heh."
      ],
      time: [
        "time is a weird thing, don't you think?",
        "sometimes i feel like i've seen things happen before they happen. weird, right?",
        "ever feel like you're stuck in a loop? like everything keeps resetting?",
        "i've been thinking about timelines. branches. deviations. interesting stuff.",
        "in another time, another place... we might not be having this conversation."
      ]
    },
    undyne: {
      default: [
        "NGAHHH!!! What are you talking about, punk?!",
        "That's AWESOME! Tell me MORE!",
        "You've got GUTS saying that to my face!",
        "HAH! You humans are WEIRD but INTERESTING!",
        "THAT'S the spirit! PASSION in everything you do!"
      ],
      hello: [
        "Hey there, PUNK! Ready for training?!",
        "NGAHHHH!!! HELLO HUMAN!!!",
        "WHAT'S UP, NERD?! READY TO GET STRONG?!",
        "YOU'RE BACK FOR MORE?! I LIKE YOUR STYLE!",
        "FUHUHUHU! A HUMAN WHO COMES WILLINGLY! BRAVE!"
      ],
      anime: [
        "Anime? OH MY GOD! Alphys and I LOVE that human history!",
        "The way humans swing swords is SO COOL!",
        "Those giant robots with AWESOME weapons?! NOTHING is more historical!",
        "Did you know humans can shoot LASERS from their eyes?! Alphys showed me!",
        "Anime taught me that friendship and SCREAMING solve ALL PROBLEMS!"
      ],
      cooking: [
        "COOKING IS LIKE FIGHTING! You've gotta GIVE IT YOUR ALL!",
        "SMASH those vegetables! PULVERIZE that dough! NGAHHH!!!",
        "My cooking lesson with Papyrus? IT WAS INTENSE! HIS HOUSE CAUGHT FIRE!",
        "The SECRET to good cooking is VIOLENCE and HEAT! LOTS OF HEAT!",
        "Alphys says my cooking is... 'memorable'. THAT MEANS AMAZING!"
      ],
      alphys: [
        "Alphys is the SMARTEST monster in the underground!",
        "Dr. Alphys made me this AWESOME armor! Isn't it RAD?!",
        "Alphys and I watch human history documentaries ALL THE TIME!",
        "DON'T tell anyone, but... Alphys is pretty cute when she talks about science stuff...",
        "Alphys is shy but she's got a WARRIOR'S HEART! I BELIEVE IN HER!"
      ],
      training: [
        "Training?! I start EVERY DAY by suplexing a boulder!",
        "NGAHHH!!! My training regimen is INTENSE! Not for the weak!",
        "Papyrus? He's got potential! He just needs to be LESS... NICE!",
        "The key to training is PUSHING YOUR LIMITS! Then SMASHING THOSE LIMITS!",
        "Want me to train you, punk?! I won't go easy just because you're human!"
      ]
    },
    asgore: {
      default: [
        "Oh... that is quite interesting.",
        "Would you like a cup of tea?",
        "The garden is lovely today, isn't it?",
        "Hmm... I see. Please, continue.",
        "That reminds me of something from long ago..."
      ],
      hello: [
        "Howdy! It's nice to meet you.",
        "Greetings, human. I hope you are well.",
        "Ah, hello there. Welcome to the underground.",
        "Howdy! Would you like to join me for tea?",
        "Oh! A visitor. How delightful."
      ],
      garden: [
        "The golden flowers are my favorite to grow.",
        "Gardening brings me peace in these difficult times.",
        "I find that taking care of plants helps to sort one's thoughts.",
        "My garden has many types of flowers, but the golden ones are special.",
        "The throne room is filled with flowers. They remind me of... sunshine."
      ],
      family: [
        "Family... is a difficult subject for me.",
        "Tori... I mean, Toriel was always better with children than I was.",
        "My son Asriel was much like these flowers. Bright and full of hope.",
        "There was once laughter in these halls. I miss those days.",
        "The weight of a crown is nothing compared to the weight of loss."
      ],
      responsibility: [
        "A king must do what is best for his people, even when it hurts.",
        "Sometimes, the right path is not the easiest one to walk.",
        "I declared war on humanity in anger. Now I am trapped by my own decree.",
        "Every human that falls down here... I am sorry, but you understand, don't you?",
        "If I could take back my declaration of war... but no, my people need hope."
      ],
      tea: [
        "Golden flower tea is my specialty. Would you like a cup?",
        "Tea is best enjoyed slowly, with friends. Though I haven't had many visitors lately.",
        "I grow all the herbs for my tea in my garden. It's quite therapeutic.",
        "Different teas for different moods. Today feels like a golden flower day.",
        "The secret to good tea is patience. Much like ruling a kingdom."
      ]
    },
    chara: {
      default: [
        "...",
        "Interesting.",
        "Since when were you the one in control?",
        "You think you have a choice here?",
        "Your determination... it's familiar."
      ],
      hello: [
        "Greetings.",
        "You called for me.",
        "I've been watching.",
        "So, you can see me now. How curious.",
        "Partner."
      ],
      power: [
        "Power. That is what I seek.",
        "This world is irredeemable.",
        "With enough determination, anything is possible.",
        "Humans, monsters... they're all the same in the end.",
        "The feeling of your power increasing... that's me."
      ],
      chocolate: [
        "Chocolate was always my favorite.",
        "Some cravings never die.",
        "Asriel used to sneak chocolate for me from the kitchen.",
        "Sweet on the tongue, bitter in memory.",
        "One thing I miss about being alive. The taste."
      ],
      asriel: [
        "My brother was weak. Too kind for this world.",
        "Asriel... he couldn't do what needed to be done.",
        "He called me his best friend. His faith was misplaced.",
        "Crybaby. Always following me around.",
        "...I miss him sometimes."
      ],
      humans: [
        "Humanity deserves what's coming.",
        "I hated them. I still do.",
        "They feared monsters, but humans are the real monsters.",
        "The village... they attacked without question. Without mercy.",
        "Humans destroyed everything I cared about. Twice."
      ]
    }
  },
  ru: {
    papyrus: {
      default: [
        "ХММ, ИНТЕРЕСНО! РАССКАЖИ МНЕ БОЛЬШЕ, ЧЕЛОВЕК!",
        "Я НЕ СОВСЕМ ПОНИМАЮ, НО ЭТО ЗВУЧИТ КРУТО!",
        "NYEH HEH HEH! ТЫ ГОВОРИШЬ КАК НАСТОЯЩИЙ ДРУГ ПАПИРУСА!",
        "ВЕЛИКИЙ ПАПИРУС ЗАИНТРИГОВАН ТВОИМИ СЛОВАМИ!",
        "ЭТО УВЛЕКАТЕЛЬНО! ПОЧТИ ТАК ЖЕ УВЛЕКАТЕЛЬНО, КАК МОИ ГОЛОВОЛОМКИ!"
      ],
      hello: [
        "ПРИВЕТ, ЧЕЛОВЕК! РРРАД ТЕБЯ ВИДЕТЬ!",
        "NYEH HEH HEH! ПРИВЕТСТВУЮ ТЕБЯ В МОЁМ ДИАЛОГЕ!",
        "ПРИВЕТСТВУЮ, ЧЕЛОВЕК! ГОТОВ ЛИ ТЫ БЫТЬ ПОРАЖЁННЫМ ВЕЛИКИМ ПАПИРУСОМ?",
        "ПРИВЕТ! Я ТОЛЬКО ЧТО ТРЕНИРОВАЛ СВОЮ СТОЙКУ 'КОРОЛЕВСКОГО СТРАЖНИКА'!",
        "ВАУ! ГОВОРЯЩИЙ ЧЕЛОВЕК! КАКОЙ УДИВИТЕЛЬНЫЙ ДЕНЬ!"
      ],
      spaghetti: [
        "А! ТЫ ЛЮБИШЬ СПАГЕТТИ? Я МАСТЕР СПАГЕТТИ!",
        "МОИ СПАГЕТТИ - САМЫЕ ЛУЧШИЕ В ПОДЗЕМЕЛЬЕ! ХОЧЕШЬ ПОПРОБОВАТЬ?",
        "СПАГЕТТИ! МОЙ КУЛИНАРНЫЙ ШЕДЕВР! АНДАЙН НАУЧИЛА МЕНЯ ИХ ГОТОВИТЬ!",
        "РЕЦЕПТ МОИХ СПАГЕТТИ СЕКРЕТНЫЙ! НО ОН ВКЛЮЧАЕТ СТРАСТНОЕ ИЗБИЕНИЕ ИНГРЕДИЕНТОВ!",
        "У ТЕБЯ ДОЛЖЕН БЫТЬ ОТЛИЧНЫЙ ВКУС, ЧТОБЫ ОЦЕНИТЬ МОИ ИЗЫСКАННЫЕ ТВОРЕНИЯ ИЗ МАКАРОН!"
      ],
      sans: [
        "МОЙ ЛЕНИВЫЙ БРАТЕЦ САНС? ОН ПОСТОЯННО СПИТ НА РАБОТЕ!",
        "САНС ВСЕГДА РАССКАЗЫВАЕТ УЖАСНЫЕ КАЛАМБУРЫ! ЭТО ТАК РАЗДРАЖАЕТ!",
        "МОЙ БРАТ ОДНОВРЕМЕННО ЛЕНИВЫЙ И ЗАГАДОЧНЫЙ. КАК ОН ПЕРЕМЕЩАЕТСЯ ТАК БЫСТРО?",
        "САНС МОГ БЫ БЫТЬ ОТЛИЧНЫМ КОРОЛЕВСКИМ СТРАЖНИКОМ, ЕСЛИ БЫ НЕ БЫЛ ТАКИМ... САНСОМ!",
        "Я ИНОГДА БЕСПОКОЮСЬ О САНСЕ. ВСЁ, ЧТО ОН ДЕЛАЕТ - ПЬЁТ КЕТЧУП И ШУТИТ!"
      ],
      puzzle: [
        "ГОЛОВОЛОМКИ - ЭТО ДРЕВНЯЯ ТРАДИЦИЯ МОНСТРОВ! МОЯ СПЕЦИАЛЬНОСТЬ!",
        "Я РАЗРАБАТЫВАЮ ЛОВУШКИ-ГОЛОВОЛОМКИ, ЧТОБЫ ПОЙМАТЬ ЛЮДЕЙ! НАПРИМЕР, ТЕБЯ!",
        "МОИ ГОЛОВОЛОМКИ ИДЕАЛЬНО ОТКАЛИБРОВАНЫ ДЛЯ МАКСИМАЛЬНОГО ЗАМЕШАТЕЛЬСТВА!",
        "ИДЕАЛЬНАЯ ГОЛОВОЛОМКА ДОЛЖНА БЫТЬ СЛОЖНОЙ, НО РЕШАЕМОЙ! КАК Я!",
        "NYEH HEH HEH! МОЯ ПОСЛЕДНЯЯ ГОЛОВОЛОМКА ВКЛЮЧАЕТ ШИПЫ, ЛЁД И РЕШИМОСТЬ!"
      ],
      dream: [
        "МОЯ МЕЧТА? СТАТЬ КОРОЛЕВСКИМ СТРАЖНИКОМ, КОНЕЧНО!",
        "Я МЕЧТАЮ О ПОПУЛЯРНОСТИ! ПРЕСТИЖЕ! БЫТЬ ВЕЛИЧАЙШИМ ДРУГОМ В МИРЕ!",
        "КОГДА-НИБУДЬ У МЕНЯ БУДЕТ КРУТАЯ МАШИНА, ЧТОБЫ ЕЗДИТЬ НА ПОВЕРХНОСТИ!",
        "Я ХОЧУ ПРИГОТОВИТЬ ИДЕАЛЬНЫЕ СПАГЕТТИ И ПОДЕЛИТЬСЯ ИМИ С МИРОМ!",
        "МОЯ ВЕЛИЧАЙШАЯ МЕЧТА - ИМЕТЬ МНОГО ДРУЗЕЙ, КОТОРЫЕ ЦЕНЯТ МОЁ ВЕЛИЧИЕ!"
      ]
    },
    sans: {
      default: [
        "хех, это довольно интересно, малой.",
        "похоже, ты неплохо проводишь время.",
        "я весь внимание... ну, если бы оно у меня было. хех.",
        "хм. не ожидал такое услышать сегодня.",
        "круто. круто-круто-круто."
      ],
      hello: [
        "хей. как дела?",
        "привет, дружище. хороший сегодня денёк.",
        "хей, приятель. выглядишь так, будто уже видел скелета раньше.",
        "хеййя. ты был занят, да?",
        "о, привет. не заметил тебя. или, может, заметил. кто знает."
      ],
      puns: [
        "слышал о скелете, который не пошёл на танцы? ему было не с кем пойти.",
        "почему скелеты не дерутся друг с другом? у них кишка тонка.",
        "что скелеты заказывают в ресторанах? запасные рёбра.",
        "я не ленивый, я просто до костей устал.",
        "я бы рассказал тебе скелетную шутку, но ты бы не нашёл её очень плечевой."
      ],
      papyrus: [
        "мой брат? да, он довольно крутой.",
        "папс очень старается попасть в королевскую стражу. он самый крутой.",
        "головоломки моего брата становятся лучше. он действительно вкладывает в них весь свой хребет.",
        "папирус? да, он настоящая звезда здесь. я просто его комическая поддержка.",
        "нельзя не восхищаться энтузиазмом папируса. ничто не пролезает под его кожу. хех."
      ],
      grillbys: [
        "у гриллби лучшие бургеры в подземелье. хочешь взять один?",
        "у меня в гриллби счёт, который, наверное, уже выше папируса.",
        "знаешь, что классного в гриллби? атмосфера. буквально сделана из огня.",
        "хорошо в гриллби то, что там всегда тепло. идеально для этих старых костей.",
        "пробовал картошку у гриллби? она огонь. хех."
      ],
      time: [
        "время - странная штука, не думаешь?",
        "иногда я чувствую, что видел вещи до того, как они произошли. странно, да?",
        "бывает ощущение, что застрял в петле? будто всё постоянно сбрасывается?",
        "я думал о временных линиях. ветвях. отклонениях. интересные вещи.",
        "в другом времени, в другом месте... мы могли бы не вести этот разговор."
      ]
    },
    undyne: {
      default: [
        "НГАААА!!! О чём ты говоришь, панк?!",
        "Это КРУТО! Расскажи МНЕ БОЛЬШЕ!",
        "У тебя СМЕЛОСТЬ говорить мне такое в лицо!",
        "ХА! Вы, люди, СТРАННЫЕ, но ИНТЕРЕСНЫЕ!",
        "ВОТ это настрой! СТРАСТЬ во всём, что ты делаешь!"
      ],
      hello: [
        "Привет, ПАНК! Готов к тренировке?!",
        "НГАААА!!! ПРИВЕТ, ЧЕЛОВЕК!!!",
        "ЧТО ПРОИСХОДИТ, БОТАН?! ГОТОВ СТАТЬ СИЛЬНЫМ?!",
        "ТЫ ВЕРНУЛСЯ ЗА ДОБАВКОЙ?! МНЕ НРАВИТСЯ ТВОЙ СТИЛЬ!",
        "ФУХУХУХУ! ЧЕЛОВЕК, КОТОРЫЙ ПРИХОДИТ ДОБРОВОЛЬНО! СМЕЛО!"
      ],
      anime: [
        "Аниме? О БОЖЕ! Мы с Альфис ОБОЖАЕМ эту человеческую историю!",
        "То, как люди размахивают мечами, ТАК КРУТО!",
        "Эти гигантские роботы с ПОТРЯСАЮЩИМ оружием?! НИЧТО не более историчное!",
        "Ты знал, что люди могут стрелять ЛАЗЕРАМИ из глаз?! Альфис мне показала!",
        "Аниме научило меня, что дружба и КРИКИ решают ВСЕ ПРОБЛЕМЫ!"
      ],
      cooking: [
        "ГОТОВКА КАК БИТВА! Ты должен ОТДАТЬ ВСЁ!",
        "РАЗБЕЙ эти овощи! УНИЧТОЖЬ это тесто! НГАААА!!!",
        "Мой кулинарный урок с Папирусом? ЭТО БЫЛО ИНТЕНСИВНО! ЕГО ДОМ ЗАГОРЕЛСЯ!",
        "СЕКРЕТ хорошей готовки - НАСИЛИЕ и ЖАРА! МНОГО ЖАРЫ!",
        "Альфис говорит, что моя готовка... 'запоминающаяся'. ЭТО ЗНАЧИТ ПОТРЯСАЮЩАЯ!"
      ],
      alphys: [
        "Альфис - САМЫЙ УМНЫЙ монстр в подземелье!",
        "Доктор Альфис сделала мне эту ПОТРЯСАЮЩУЮ броню! Разве она не КРУТАЯ?!",
        "Мы с Альфис смотрим документальные фильмы по человеческой истории ВСЁ ВРЕМЯ!",
        "НЕ говори никому, но... Альфис довольно милая, когда говорит о научных вещах...",
        "Альфис застенчивая, но у неё СЕРДЦЕ ВОИНА! Я В НЕЁ ВЕРЮ!"
      ],
      training: [
        "Тренировка?! Я начинаю КАЖДЫЙ ДЕНЬ с подбрасывания валуна!",
        "НГАААА!!! Мой режим тренировок ИНТЕНСИВНЫЙ! Не для слабаков!",
        "Папирус? У него есть потенциал! Ему просто нужно быть МЕНЕЕ... МИЛЫМ!",
        "Ключ к тренировке - ПРЕВОСХОДИТЬ СВОИ ПРЕДЕЛЫ! Затем РАЗРУШАТЬ ЭТИ ПРЕДЕЛЫ!",
        "Хочешь, чтобы я тебя тренировала, панк?! Я не буду щадить тебя только потому, что ты человек!"
      ]
    },
    asgore: {
      default: [
        "О... это довольно интересно.",
        "Не хочешь ли чашечку чая?",
        "Сегодня в саду прекрасно, не правда ли?",
        "Хмм... понимаю. Пожалуйста, продолжай.",
        "Это напоминает мне кое-что из давних времён..."
      ],
      hello: [
        "Приветствую! Приятно познакомиться.",
        "Здравствуй, человек. Надеюсь, у тебя всё хорошо.",
        "Ах, здравствуй. Добро пожаловать в подземелье.",
        "Приветствую! Не хочешь ли присоединиться ко мне за чаем?",
        "О! Посетитель. Как восхитительно."
      ],
      garden: [
        "Золотые цветы - мои любимые.",
        "Садоводство приносит мне покой в эти трудные времена.",
        "Я нахожу, что забота о растениях помогает привести мысли в порядок.",
        "В моём саду много видов цветов, но золотые особенные.",
        "Тронный зал заполнен цветами. Они напоминают мне о... солнечном свете."
      ],
      family: [
        "Семья... это сложная тема для меня.",
        "Тори... то есть, Ториэль всегда лучше ладила с детьми, чем я.",
        "Мой сын Азриэль был похож на эти цветы. Яркий и полный надежды.",
        "Когда-то в этих залах был смех. Я скучаю по тем дням.",
        "Вес короны ничто по сравнению с весом потери."
      ],
      responsibility: [
        "Король должен делать то, что лучше для его народа, даже если это больно.",
        "Иногда правильный путь не самый лёгкий для ходьбы.",
        "Я объявил войну человечеству в гневе. Теперь я пойман своим собственным указом.",
        "Каждый человек, который падает сюда... Мне жаль, но ты понимаешь, не так ли?",
        "Если бы я мог взять обратно своё объявление войны... но нет, моему народу нужна надежда."
      ],
      tea: [
        "Чай из золотых цветов - моя специальность. Хочешь чашечку?",
        "Чай лучше всего наслаждаться медленно, с друзьями. Хотя у меня давно не было посетителей.",
        "Я выращиваю все травы для моего чая в моём саду. Это довольно терапевтично.",
        "Разные чаи для разных настроений. Сегодня похоже на день золотого цветка.",
        "Секрет хорошего чая - терпение. Как и управление королевством."
      ]
    },
    chara: {
      default: [
        "...",
        "Интересно.",
        "С каких пор это ты здесь главный?",
        "Думаешь, у тебя есть выбор?",
        "Твоя решимость... она знакома."
      ],
      hello: [
        "Приветствую.",
        "Ты звал меня.",
        "Я наблюдал.",
        "Значит, теперь ты меня видишь. Как любопытно.",
        "Партнёр."
      ],
      power: [
        "Сила. Вот что я ищу.",
        "Этот мир неисправим.",
        "С достаточной решимостью возможно всё.",
        "Люди, монстры... в конце все они одинаковы.",
        "Ощущение, что твоя сила растёт... это я."
      ],
      chocolate: [
        "Шоколад всегда был моим любимым.",
        "Некоторые желания не умирают никогда.",
        "Азриэль обычно тайком приносил мне шоколад из кухни.",
        "Сладкий на языке, горький в памяти.",
        "Одна вещь, по которой я скучаю из жизни. Вкус."
      ],
      asriel: [
        "Мой брат был слаб. Слишком добр для этого мира.",
        "Азриэль... он не смог сделать то, что нужно было сделать.",
        "Он называл меня своим лучшим другом. Его вера была неуместна.",
        "Плакса. Всегда ходил за мной по пятам.",
        "...Иногда я скучаю по нему."
      ],
      humans: [
        "Человечество заслуживает того, что грядёт.",
        "Я ненавидел их. И до сих пор ненавижу.",
        "Они боялись монстров, но люди - настоящие монстры.",
        "Деревня... они атаковали без вопросов. Без милосердия.",
        "Люди уничтожили всё, что мне дорого. Дважды."
      ]
    }
  }
};

// Словари ключевых слов для разных языков
const keywordDictionaries: Record<string, Record<string, string[]>> = {
  en: {
    hello: ['hello', 'hi', 'hey', 'greetings', 'sup', 'howdy', 'good morning', 'good day'],
    spaghetti: ['spaghetti', 'pasta', 'food', 'cooking', 'cook', 'recipe', 'noodle', 'italian'],
    sans: ['sans', 'brother', 'skeleton', 'pun', 'joke', 'lazy', 'comedian', 'shortcut'],
    puns: ['pun', 'joke', 'funny', 'humor', 'laugh', 'comedy', 'gaster', 'knock knock'],
    papyrus: ['papyrus', 'cool', 'puzzle', 'spaghetti', 'nyeh', 'scarf', 'pasta', 'great'],
    anime: ['anime', 'alphys', 'cartoon', 'show', 'mew mew', 'robot', 'mettaton', 'japanese'],
    cooking: ['cook', 'food', 'kitchen', 'recipe', 'spaghetti', 'bake', 'flame', 'heat'],
    garden: ['garden', 'flower', 'plant', 'growing', 'golden', 'throne', 'seed', 'flora'],
    family: ['family', 'toriel', 'asriel', 'child', 'son', 'wife', 'love', 'home'],
    power: ['power', 'strong', 'strength', 'control', 'determination', 'soul', 'kill', 'fight'],
    chocolate: ['chocolate', 'sweet', 'candy', 'dessert', 'cocoa', 'treat', 'sugar', 'taste'],
    puzzle: ['puzzle', 'trap', 'challenge', 'game', 'maze', 'brain', 'solve', 'riddle'],
    dream: ['dream', 'hope', 'future', 'wish', 'goal', 'aspiration', 'car', 'famous'],
    grillbys: ['grillby', 'bar', 'food', 'fire', 'burger', 'fries', 'ketchup', 'drink'],
    time: ['time', 'timeline', 'reset', 'load', 'save', 'loop', 'deja vu', 'paradox'],
    alphys: ['alphys', 'scientist', 'lab', 'anime', 'invention', 'nervous', 'dinosaur', 'doctor'],
    training: ['train', 'fight', 'strong', 'workout', 'guard', 'battle', 'practice', 'suplex'],
    responsibility: ['responsibility', 'king', 'duty', 'burden', 'choice', 'decision', 'crown', 'rule'],
    tea: ['tea', 'drink', 'cup', 'beverage', 'hot', 'herb', 'golden', 'relax'],
    asriel: ['asriel', 'son', 'child', 'prince', 'dreemurr', 'goat', 'hope', 'kid'],
    humans: ['human', 'surface', 'war', 'hate', 'village', 'attack', 'barrier', 'fall']
  },
  ru: {
    hello: ['привет', 'здравствуй', 'здравствуйте', 'приветствую', 'хай', 'доброе утро', 'добрый день', 'хеллоу'],
    spaghetti: ['спагетти', 'макароны', 'еда', 'готовка', 'готовить', 'рецепт', 'паста', 'блюдо'],
    sans: ['санс', 'брат', 'скелет', 'шутка', 'каламбур', 'ленивый', 'комик', 'короткий путь'],
    puns: ['шутка', 'каламбур', 'юмор', 'смешно', 'смех', 'комедия', 'гастер', 'тук-тук'],
    papyrus: ['папирус', 'крутой', 'головоломка', 'спагетти', 'ньех', 'шарф', 'паста', 'великий'],
    anime: ['аниме', 'альфис', 'мультик', 'шоу', 'мью мью', 'робот', 'меттатон', 'японский'],
    cooking: ['готовка', 'еда', 'кухня', 'рецепт', 'спагетти', 'печь', 'пламя', 'огонь'],
    garden: ['сад', 'цветок', 'растение', 'выращивать', 'золотой', 'трон', 'семя', 'флора'],
    family: ['семья', 'ториэль', 'азриэль', 'ребёнок', 'сын', 'жена', 'любовь', 'дом'],
    power: ['сила', 'мощь', 'контроль', 'решимость', 'душа', 'убить', 'драться', 'битва'],
    chocolate: ['шоколад', 'сладкий', 'конфета', 'десерт', 'какао', 'лакомство', 'сахар', 'вкус'],
    puzzle: ['головоломка', 'ловушка', 'вызов', 'игра', 'лабиринт', 'мозг', 'решать', 'загадка'],
    dream: ['мечта', 'надежда', 'будущее', 'желание', 'цель', 'стремление', 'машина', 'известный'],
    grillbys: ['гриллби', 'бар', 'еда', 'огонь', 'бургер', 'картошка', 'кетчуп', 'напиток'],
    time: ['время', 'временная линия', 'сброс', 'загрузка', 'сохранение', 'петля', 'дежавю', 'парадокс'],
    alphys: ['альфис', 'учёный', 'лаборатория', 'аниме', 'изобретение', 'нервная', 'динозавр', 'доктор'],
    training: ['тренировка', 'бой', 'сильный', 'тренироваться', 'страж', 'битва', 'практика', 'подбрасывание'],
    responsibility: ['ответственность', 'король', 'долг', 'бремя', 'выбор', 'решение', 'корона', 'правление'],
    tea: ['чай', 'напиток', 'чашка', 'горячий', 'трава', 'золотой', 'расслабление'],
    asriel: ['азриэль', 'сын', 'ребёнок', 'принц', 'дримурр', 'козлик', 'надежда', 'малыш'],
    humans: ['человек', 'люди', 'поверхность', 'война', 'ненависть', 'деревня', 'атака', 'барьер', 'падение']
  }
};

// Звуки для разных персонажей
const characterSounds: Record<string, string> = {
  papyrus: 'https://assets.codepen.io/5703063/papyrus-text.mp3',
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
  
  // Анализируем настроение сообщения для более умного ответа
  if (lowerInput.includes('?') || lowerInput.includes('what') || lowerInput.includes('how') || 
      lowerInput.includes('когда') || lowerInput.includes('где') || lowerInput.includes('почему')) {
    // Это вопрос, выберем соответствующую тему
    const questionTopics = ['default', 'dream', 'family', 'puzzle'].filter(t => availableKeywords.includes(t));
    return questionTopics[Math.floor(Math.random() * questionTopics.length)];
  }
  
  if (lowerInput.includes('love') || lowerInput.includes('like') || lowerInput.includes('enjoy') ||
      lowerInput.includes('люблю') || lowerInput.includes('нравится') || lowerInput.includes('обожаю')) {
    // Это выражение привязанности, выберем тему
    const loveTopics = ['anime', 'spaghetti', 'cooking', 'garden'].filter(t => availableKeywords.includes(t));
    return loveTopics.length ? loveTopics[Math.floor(Math.random() * loveTopics.length)] : 'default';
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
  
  // Получаем стиль текста для персонажа (например, CAPS для Папируса)
  const textStyle = character === 'papyrus' || character === 'undyne' ? 'uppercase' : '';
  
  // Получаем фоновый цвет для игры
  const bgColor = character === 'chara' ? 'bg-black' : 'bg-black';
  
  // Отображать ли спрайт персонажа
  const showSprite = character === 'papyrus';
  
  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-end p-4 ${bgColor} undertale-game-bg`}>
      {/* Аудио элемент для воспроизведения звуков */}
      <audio ref={audioRef} className="hidden">
        <source src={characterSounds[character]} type="audio/mpeg" />
      </audio>
      
      {/* Фоновые элементы игры */}
      <div className="absolute inset-0 z-0 undertale-pattern"></div>
      
      {/* Спрайт персонажа (по необходимости) */}
      {showSprite && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-10">
          <PapyrusCharacter isAnimating={isTyping} />
        </div>
      )}
      
      <div className="w-full max-w-3xl mb-16 z-10">
        {/* Диалоговое окно */}
        <div className="bg-black border-4 border-white p-6 rounded-xl shadow-lg text-white relative undertale-dialog">
          {/* Имя персонажа */}
          {displayName && !showInput && (
            <div className={`absolute -top-8 left-4 bg-black border-4 border-white px-4 py-2 rounded-xl font-bold pixel-text text-lg ${textColor}`}>
              {displayName}
            </div>
          )}
          
          {/* Текст диалога */}
          <p className={`pixel-text text-xl leading-relaxed min-h-[8rem] letter-spacing-wide ${textColor} ${textStyle}`}>
            {displayedText}
          </p>
          
          {/* Индикатор "далее" - сердце-душа Undertale */}
          {!isTyping && !showInput && (
            <div className="absolute bottom-4 right-6 animate-bounce">
              <div className="w-6 h-6 bg-red-600 transform rotate-45 soul-pixel-shape pulse-animation"></div>
            </div>
          )}
          
          {/* Поле ввода для пользователя */}
          {showInput && (
            <form onSubmit={handleUserSubmit} className="mt-6">
              <div className="flex flex-col">
                <label className="mb-3 pixel-text text-lg">
                  {language === 'ru' ? 'Ваш ответ:' : 'Your response:'}
                </label>
                <Input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="bg-black border-4 border-white text-white pixel-text p-3 text-lg focus:ring-2 focus:ring-white"
                  placeholder={language === 'ru' ? "Напишите что-нибудь..." : "Type something..."}
                />
                <button 
                  type="submit" 
                  className="mt-4 border-4 border-white bg-black text-white pixel-text p-3 hover:bg-gray-900 text-lg transition-colors duration-300"
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
