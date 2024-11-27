import VgPurchase from "../models/VgPurchase.ts";
import {Dispatch, SetStateAction} from "react";

interface DeleteVgPurchaseFormProps {
  openDeleteVgPurchaseModal: boolean;
  setOpenDeleteVgPurchaseModal: Dispatch<SetStateAction<boolean>>;
  purchase: VgPurchase;
}
export default function DeleteVgPurchaseForm(props: Readonly<DeleteVgPurchaseFormProps>) {
  const{openDeleteVgPurchaseModal, setOpenDeleteVgPurchaseModal, purchase} = props;

  const deleteVgPurchase = () => {
    fetch(`api/purchases/${purchase.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then((data) => {
        console.log(data)
        alert("Purchase deleted");
        setOpenDeleteVgPurchaseModal(false);
      })
  }

  return (
    <dialog open={openDeleteVgPurchaseModal}>
      <h1>Are you sure you want to delete the following purchase?</h1>
      <label htmlFor={"name"}>Name: </label>
      <input
        type={"text"}
        name={"name"}
        disabled={true}
        value={purchase.name}
      />
      <label htmlFor={"notes"}>Notes: </label>
      <textarea
        name={"notes"}
        disabled={true}
        value={purchase.notes}
      />
      <button onClick={() => setOpenDeleteVgPurchaseModal(false)}>Cancel</button>
      <button onClick={deleteVgPurchase}>Delete</button>
    </dialog>
  );
}