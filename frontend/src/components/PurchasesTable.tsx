import EditIcon from '@mui/icons-material/Edit';
import VgPurchase from "../models/VgPurchase.ts";
import {IconButton} from "@mui/material";
import {useState} from "react";

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
            <th scope={"row"}><i>ID</i></th>
            <td><input style={{width: "200%"}} type={"text"} defaultValue={purchase.id ?? ''} disabled={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}>Name</th>
            <td>
              <input style={{width: "200%"}} type={"text"} name={"name"} id={"name"} defaultValue={purchase.name}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Purchase Date</th>
            <td>
              <input style={{width: "200%"}} type={"date"} name={"name"} id={"name"}
                     defaultValue={purchase.purchaseDate ?? ''}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Base Cost</th>
            <td>
              <input style={{width: "200%"}} type={"number"} name={"name"} id={"name"}
                     defaultValue={purchase.costBase}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Tax</th>
            <td>
              <input style={{width: "200%"}} type={"number"} name={"name"} id={"name"} defaultValue={purchase.costTax}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Shipping</th>
            <td>
              <input style={{width: "200%"}} type={"number"} name={"name"} id={"name"}
                     defaultValue={purchase.costShipping}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Other Fees</th>
            <td>
              <input style={{width: "200%"}} type={"number"} name={"name"} id={"name"}
                     defaultValue={purchase.costOther}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}><i>Total Cost</i></th>
            <td>
              <input style={{width: "200%"}} type={"number"} defaultValue={purchase.costTotal ?? 0.00} disabled={true}/>
            </td>
          </tr>
          <tr>
            <th scope={"row"}>Notes</th>
            <td>
            <textarea style={{width: "200%"}} name={"notes"} id={"notes"} rows={10}
                      defaultValue={purchase.notes ?? ''}></textarea>
            </td>
          </tr>
          <tr>
            <th scope={"row"}><i>Image ID</i></th>
            <td><input style={{width: "200%"}} type={"text"} name={"imageId"} id={"imageId"}
                       defaultValue={purchase.imageId ?? ''}/></td>
          </tr>
          <tr>
            <th scope={"row"}><i>Console ID</i></th>
            <td><input style={{width: "200%"}} type={"text"} name={"imageId"} id={"imageId"}
                       defaultValue={purchase.consoleId ?? ''}/></td>
          </tr>
          <tr>
            <th scope={"row"}><i>Game ID</i></th>
            <td><input style={{width: "200%"}} type={"text"} name={"imageId"} id={"imageId"}
                       defaultValue={purchase.gameId ?? ''}/></td>
          </tr>
          </tbody>
        </table>
      </form>
      <span>
        <button>Save</button>
        <button onClick={() => setOpenEditPurchaseModal(false)}>Close</button>
      </span>
    </dialog>
  );
}

export default function PurchasesTable(props: { readonly dbPurchases: VgPurchase[] }) {
  const [openEditPurchaseModal, setOpenEditPurchaseModal] = useState(false);
  const {dbPurchases} = props;

  return (
    <>
      <h1>Purchases</h1>
      <table className="purchases-table">
        <thead>
        <tr>
          <th scope={"col"}>Name</th>
          <th scope={"col"}>Purchase Date</th>
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
        {dbPurchases.map((purchase) => (
          <tr key={purchase.id}>
            <th scope={"row"}>
              {purchase.name}
              <IconButton onClick={() => setOpenEditPurchaseModal(true)} color={"primary"}><EditIcon/></IconButton>
              <EditPurchaseModal purchase={purchase} openEditPurchaseModal={openEditPurchaseModal}
                                 setOpenEditPurchaseModal={setOpenEditPurchaseModal}/>
            </th>
            <td>{purchase.purchaseDate}</td>
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