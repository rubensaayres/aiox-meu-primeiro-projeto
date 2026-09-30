import React from 'react';

interface WelcomePageProps {
  userName?: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName = 'Visitante' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 transition-all hover:shadow-2xl">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-8">
          <span className="text-4xl">👋</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Bem-vindo ao <span className="text-blue-600">Sistema AIOX!</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
          Olá, <span className="text-blue-500 font-bold">{userName}</span>!
          Estamos felizes em ter você aqui.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-blue-600 font-bold mb-1">🚀 Rápido</div>
            <div className="text-sm text-gray-600">Performance otimizada para sua produtividade.</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="text-green-600 font-bold mb-1">🛡️ Seguro</div>
            <div className="text-sm text-gray-600">Seus dados protegidos com as melhores práticas.</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-purple-600 font-bold mb-1">🧠 Inteligente</div>
            <div className="text-sm text-gray-600">Orquestração de agentes para máxima eficiência.</div>
          </div>
        </div>

        <div className="mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-blue-200">
            Começar agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
