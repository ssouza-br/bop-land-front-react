import { useState, useEffect } from "react";
import RigSelector from "../components/RigSelector";
import { createBadge } from "../utils/table";
import { requestInstance } from "../services/axiosService";
import { Equipment } from "../components/BOP";
import Test from "../components/Test";
import Sidebar from "../components/Sidebar";

const CreateTest = () => {
  const [bopId, setBopId] = useState<number | null>(null);
  const [valvulas, setValvulas] = useState<Equipment[]>([]);
  const [preventores, setPreventores] = useState<Equipment[]>([]);

  useEffect(() => {
    if (bopId !== null) {
      const fetchValvulas = async () => {
        try {
          const response = await requestInstance.get(`api/bop/${bopId}/valves`);
          setValvulas(response.data);
        } catch (error) {
          console.error("Error fetching valvulas", error);
        }
      };

      const fetchPreventores = async () => {
        try {
          const response = await requestInstance.get(
            `api/bop/${bopId}/preventors`
          );
          setPreventores(response.data);
        } catch (error) {
          console.error("Error fetching preventores", error);
        }
      };

      fetchValvulas();
      fetchPreventores();
    }
  }, [bopId]);

  const handleSelectChange = (selectedValue: number) => {
    setBopId(selectedValue);
  };

  const handleDragStartValvula = (
    e: React.DragEvent<HTMLDivElement>,
    valvula: Equipment
  ) => {
    e.dataTransfer.setData("valvula", JSON.stringify(valvula));
  };

  const handleDragStartPreventor = (
    e: React.DragEvent<HTMLDivElement>,
    preventor: Equipment
  ) => {
    e.dataTransfer.setData("preventor", JSON.stringify(preventor));
  };

  return (
    <>
      <h1>Criar testes</h1>
      <section>
        <RigSelector onSelectChange={handleSelectChange} />
        {bopId && (
          <div className="row gy-4">
            <div className="col-6">
              <div className="card">
                <div className="card-header">Válvulas disponíveis</div>
                <div id="source-valvulas" className="card-body">
                  {valvulas.map((valvula) => (
                    <div
                      key={valvula.id}
                      draggable
                      onDragStart={(e) => handleDragStartValvula(e, valvula)}
                    >
                      {createBadge({
                        content: valvula.acronimo,
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-header">Preventores disponíveis</div>
                <div id="source-preventores" className="card-body">
                  {preventores.map((preventor) => (
                    <div
                      key={preventor.id}
                      draggable
                      onDragStart={(e) =>
                        handleDragStartPreventor(e, preventor)
                      }
                    >
                      {createBadge({
                        content: preventor.acronimo,
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Test
              bopId={bopId}
              onAvailableValves={setValvulas}
              onAvailablePreventors={setPreventores}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default CreateTest;
