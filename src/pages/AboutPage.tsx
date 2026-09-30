import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Rubens Ayres
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 font-medium">
            Desenvolvedor Full Stack & Especialista em Soluções Digitais
          </p>
        </header>

        {/* About Me Section */}
        <main className="space-y-8 text-lg text-gray-700 leading-relaxed">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <p className="mb-6">
              Olá! Sou o Rubens Ayres, um desenvolvedor apaixonado por transformar ideias complexas em
              soluções digitais eficientes e escaláveis. Com foco em entregar valor real para o negócio,
              combino rigor técnico com uma visão orientada a resultados, garantindo que cada linha de
              código contribua diretamente para o crescimento dos meus clientes.
            </p>

            <p className="mb-6">
              Minha jornada é marcada pela busca constante por excelência técnica e inovação. Especializei-me
              em tecnologias modernas de frontend e backend, permitindo-me arquitetar sistemas completos
              que são não apenas funcionais, mas também performáticos e seguros. Acredito que a tecnologia
              deve ser invisível e a experiência do usuário deve ser intuitiva e fluida.
            </p>

            <p>
              Hoje, foco minha atuação em projetos freelance, onde posso aplicar minha expertise para
              ajudar empreendedores e empresas a escalarem suas operações digitais. Seja construindo um
              MVP do zero ou otimizando sistemas existentes, meu objetivo é entregar software de alta
              qualidade que gere impacto positivo e mensurável no mercado.
            </p>
          </section>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <a
              href="mailto:contato@rubensayres.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-200"
            >
              Vamos trabalhar juntos?
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
