import VgPurchase from "../models/VgPurchase.ts";
import {Dispatch, SetStateAction} from "react";
import VgPurchaseTable from "./VgPurchaseTable.tsx";

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
    <dialog className={"dialog-modal"} open={openDeleteVgPurchaseModal}>
      <h3>Are you sure you want to delete the following purchase?</h3>
      <VgPurchaseTable purchase={purchase} isReadOnly={true}/>
      <button onClick={() => setOpenDeleteVgPurchaseModal(false)}>Cancel</button>
      <button onClick={deleteVgPurchase}>Delete</button>
    </dialog>
  );
}