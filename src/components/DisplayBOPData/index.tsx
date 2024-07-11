import { requestInstance } from "../../services/axiosService";
import { createTableRows } from "../../utils/table";
import { BOPData } from "../BOP";
import Pagination, { Paginacao } from "../Pagination";

export interface Items {
  data: BOPData[];
  pagination: Paginacao;
}

interface Prop {
  items: Items;
  onPageChange: (pageNumber: number) => void;
  onDeleteItem: (id: number) => void;
}

const DisplayBOPData = ({ items, onPageChange, onDeleteItem }: Prop) => {
  const { data, pagination } = items;

  const handleDeleteBOP = async (id: number) => {
    try {
      const response = await requestInstance.delete(`api/bop/${id}`);
      window.alert(`BOP com id ${id} deletado com sucesso`);
      onDeleteItem(id);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(`Erro: ${error.response.data.message}`);
      } else {
        window.alert("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <>
      <table className="table bg-danger mt-3">
        <thead>
          <tr>
            <th scope="col">Sonda</th>
            <th scope="col">Válvulas</th>
            <th scope="col">Preventores</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.bop_id} id={item.bop_id.toString()}>
              <td>{item.sonda}</td>
              <td>
                <table>
                  <tbody>{createTableRows(item.valvulas, 5)}</tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>{createTableRows(item.preventores, 5)}</tbody>
                </table>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteBOP(item.bop_id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default DisplayBOPData;
