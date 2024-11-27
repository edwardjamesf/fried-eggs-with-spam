import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VgPurchase from "../models/VgPurchase.ts";
import {IconButton} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import UpdateVgPurchaseForm from "./UpdateVgPurchaseForm.tsx";
import DeleteVgPurchaseForm from "./DeleteVgPurchaseForm.tsx";

interface PurchaseTableProps {
  purchases: VgPurchase[];
  setPurchases: Dispatch<SetStateAction<VgPurchase[]>>;
}
export default function PurchasesTable(props: Readonly<PurchaseTableProps>) {
  const {purchases, setPurchases} = props;

  const [openEditPurchaseModal, setOpenEditPurchaseModal] = useState(false);
  const [openDeletePurchaseModal, setOpenDeletePurchaseModal] = useState(false);

  return (
    <>
      <h1>Purchases</h1>
      <table className="purchases-table">
        <thead>
        <tr>
          <th scope={"col"}>Name</th>
          <th scope={"col"}>Edit/Delete</th>
          <th scope={"col"}>Purchase Date</th>
          <th scope={"col"}>Purchase From</th>
          <th scope={"col"}>Notes</th>
          <th scope={"col"}>Cost</th>
          <th scope={"col"}>Cost (Base)</th>
          <th scope={"col"}>Cost (Tax)</th>
          <th scope={"col"}>Cost (Shipping)</th>
          <th scope={"col"}>Cost (Other)</th>
          <th scope={"col"}>Image</th>
          <th scope={"col"}>Console</th>
          <th scope={"col"}>Game</th>
        </tr>
        </thead>
        <tbody>
        {purchases?.map((purchase) => (
          <tr key={purchase.id}>
            <th scope={"row"}>
              {purchase.name}
            </th>
            <td>
              <IconButton onClick={() => setOpenEditPurchaseModal(true)} color={"primary"}>
                <EditIcon/>
              </IconButton>
              <UpdateVgPurchaseForm
                purchase={purchase}
                openEditPurchaseModal={openEditPurchaseModal}
                setOpenEditPurchaseModal={setOpenEditPurchaseModal}
                purchases={purchases}
                setPurchases={setPurchases}
              />
              <IconButton onClick={() => setOpenDeletePurchaseModal(true)} color={"error"}>
                <DeleteIcon/>
              </IconButton>
              <DeleteVgPurchaseForm openDeleteVgPurchaseModal={openDeletePurchaseModal} setOpenDeleteVgPurchaseModal={setOpenDeletePurchaseModal} purchase={purchase}/>
            </td>
            <td>{purchase.purchaseDate}</td>
            <td>{purchase.purchaseFrom}</td>
            <td>{purchase.notes}</td>
            <td>{purchase.costTotal}</td>
            <td>{purchase.costBase}</td>
            <td>{purchase.costTax}</td>
            <td>{purchase.costShipping}</td>
            <td>{purchase.costOther}</td>
            <td>{purchase.imageId}</td>
            <td>{purchase.consoleId}</td>
            <td>{purchase.gameId}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}