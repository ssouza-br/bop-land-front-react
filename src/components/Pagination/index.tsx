import React from "react";

export interface Paginacao {
  pagina_atual: number;
  tem_anterior: boolean;
  tem_proximo: boolean;
  total_paginas: number;
  total_registros: number;
}

interface PaginationProps {
  pagination: Paginacao;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
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

export default Pagination;
