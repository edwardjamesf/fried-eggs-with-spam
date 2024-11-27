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

  const [purchase, setPurchase] = useState<VgPurchase>(purchases[0]);
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
        {purchases?.map((item) => (
          <tr key={item.id}>
            <th scope={"row"}>
              {item.name}
            </th>
            <td>
              <IconButton onClick={() => {setPurchase(item); setOpenEditPurchaseModal(true)}} color={"primary"}>
                <EditIcon/>
              </IconButton>
              <IconButton onClick={() => {setPurchase(item); setOpenDeletePurchaseModal(true)}} color={"error"}>
                <DeleteIcon/>
              </IconButton>
            </td>
            <td>{item.purchaseDate}</td>
            <td>{item.purchaseFrom}</td>
            <td>{item.notes}</td>
            <td>{item.costTotal}</td>
            <td>{item.costBase}</td>
            <td>{item.costTax}</td>
            <td>{item.costShipping}</td>
            <td>{item.costOther}</td>
            <td>{item.imageId}</td>
            <td>{item.consoleId}</td>
            <td>{item.gameId}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <UpdateVgPurchaseForm
        purchase={purchase}
        openEditPurchaseModal={openEditPurchaseModal}
        setOpenEditPurchaseModal={setOpenEditPurchaseModal}
        purchases={purchases}
        setPurchases={setPurchases}
      />

      <DeleteVgPurchaseForm
        openDeleteVgPurchaseModal={openDeletePurchaseModal}
        setOpenDeleteVgPurchaseModal={setOpenDeletePurchaseModal}
        purchase={purchase}
      />
    </>
  );
}