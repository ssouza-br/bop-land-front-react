import { useState, useEffect } from "react";
import DisplayBOPData, { Items } from "../components/DisplayBOPData";
import { requestInstance } from "../services/axiosService";
import CreateBOP from "../components/CreateBOP";
// import "./index.css";

const getProtectedData = async ({
  sonda = "",
  pageNumber = 1,
}: {
  sonda?: string;
  pageNumber?: number;
}) => {
  const uri = sonda
    ? `api/bop?sonda=${sonda}&pagina=${pageNumber}&por_pagina=4`
    : `api/bop?pagina=${pageNumber}&por_pagina=4`;

  try {
    const response = await requestInstance.get(uri);
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data", error);
    throw error; // Re-throw the error to handle it further if needed
  }
};

const BOP = () => {
  const [items, setItems] = useState<Items>({
    data: [],
    pagination: {
      pagina_atual: 0,
      tem_anterior: false,
      tem_proximo: false,
      total_paginas: 0,
      total_registros: 0,
    },
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [sonda, setSonda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDeleteItem = async (id: number) => {
    const data = await getProtectedData({ sonda, pageNumber });
    setItems(data);
  };

  const handleSaveItem = async () => {
    const data = await getProtectedData({ sonda, pageNumber });
    setItems(data);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await getProtectedData({ sonda, pageNumber });
        setItems(data);
      } catch (error) {
        // Handle error as needed
        console.error("Error fetching initial data", error);
      }
    };
    console.log("dados iniciais carregados");

    fetchInitialData();
  }, [pageNumber]); // Empty dependency array ensures this effect runs only once on component mount

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSonda(event.target.value);
  };

  const buscarBOP = async () => {
    setPageNumber(1); // Reset to the first page when searching
    try {
      const data = await getProtectedData({ sonda, pageNumber: 1 });
      setItems(data);
    } catch (error) {
      // Handle error as needed
      console.error("Error fetching filtered data", error);
    }
  };

  const listarBOP = async () => {
    setSonda(""); // Clear the search input when listing all items
    setPageNumber(1); // Reset to the first page when listing all items
    try {
      const data = await getProtectedData({ sonda: "", pageNumber: 1 });
      setItems(data);
    } catch (error) {
      // Handle error as needed
      console.error("Error fetching all data", error);
    }
  };

  const toggleModal = async () => {
    setShowModal(!showModal);
    const data = await getProtectedData({ sonda, pageNumber });
    setItems(data);
  };

  return (
    <>
      <h1>Lista de BOPs</h1>
      <div className="btn-group">
        <input
          type="text"
          id="sonda-busca"
          placeholder="Digite a sonda:"
          value={sonda}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={buscarBOP}
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={listarBOP}
          className="btn btn-outline-secondary"
        >
          Todos
        </button>
        <button
          type="button"
          onClick={toggleModal}
          className="btn btn-outline-secondary"
        >
          Criar BOP
        </button>
      </div>
      <div className="table table-responsive">
        <DisplayBOPData
          items={items}
          onPageChange={handlePageChange}
          onDeleteItem={handleDeleteItem}
        />
      </div>
      {showModal && (
        <CreateBOP onClose={toggleModal} onSaveItem={handleSaveItem} />
      )}
    </>
  );
};

export default BOP;
