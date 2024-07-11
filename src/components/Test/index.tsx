import React, { useState } from "react";
import "./index.css";
import { Equipment } from "../BOP";
import { createBadge } from "../../utils/table";
import { requestInstance } from "../../services/axiosService";

// Dummy classes for Teste, bopSalvo, and related methods (replace with actual implementations)
class Teste {
  id: number;
  bopId: number;
  nome: string;
  valvulasTestadas: Equipment[] = [];
  preventoresTestados: Equipment[] = [];

  constructor(id: number, bopId: number, nome: string) {
    this.id = id;
    this.bopId = bopId;
    this.nome = nome;
  }

  addValvulaTestada(eqp: Equipment) {
    if (!this.valvulasTestadas.some((v) => v.id === eqp.id)) {
      this.valvulasTestadas.push(eqp);
    }
  }

  addPreventorTestado(eqp: Equipment) {
    if (!this.preventoresTestados.some((p) => p.id === eqp.id)) {
      this.preventoresTestados.push(eqp);
    }
  }
}

interface TestProps {
  bopId: number;
  onAvailableValves: (callback: (valves: Equipment[]) => Equipment[]) => void;
  onAvailablePreventors: (
    callback: (preventors: Equipment[]) => Equipment[]
  ) => void;
}

const Test: React.FC<TestProps> = ({
  bopId,
  onAvailableValves,
  onAvailablePreventors,
}) => {
  const [testeId, setTesteId] = useState(0);
  const [testes, setTestes] = useState<Map<number, Teste>>(new Map());

  const criarTeste = () => {
    setTesteId((prevTesteId) => prevTesteId + 1);
    const novoTeste = new Teste(testeId + 1, bopId, `Teste ${testeId + 1}`);
    setTestes((prevTestes) => new Map(prevTestes).set(novoTeste.id, novoTeste));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropValvula = (
    e: React.DragEvent<HTMLDivElement>,
    testeId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const valvula = JSON.parse(e.dataTransfer.getData("valvula"));
    const teste = testes.get(testeId);

    if (teste && !teste.valvulasTestadas.some((v) => v.id === valvula.id)) {
      onAvailableValves((prev) => prev.filter((v) => v.id !== valvula.id));
      teste.addValvulaTestada(valvula);
      setTestes((prevTestes) => new Map(prevTestes).set(testeId, teste));
    }
  };

  const handleDropPreventor = (
    e: React.DragEvent<HTMLDivElement>,
    testeId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const preventor = JSON.parse(e.dataTransfer.getData("preventor"));
    const teste = testes.get(testeId);

    if (
      teste &&
      !teste.preventoresTestados.some((p) => p.id === preventor.id)
    ) {
      onAvailablePreventors((prev) =>
        prev.filter((p) => p.id !== preventor.id)
      );
      teste.addPreventorTestado(preventor);
      setTestes((prevTestes) => new Map(prevTestes).set(testeId, teste));
    }
  };

  const handleNomeTesteChange = (id: number, value: string) => {
    const teste = testes.get(id);
    if (teste) {
      teste.nome = value;
      setTestes((prevTestes) => new Map(prevTestes).set(id, teste));
    }
  };

  const handleSaveTest = async (id: number) => {
    try {
      const teste = testes.get(id);
      if (!teste) return;

      const { bopId, nome, valvulasTestadas, preventoresTestados } = teste;
      const payload = {
        bopId,
        nome,
        valvulasTestadas: valvulasTestadas.map((v) => v.id),
        preventoresTestados: preventoresTestados.map((p) => p.id),
      };
      const response = await requestInstance.post("api/teste", payload);
      window.alert(`Teste com id ${response.data.testeId} salvo com sucesso`);

      // Remove the saved test from the state
      setTestes((prevTestes) => {
        const newTestes = new Map(prevTestes);
        newTestes.delete(id);
        return newTestes;
      });
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(`Erro: ${error.response.data.message}`);
      } else {
        window.alert("Ocorreu um erro inesperado");
      }
    }
  };

  const handleForgetTest = (id: number) => {
    const teste = testes.get(id);
    if (teste) {
      onAvailableValves((prev) => [...prev, ...teste.valvulasTestadas]);
      onAvailablePreventors((prev) => [...prev, ...teste.preventoresTestados]);
      setTestes((prevTestes) => {
        const newTestes = new Map(prevTestes);
        newTestes.delete(id);
        return newTestes;
      });
    }
  };

  return (
    <div>
      <button onClick={criarTeste}>Criar Teste</button>
      <div className="table-responsive">
        <table id="data-table" className="table">
          <thead>
            <tr>
              <th scope="col">BOP id</th>
              <th scope="col">Nome do teste</th>
              <th scope="col">Válvulas</th>
              <th scope="col">Preventores</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody id="table-body-teste">
            {Array.from(testes.values()).map((teste) => (
              <tr key={teste.id} id={`testeId_${teste.id}`}>
                <td className="col-md-1 align-middle">{teste.bopId}</td>
                <td className="col-md-2 align-middle">
                  <input
                    type="text"
                    id={`nome-teste-${teste.id}`}
                    className="form-control"
                    value={teste.nome}
                    onChange={(e) =>
                      handleNomeTesteChange(teste.id, e.target.value)
                    }
                  />
                </td>
                <td
                  id={`target-valvulas-teste-${teste.id}`}
                  className="col-md-4 tst"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropValvula(e, teste.id)}
                >
                  {teste.valvulasTestadas.map((vlv) =>
                    createBadge({ key: vlv.id, content: vlv.acronimo })
                  )}
                </td>
                <td
                  id={`target-preventores-teste-${teste.id}`}
                  className="col-md-4 tst"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropPreventor(e, teste.id)}
                >
                  {teste.preventoresTestados.map((prv) =>
                    createBadge({ key: prv.id, content: prv.acronimo })
                  )}
                </td>
                <td className="col-md-1 align-middle">
                  <button
                    onClick={() => handleSaveTest(teste.id)}
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleForgetTest(teste.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Forget
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;
