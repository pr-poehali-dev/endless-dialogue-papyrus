
import PapyrusCharacter from '@/components/PapyrusCharacter';

const Index = () => {
  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center">
      <div className="fixed top-10 text-center z-0">
        <h1 className="text-4xl font-bold mb-4 text-white">Диалог в стиле Undertale</h1>
        <p className="text-xl text-purple-200">Нажмите в любом месте экрана, чтобы продолжить диалог</p>
      </div>
      
      {/* Компонент Папируса с диалоговым окном */}
      <PapyrusCharacter />
    </div>
  );
};

export default Index;
