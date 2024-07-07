import { Equipment } from "../../components/BOP";

export interface Paginacao {
  pagina_atual: number;
  tem_anterior: boolean;
  tem_proximo: boolean;
  total_paginas: number;
  total_registros: number;
}

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

export const renderPagination = (
  pagination: Paginacao,
  onPageChange: (page: number) => void
) => {
  const { pagina_atual, tem_anterior, tem_proximo, total_paginas } = pagination;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm">
        {tem_anterior && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(pagina_atual - 1)}
            >
              Anterior
            </button>
          </li>
        )}
        {Array.from({ length: total_paginas }, (_, i) => i + 1).map(
          (pagina) => (
            <li
              key={pagina}
              className={`page-item ${pagina === pagina_atual ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(pagina)}
              >
                {pagina}
              </button>
            </li>
          )
        )}
        {tem_proximo && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(pagina_atual + 1)}
            >
              Próximo
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
