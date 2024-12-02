import PurchaseModel from "../models/PurchaseModel.ts";
import {ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState} from "react";

interface UpdateVgPurchaseFormProps {
  purchase: PurchaseModel,
  openEditPurchaseModal: boolean,
  setOpenEditPurchaseModal: (openEditPurchaseModal: boolean) => void
  purchases: PurchaseModel[];
  setPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
}
export default function UpdateVgPurchaseFormOld(props: Readonly<UpdateVgPurchaseFormProps>) {
  const {purchase, openEditPurchaseModal, setOpenEditPurchaseModal, purchases, setPurchases} = props;

  const defaultUpdateVgPurchaseForm = {
    name: purchase.name,
    purchaseDate: purchase.purchaseDate,
    purchaseFrom: purchase.purchaseFrom,
    costBase: purchase.costBase,
    costTax: purchase.costTax,
    costShipping: purchase.costShipping,
    costOther: purchase.costOther,
    notes: purchase.notes,
    imageId: purchase.imageId,
    consoleId: purchase.consoleId,
    gameId: purchase.gameId,
  }

  const [updateVgPurchaseForm, setUpdateVgPurchaseForm] = useState(defaultUpdateVgPurchaseForm);

  const handleChangeVgPurchaseForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdateVgPurchaseForm({
      ...defaultUpdateVgPurchaseForm,
      [event.target.name]: event.target.value,
    })
  }

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault();

    fetch(`api/purchases/${purchase.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateVgPurchaseForm),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then(data => {
        console.log(data);
        setPurchases({...purchases, ...data});
        setOpenEditPurchaseModal(false);
      })
      .catch((error) => {console.log(error)})
  }
  return (
    <dialog className="dialog-modal" open={openEditPurchaseModal} style={{width: '20%'}}>
      <form onSubmit={submitForm}>
        <table>
          <tbody>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"id"}>ID</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"id"}
                id={"id"}
                defaultValue={purchase.id ?? ''}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Name</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.name}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Purchase Date</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"date"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.purchaseDate ?? ''}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Purchase From</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"purchaseFrom"}
                id={"purchaseFrom"}
                defaultValue={purchase.purchaseFrom}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Base Cost</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"number"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.costBase}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Tax</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"number"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.costTax}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Shipping</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"number"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.costShipping}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Other Fees</th>
            <td>
              <input
                style={{width: "200%"}}
                type={"number"}
                name={"name"}
                id={"name"}
                defaultValue={purchase.costOther}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"costTotal"}>Total Cost</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"number"}
                name={"costTotal"}
                id={"costTotal"}
                defaultValue={purchase.costTotal ?? 0.00}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"notes"}>Notes</label>
            </th>
            <td>
              <textarea
                style={{width: "200%"}}
                name={"notes"}
                id={"notes"}
                rows={10}
                defaultValue={purchase.notes ?? ''}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"imageId"}>Image ID</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"imageId"}
                id={"imageId"}
                defaultValue={purchase.imageId ?? ''}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"consoleId"}>Console ID</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"consoleId"}
                id={"consoleId"}
                defaultValue={purchase.consoleId ?? ''}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"gameId"}>Game ID</label>
            </th>
            <td>
              <input
                style={{width: "200%"}}
                type={"text"}
                name={"gameId"}
                id={"gameId"}
                defaultValue={purchase.gameId ?? ''}
                onChange={handleChangeVgPurchaseForm}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      <span>
        <button onClick={submitForm}>Save</button>
        <button onClick={() => setOpenEditPurchaseModal(false)}>Close</button>
      </span>
    </dialog>
  );
}
