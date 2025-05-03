
import UndertaleDialog from '@/components/UndertaleDialog';

const papyrusMessages = [
  "ПРИВЕТСТВУЮ, ЧЕЛОВЕК! Я ВЕЛИКИЙ ПАПИРУС!",
  "NYEH HEH HEH! КАКАЯ ПРЕКРАСНАЯ ВСТРЕЧА!",
  "ТЫ ВЫГЛЯДИШЬ ТАК, БУДТО ХОЧЕШЬ ПОГОВОРИТЬ С КУЛИНАРНЫМ ГЕНИЕМ!",
  "ЗНАЕШЬ ЛИ ТЫ, ЧТО Я ЭКСПЕРТ В ПРИГОТОВЛЕНИИ СПАГЕТТИ?",
  "МОИ КУЛИНАРНЫЕ СПОСОБНОСТИ ДАЖЕ ЗАСТАВЛЯЮТ АНДАЙН ПОТЕТЬ ОТ ЗАВИСТИ!",
  "ХМММ, ТЫ НЕ ОЧЕНЬ РАЗГОВОРЧИВ, НЕ ТАК ЛИ?",
  "МОЖЕТ БЫТЬ, ТЫ ХОЧЕШЬ СКАЗАТЬ ЧТО-ТО ВЕЛИКОМУ ПАПИРУСУ?"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <UndertaleDialog initialMessages={papyrusMessages} characterName="PAPYRUS" />
    </div>
  );
};

export default Index;
