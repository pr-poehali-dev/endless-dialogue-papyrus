
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
}

const characters: CharacterInfo[] = [
  { id: 'papyrus', name: 'Папирус', color: 'text-orange-500' },
  { id: 'sans', name: 'Санс', color: 'text-blue-400' },
  { id: 'undyne', name: 'Андайн', color: 'text-cyan-500' },
  { id: 'asgore', name: 'Король Азгор', color: 'text-red-600' },
  { id: 'chara', name: 'Чара', color: 'text-red-700' },
];

const languages = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Русский' },
  { id: 'fr', name: 'Français' },
  { id: 'de', name: 'Deutsch' },
  { id: 'es', name: 'Español' },
  { id: 'it', name: 'Italiano' },
  { id: 'ja', name: '日本語' },
  { id: 'ko', name: '한국어' },
  { id: 'zh', name: '中文' },
  { id: 'ar', name: 'العربية' },
];

const CharacterSelector = ({ 
  onSelectCharacter, 
  currentCharacter,
  onSelectLanguage,
  currentLanguage
}: CharacterSelectorProps) => {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 p-4 bg-black border-2 border-white rounded-md z-20">
      <h3 className="pixel-text text-sm mb-2">Выберите персонажа:</h3>
      <div className="flex flex-wrap gap-2">
        {characters.map((character) => (
          <Button
            key={character.id}
            variant={currentCharacter === character.id ? "default" : "outline"}
            className={`pixel-text text-xs py-1 px-2 h-auto ${character.color} ${currentCharacter === character.id ? 'border-2' : ''}`}
            onClick={() => onSelectCharacter(character.id)}
          >
            {character.name}
          </Button>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="pixel-text text-sm mb-2">Язык:</h3>
        <Select onValueChange={onSelectLanguage} value={currentLanguage}>
          <SelectTrigger className="w-full bg-black border-white text-white pixel-text">
            <SelectValue placeholder="Выберите язык" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white text-white">
            {languages.map((language) => (
              <SelectItem key={language.id} value={language.id} className="pixel-text">
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CharacterSelector;
