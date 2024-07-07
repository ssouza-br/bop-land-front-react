import {
  Paginacao,
  createTableRows,
  renderPagination,
} from "../../utils/table";

export interface Items {
  data: TestData[];
  pagination: Paginacao;
}

export interface TestData {
  testId: number;
  rig: string;
  testName: string;
  valves: string[];
  preventors: string[];
}

interface Prop {
  items: Items;
  onPageChange: (pageNumber: number) => void;
}

const DisplayTestData = ({ items, onPageChange }: Prop) => {
  const { data, pagination } = items;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sonda</th>
            <th scope="col">Nome do teste</th>
            <th scope="col">Válvulas</th>
            <th scope="col">Preventores</th>
            <th scope="col">Aprovar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.testId}>
              <td>{item.bopId}</td>
              <td>{item.nome}</td>
              <td>
                <table>
                  <tbody>{createTableRows(item.valvulasTestadas, 5)}</tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>{createTableRows(item.preventoresTestados, 5)}</tbody>
                </table>
              </td>
              <td>
                <button
                  onClick={() => console.log(item.testId)}
                  className="btn btn-success btn-sm"
                >
                  Aprovar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination(pagination, onPageChange)}
    </>
  );
};

export default DisplayTestData;
