import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DisplayTestData, { Items } from "../components/DisplayTestData";
import { getProtectedData } from "../utils/table";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
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

  const navigate = useNavigate(); // Initialize useNavigate

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await getProtectedData({
          pageNumber: page,
          status: "APROVADO",
          aprovadorId: user.id,
        });
        setItems(data);
        console.log("Fetched data:", data);
      } catch (error) {
        // Handle error as needed
        console.error("Error fetching initial data", error);
      }
    };

    fetchInitialData();
  }, [page]); // Dependency array ensures this effect runs on page or bopId change

  return (
    <div>
      <h1 className="mb-5">Bem vindo ao BOP Land , {user.nome}!!!</h1>

      {items.data.length != 0 && (
        <>
          <h3>Esses são os seus testes aprovados</h3>
          <div className="table-responsive mt-3">
            <DisplayTestData items={items} onPageChange={setPage} />
          </div>
        </>
      )}
      {items.data.length == 0 && (
        <>
          <p
            onClick={() => navigate("/create-test")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Crie testes clicando aqui!
          </p>
          <p
            onClick={() => navigate("/followup-test")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Ou aprove os testes clicando aqui!!
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
