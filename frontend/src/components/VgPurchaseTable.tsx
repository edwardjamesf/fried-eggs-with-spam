import VgPurchase from "../models/VgPurchase.ts";

interface VgPurchaseTableProps {
  purchase: VgPurchase;
  isReadOnly: boolean;
}
export default function VgPurchaseTable(props: Readonly<VgPurchaseTableProps>) {
  const {purchase, isReadOnly} = props;

  return (
    <table className={"table-data"}>
      <tbody>
      {/*Purchase ID*/}
      <tr>
        <th scope="row">
          <label htmlFor="id">ID:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"text"}
            name={"id"}
            id={"id"}
            defaultValue={purchase.id}
            disabled={true}
          />
        </td>
      </tr>
      {/*Purchase Name*/}
      <tr>
        <th scope="row">
          <label htmlFor="name">Name:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"text"}
            name={"name"}
            id={"name"}
            defaultValue={purchase.name}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Date*/}
      <tr>
        <th scope="row">
          <label htmlFor="purchaseDate">Date:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"date"}
            name={"purchaseDate"}
            id={"purchaseDate"}
            defaultValue={purchase.purchaseDate}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase From*/}
      <tr>
        <th scope="row">
          <label htmlFor="purchaseFrom">From:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"text"}
            name={"purchaseFrom"}
            id={"purchaseFrom"}
            defaultValue={purchase.purchaseFrom}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Cost (Base)*/}
      <tr>
        <th scope="row">
          <label htmlFor="costBase">Base Cost:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"number"}
            step={0.01}
            name={"costBase"}
            id={"costBase"}
            value={purchase.costBase}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Cost (Tax)*/}
      <tr>
        <th scope="row">
          <label htmlFor="costTax">Tax:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"number"}
            step={0.01}
            name={"costTax"}
            id={"costTax"}
            value={purchase.costTax}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Cost (Shipping)*/}
      <tr>
        <th scope="row">
          <label htmlFor="costShipping">Shipping:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"number"}
            step={0.01}
            name={"costShipping"}
            id={"costShipping"}
            value={purchase.costShipping}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Cost (Other)*/}
      <tr>
        <th scope="row">
          <label htmlFor="costOther">Misc. Fees:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"number"}
            step={0.01}
            name={"costOther"}
            id={"costOther"}
            value={purchase.costOther}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      {/*Purchase Cost (Total)*/}
      <tr>
        <th scope="row">
          <label htmlFor="costTotal">Total Cost:</label>
        </th>
        <td>
          <input
            className={"table-data"}
            type={"number"}
            name={"costTotal"}
            id={"costTotal"}
            value={purchase.costTotal}
            disabled={true}
          />
        </td>
      </tr>
      {/*Notes*/}
      <tr>
        <th scope="row">
          <label htmlFor="notes">Notes:</label>
        </th>
        <td>
          <textarea
            className={"table-data"}
            name={"notes"}
            id={"notes"}
            rows={10}
            defaultValue={purchase.notes}
            disabled={isReadOnly}
          />
        </td>
      </tr>
      </tbody>
    </table>
  );
}