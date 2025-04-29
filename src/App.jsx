import React, { useState, useEffect } from "react";
import { Download, Plus, CheckCircle, XCircle } from "lucide-react";

function App() {
  const [equipe, setEquipe] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novo, setNovo] = useState({ nome: "", funcao: "", area: "" });

  useEffect(() => {
    const salvo = localStorage.getItem("equipe");
    if (salvo) setEquipe(JSON.parse(salvo));
  }, []);

  useEffect(() => {
    localStorage.setItem("equipe", JSON.stringify(equipe));
  }, [equipe]);

  const adicionar = () => {
    if (!novo.nome || !novo.funcao || !novo.area) return;
    setEquipe([...equipe, { ...novo, status: "pendente" }]);
    setNovo({ nome: "", funcao: "", area: "" });
    setShowModal(false);
  };

  const atualizarStatus = (index, status) => {
    const nova = [...equipe];
    nova[index].status = status;
    setEquipe(nova);
  };

  const exportarExcel = () => {
    const csv = ["Nome,Função,Área,Status"];
    equipe.forEach((e) => {
      csv.push(`${e.nome},${e.funcao},${e.area},${e.status}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "equipe.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <img src="/logo.png" alt="Taste SP" className="h-12" />
        <h1 className="text-2xl font-bold text-gray-800">
          Gestão Taste Evento 2025
        </h1>
        <button
          onClick={exportarExcel}
          className="bg-white border px-3 py-2 rounded flex items-center gap-2 shadow"
        >
          <Download size={16} /> Exportar Excel
        </button>
      </header>

      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Nova Entrada
        </button>
      </div>

      <table className="w-full bg-white rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Nome</th>
            <th className="p-2">Função</th>
            <th className="p-2">Área</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipe.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{p.nome}</td>
              <td className="p-2">{p.funcao}</td>
              <td className="p-2">{p.area}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    p.status === "presente"
                      ? "bg-green-100 text-green-700"
                      : p.status === "falta"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => atualizarStatus(i, "presente")}
                  className="text-green-600 hover:scale-110"
                >
                  <CheckCircle size={18} />
                </button>
                <button
                  onClick={() => atualizarStatus(i, "falta")}
                  className="text-red-600 hover:scale-110"
                >
                  <XCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">Nova Entrada</h2>
            <input
              placeholder="Nome"
              value={novo.nome}
              onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              placeholder="Função"
              value={novo.funcao}
              onChange={(e) => setNovo({ ...novo, funcao: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              placeholder="Área"
              value={novo.area}
              onChange={(e) => setNovo({ ...novo, area: e.target.value })}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={adicionar}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
