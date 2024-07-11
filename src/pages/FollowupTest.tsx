import { useEffect, useState } from "react";
import RigSelector from "../components/RigSelector";
import WeatherForecast from "../components/WeatherForecast";
import DisplayTestData, { Items } from "../components/DisplayTestData";
import { getProtectedData } from "../utils/table";

const FollowupTest = () => {
  const [bopId, setBopId] = useState<number>();
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
  };

  const fetchInitialData = async () => {
    if (!bopId) return;

    try {
      const data = await getProtectedData({
        status: "CRIADO",
        pageNumber,
        bopId,
      });
      setItems(data);
    } catch (error) {
      // Handle error as needed
      console.error("Error fetching initial data", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [pageNumber, bopId]); // Dependency array ensures this effect runs on pageNumber or bopId change

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const handleApprovedItem = async () => {
    fetchInitialData();
  };

  return (
    <>
      <h1>Acompanhar testes</h1>
      <section>
        <RigSelector onSelectChange={handleSelectChange} />
        {bopId && <WeatherForecast bopId={bopId} />}
      </section>
      <div className="container-fluid">
        {items.data.length != 0 && (
          <div className="table-responsive">
            <DisplayTestData
              items={items}
              onPageChange={handlePageChange}
              onApproveItem={handleApprovedItem}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FollowupTest;
