
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CharacterSelectorProps {
  onSelectCharacter: (character: string) => void;
  currentCharacter: string;
  onSelectLanguage: (language: string) => void;
  currentLanguage: string;
}

type CharacterInfo = {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description: string;
}

const characters: CharacterInfo[] = [
  { 
    id: 'papyrus', 
    name: 'Папирус', 
    color: 'text-orange-500 border-orange-500',
    icon: '🦴', 
    description: 'ВЕЛИКИЙ СКЕЛЕТ! ЛЮБИТ СПАГЕТТИ И ГОЛОВОЛОМКИ!'
  },
  { 
    id: 'sans', 
    name: 'Санс', 
    color: 'text-blue-400 border-blue-400',
    icon: '☠️', 
    description: 'хорошо шутит. ленивый. любит кетчуп.'
  },
  { 
    id: 'undyne', 
    name: 'Андайн', 
    color: 'text-cyan-500 border-cyan-500',
    icon: '🐟', 
    description: 'КАПИТАН КОРОЛЕВСКОЙ СТРАЖИ! СТРАСТНАЯ И СИЛЬНАЯ!'
  },
  { 
    id: 'asgore', 
    name: 'Король Азгор', 
    color: 'text-red-600 border-red-600',
    icon: '👑', 
    description: 'Король подземелья. Добрый, но с тяжелой ношей.'
  },
  { 
    id: 'chara', 
    name: 'Чара', 
    color: 'text-red-700 border-red-700',
    icon: '🔪', 
    description: 'Первый упавший человек. Загадочная сущность.'
  },
];

const languages = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'ru', name: 'Русский', flag: '🇷🇺' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'ja', name: '日本語', flag: '🇯🇵' },
  { id: 'ko', name: '한국어', flag: '🇰🇷' },
  { id: 'zh', name: '中文', flag: '🇨🇳' },
  { id: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const CharacterSelector = ({ 
  onSelectCharacter, 
  currentCharacter,
  onSelectLanguage,
  currentLanguage
}: CharacterSelectorProps) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Находим текущего персонажа
  const currentCharInfo = characters.find(char => char.id === currentCharacter) || characters[0];
  
  return (
    <div className="fixed top-4 right-4 character-selector z-20">
      <h3 className="pixel-text text-sm mb-3 text-center">* Выберите персонажа *</h3>
      
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {characters.map((character) => (
          <div key={character.id} className="relative">
            <Button
              variant={currentCharacter === character.id ? "default" : "outline"}
              className={`pixel-text text-xs py-2 px-3 h-auto ${character.color} ${
                currentCharacter === character.id ? 'border-2 shadow-glow' : 'border'
              }`}
              onClick={() => onSelectCharacter(character.id)}
              onMouseEnter={() => setShowTooltip(character.id)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              {character.icon && <span className="mr-1">{character.icon}</span>}
              {character.name}
            </Button>
            
            {/* Всплывающая подсказка при наведении */}
            {showTooltip === character.id && (
              <div className="absolute -bottom-16 left-0 w-48 bg-black border-2 border-white p-2 rounded-md z-30 pixel-text text-xs whitespace-normal">
                {character.description}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Информация о текущем персонаже */}
      <div className="mb-4 p-2 border-2 border-white rounded-md">
        <h4 className={`text-center text-xs mb-1 pixel-text ${currentCharInfo.color.split(' ')[0]}`}>
          {currentCharInfo.icon} {currentCharInfo.name}
        </h4>
        <p className="text-xs pixel-text text-center opacity-80">
          {currentCharInfo.description}
        </p>
      </div>
      
      <div className="mt-4">
        <h3 className="pixel-text text-xs mb-2 text-center">* Выберите язык *</h3>
        <Select onValueChange={onSelectLanguage} value={currentLanguage}>
          <SelectTrigger className="w-full bg-black border-2 border-white text-white pixel-text text-xs">
            <SelectValue placeholder="Выберите язык" />
          </SelectTrigger>
          <SelectContent className="bg-black border-2 border-white text-white">
            {languages.map((language) => (
              <SelectItem key={language.id} value={language.id} className="pixel-text text-xs">
                <span className="mr-2">{language.flag}</span> {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Украшения в стиле Undertale */}
      <div className="mt-4 flex justify-center">
        <div className="w-6 h-6 transform rotate-45 soul-red mr-2"></div>
        <div className="w-6 h-6 transform rotate-45 soul-blue mr-2"></div>
        <div className="w-6 h-6 transform rotate-45 soul-orange mr-2"></div>
        <div className="w-6 h-6 transform rotate-45 soul-green mr-2"></div>
        <div className="w-6 h-6 transform rotate-45 soul-purple"></div>
      </div>
    </div>
  );
};

export default CharacterSelector;
