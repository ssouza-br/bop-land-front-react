import { requestInstance } from "../../services/axiosService";
import { createTableRows } from "../../utils/table";
import Pagination, { Paginacao } from "../Pagination";

export interface Items {
  data: TestData[];
  pagination: Paginacao;
}

export interface TestData {
  testeId: number;
  bopId: number;
  nome: string;
  valvulasTestadas: string[];
  preventoresTestados: string[];
  dataAprovacao: string;
}

interface Prop {
  items: Items;
  onPageChange: (page: number) => void;
  onApproveItem?: () => void;
}

const DisplayTestData = ({ items, onPageChange, onApproveItem }: Prop) => {
  const { data, pagination } = items;

  const handleTestApprove = async (testeId: number) => {
    try {
      const response = await requestInstance.put(
        `api/teste/${testeId}/aprovar`
      );
      if (onApproveItem) onApproveItem();
    } catch (error) {
      console.error("Erro ao aprovar o teste", error);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sonda</th>
            <th scope="col">Nome do teste</th>
            <th scope="col">Válvulas</th>
            <th scope="col">Preventores</th>
            {onApproveItem && <th scope="col">Aprovar</th>}
            {!onApproveItem && <th scope="col">Data de aprovação</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              testeId,
              bopId,
              nome,
              valvulasTestadas,
              preventoresTestados,
              dataAprovacao,
            }) => (
              <tr key={testeId}>
                <td>{bopId}</td>
                <td>{nome}</td>
                <td>
                  <table>
                    <tbody>{createTableRows(valvulasTestadas, 5)}</tbody>
                  </table>
                </td>
                <td>
                  <table>
                    <tbody>{createTableRows(preventoresTestados, 5)}</tbody>
                  </table>
                </td>
                {!onApproveItem && <td>{dataAprovacao}</td>}
                {onApproveItem && (
                  <td>
                    <button
                      onClick={() => handleTestApprove(testeId)}
                      className="btn btn-success btn-sm"
                    >
                      Aprovar
                    </button>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
      {pagination && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default DisplayTestData;
