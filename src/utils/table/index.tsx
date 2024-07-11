import { useState } from "react";
import { Equipment } from "../../components/BOP";
import { requestInstance } from "../../services/axiosService";

export const createBadge = ({
  key,
  content,
  color = "primary",
}: {
  key?: number;
  content: string | Equipment;
  color?: string;
}) => {
  const displayContent =
    typeof content === "string" ? content : content.acronimo;
  return (
    <span className={`badge bg-${color}`} key={key}>
      {displayContent}
    </span>
  );
};

export const createTableRows = (data: string[], columnSize: number) => {
  const rows = Math.ceil(data.length / columnSize);
  return Array.from({ length: rows }, (_, i) => (
    <tr key={i}>
      {data
        .slice(i * columnSize, (i + 1) * columnSize)
        .map((content, index) => (
          <td scope="col" key={content}>
            {createBadge({ content })}
          </td>
        ))}
    </tr>
  ));
};

export const getProtectedData = async ({
  status = "CRIADO",
  pageNumber = 1,
  bopId,
  aprovadorId,
}: {
  status?: "APROVADO" | "CRIADO";
  pageNumber?: number;
  bopId?: number;
  aprovadorId?: number;
}) => {
  try {
    const response = await requestInstance.get("api/teste", {
      params: { status, bopId, aprovadorId, pagina: pageNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data", error);
    throw error; // Re-throw the error to handle it further if needed
  }
};
