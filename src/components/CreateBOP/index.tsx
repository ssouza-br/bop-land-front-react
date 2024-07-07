import { SetStateAction, useEffect, useState } from "react";
import { requestInstance } from "../../services/axiosService";
import "./index.css";
import { createBadge } from "../../utils/table";
import { Equipment } from "../BOP";

interface Prop {
  onClose: () => void;
  onSaveItem: () => void;
}

const CreateBOP = ({ onClose, onSaveItem }: Prop) => {
  const [sonda, setSonda] = useState("");
  const [valvulas, setValvulas] = useState<Equipment[]>([]);
  const [preventores, setPreventores] = useState<Equipment[]>([]);
  const [selectedValvulas, setSelectedValvulas] = useState<Equipment[]>([]);
  const [selectedPreventores, setSelectedPreventores] = useState<Equipment[]>(
    []
  );

  useEffect(() => {
    const fetchValvulas = async () => {
      try {
        const response = await requestInstance.get("valvula/all");
        setValvulas(response.data);
      } catch (error) {
        console.error("Error fetching valvulas", error);
      }
    };

    const fetchPreventores = async () => {
      try {
        const response = await requestInstance.get("preventor/all");
        setPreventores(response.data);
      } catch (error) {
        console.error("Error fetching preventores", error);
      }
    };

    fetchValvulas();
    fetchPreventores();
  }, []);

  const handleSondaChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSonda(e.target.value);
  };

  const handleSaveBOP = async () => {
    const payload = {
      sonda,
      valvulas: selectedValvulas,
      preventores: selectedPreventores,
    };

    try {
      const response = await requestInstance.post("api/bop", payload);
      window.alert("BOP salvo com sucesso");
      // Clear form after save
      setSonda("");
      setSelectedValvulas([]);
      setSelectedPreventores([]);
      onClose();
      onSaveItem();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(`Erro: ${error.response.data.message}`);
      } else {
        console.log({ error });
        window.alert("Ocorreu um erro inesperado");
      }
    }
  };

  const handleDragStartValvula = (
    e: React.DragEvent<HTMLDivElement>,
    valvula: Equipment
  ) => {
    e.dataTransfer.setData("valvula", JSON.stringify(valvula));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropValvula = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const valvula = JSON.parse(e.dataTransfer.getData("valvula"));
    setSelectedValvulas((prev) => [...prev, valvula]);
    setValvulas((prev) => prev.filter((v) => v !== valvula));
  };

  const handleDragStartPreventor = (
    e: React.DragEvent<HTMLDivElement>,
    preventor: Equipment
  ) => {
    e.dataTransfer.setData("preventor", JSON.stringify(preventor));
  };

  const handleDropPreventor = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const preventor = JSON.parse(e.dataTransfer.getData("preventor"));
    setSelectedPreventores((prev) => [...prev, preventor]);
    setPreventores((prev) => prev.filter((p) => p !== preventor));
  };

  return (
    <>
      <div className="overlay"></div>
      <div
        className="offcanvas offcanvas-end show"
        tabIndex={-1}
        id="cadastrarBOPSideBar"
        aria-labelledby="cadastrarBOPSideBarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cadastrarBOPSideBarLabel">
            Criar BOP
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          <input
            className="mb-3"
            type="text"
            id="sonda-cadastro"
            placeholder="Digite a sonda:"
            value={sonda}
            onChange={handleSondaChange}
          />
          <div className="row gy-4">
            <div className="col-6">
              <div className="card">
                <div className="card-header">Válvulas disponíveis</div>
                <div id="source-valvulas" className="card-body">
                  {valvulas.map((valvula, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStartValvula(e, valvula)}
                    >
                      {createBadge({
                        content: valvula,
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
                  {preventores.map((preventor, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) =>
                        handleDragStartPreventor(e, preventor)
                      }
                    >
                      {createBadge({
                        content: preventor,
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-header">Válvulas selecionadas</div>
                <div
                  id="target-valvulas"
                  className="card-body"
                  onDragOver={handleDragOver}
                  onDrop={handleDropValvula}
                >
                  {selectedValvulas.map((valvula, index) => (
                    <div key={index}>
                      {createBadge({ content: valvula, color: "secondary" })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-header">Preventores selecionados</div>
                <div
                  id="target-preventores"
                  className="card-body"
                  onDragOver={handleDragOver}
                  onDrop={handleDropPreventor}
                >
                  {selectedPreventores.map((preventor, index) => (
                    <div key={index}>
                      {createBadge({ content: preventor, color: "secondary" })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleSaveBOP}
              className="mt-3"
              data-bs-dismiss="offcanvas"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBOP;
