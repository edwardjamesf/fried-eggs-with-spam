import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VgPurchase from "../models/VgPurchase.ts";
import {IconButton} from "@mui/material";
import {useState} from "react";

export default function PurchasesTable(props: { readonly purchases: VgPurchase[] }) {
  const [openEditPurchaseModal, setOpenEditPurchaseModal] = useState(false);
  const {purchases} = props;

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
              <EditPurchaseModal purchase={purchase} openEditPurchaseModal={openEditPurchaseModal}
                                 setOpenEditPurchaseModal={setOpenEditPurchaseModal}/>
              <IconButton onClick={() => {alert("Delete not yet implemented")}} color={"error"}>
                <DeleteIcon/>
              </IconButton>
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
};


function EditPurchaseModal(props: {
  readonly purchase: VgPurchase,
  readonly openEditPurchaseModal: boolean,
  readonly setOpenEditPurchaseModal: (openEditPurchaseModal: boolean) => void
}) {
  const {purchase, openEditPurchaseModal, setOpenEditPurchaseModal} = props;

  return (
    <dialog className="dialog-modal" open={openEditPurchaseModal} style={{width: '20%'}}>
      <form>
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
              />
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      <span>
        <button onClick={() => {
          alert("Edit purchase information not yet implemented")
        }}>Save</button>
        <button onClick={() => setOpenEditPurchaseModal(false)}>Close</button>
      </span>
    </dialog>
  );
}
