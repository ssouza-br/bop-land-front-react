import { useEffect, useState } from "react";
import RigSelector from "../components/RigSelector";
import WeatherForecast from "../components/WeatherForecast";
import DisplayTestData, { Items } from "../components/DisplayTestData";
import { requestInstance } from "../services/axiosService";

const FollowupTest = () => {
  const [bopId, setBopId] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
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

  const handleSelectChange = (selectedValue: number) => {
    setBopId(selectedValue);
    setPageNumber(1); // Reset to the first page when changing the rig
    console.log("Selected Sonda:", selectedValue); // Do something with the selected value
  };

  // login();

  const getProtectedData = async ({
    status = "em_andamento",
    pageNumber = 1,
    bopId,
  }: {
    status?: "aprovado" | "em_andamento";
    pageNumber?: number;
    bopId: number | null;
  }) => {
    if (bopId === null) return;

    const uri = `api/teste?bopId=${bopId}&status=${status}&pagina=${pageNumber}&por_pagina=4`;

    try {
      const response = await requestInstance.get(uri);
      return response.data;
    } catch (error) {
      console.error("Error fetching protected data", error);
      throw error; // Re-throw the error to handle it further if needed
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (bopId === null) return;

      try {
        console.log(
          "Fetching data for bopId:",
          bopId,
          "pageNumber:",
          pageNumber
        );
        const data = await getProtectedData({
          status: "em_andamento",
          pageNumber,
          bopId,
        });
        setItems(data);
        console.log("Fetched data:", data);
      } catch (error) {
        // Handle error as needed
        console.error("Error fetching initial data", error);
      }
    };

    fetchInitialData();
  }, [pageNumber, bopId]); // Dependency array ensures this effect runs on pageNumber or bopId change

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <h1>Acompanhar testes</h1>
      <section>
        <RigSelector onSelectChange={handleSelectChange} />
        {bopId && <WeatherForecast bopId={bopId} />}
      </section>
      <div className="container-fluid">
        <div id="perfil-content"></div>
        <div className="table-responsive">
          <DisplayTestData items={items} onPageChange={handlePageChange} />
        </div>
        <nav aria-label="Page navigation example">
          <ul
            className="pagination pagination-sm"
            id="page-navegation-teste"
          ></ul>
        </nav>
      </div>
    </>
  );
};

export default FollowupTest;
