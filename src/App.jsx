import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow mb-4">
        <img src="/logo.png" alt="Taste São Paulo" className="h-12" />
        <h1 className="text-xl font-bold text-gray-800">Gestão Taste Evento 2025</h1>
      </header>
      <main className="w-full max-w-5xl bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 text-center">
          Sistema pronto para controle de equipe, presenças e faltas em tempo real.
        </p>
      </main>
    </div>
  );
}

export default App;
