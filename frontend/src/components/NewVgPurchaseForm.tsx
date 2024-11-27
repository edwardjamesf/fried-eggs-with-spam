import {ChangeEvent, Dispatch, ReactElement, SetStateAction, SyntheticEvent, useState} from "react";
import VgConsole from "../models/VgConsole.ts";
import VgGame from "../models/VgGame.ts";
import NewVgConsoleForm from "./NewVgConsoleForm.tsx";
import SelectConsoleDropdown from "./SelectConsoleDropdown.tsx";
import SelectGameDropdown from "./SelectGameDropdown.tsx";
import NewVgGameForm from "./NewVgGameForm.tsx";

/**
 * Modal dialog for adding new purchases to the database
 *
 * @constructor
 */
export default function NewVgPurchaseForm() {
  const defaultVgPurchaseForm = {
    name: "",
    purchaseDate: undefined,
    purchaseFrom: undefined,
    costBase: 0.0,
    costTax: 0.0,
    costShipping: 0.0,
    costOther: 0.0,
    notes: undefined,
    imageId: undefined,
    consoleId: undefined,
    gameId: undefined,
  }
  const defaultVgConsole = {
    id: "",
    name: "",
    manufacturer: undefined,
    releaseDate: undefined,
    description: undefined,
    imageId: undefined,
  }
  const defaultVgGame = {
    id: "",
    name: "",
    developer: undefined,
    publisher: undefined,
    releaseDate: undefined,
    description: undefined,
    imageId: undefined,
    consoleId: undefined,
  }

  const [vgPurchaseForm, setVgPurchaseForm] = useState(defaultVgPurchaseForm);

  const [vgConsole, setVgConsole] = useState<VgConsole>(defaultVgConsole);
  const [vgGame, setVgGame] = useState<VgGame>(defaultVgGame);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openNewVgConsoleDialog, setOpenNewVgConsoleDialog] = useState<boolean>(false);
  const [openNewVgGameDialog, setOpenNewVgGameDialog] = useState<boolean>(false);

  const handleChangeVgPurchaseForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVgPurchaseForm({
      ...vgPurchaseForm,
      [event.target.name]: event.target.value,
    });
  }

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()

    fetch("api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vgPurchaseForm)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return undefined
      })
      .then(data => {
        console.log(data)
        alert(`New purchase added: ${JSON.stringify(data)}`);
      })
      .catch(err => console.log(err))
    setVgPurchaseForm(defaultVgPurchaseForm);
  }


  return (
    <>
      <button onClick={() => setOpenDialog(true)}>
        Add New Purchase
      </button>

      <dialog className={"dialog-modal"} open={openDialog} onClose={() => setOpenDialog(false)}>
        <button onClick={() => setOpenDialog(false)}>
          Close
        </button>

        <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div id={"purchase-form-console-game"} className={"purchase-form"}>
            <PurchaseFormVgConsoleTable
              openNewVgConsoleDialog={openNewVgConsoleDialog}
              setOpenNewVgConsoleDialog={setOpenNewVgConsoleDialog}
              vgConsole={vgConsole}
              setVgConsole={setVgConsole}
              vgPurchaseForm={vgPurchaseForm}
              setVgPurchaseForm={setVgPurchaseForm}
            />
            <PurchaseFormVgGameTable
              openNewVgGameDialog={openNewVgGameDialog}
              setOpenNewVgGameDialog={setOpenNewVgGameDialog}
              vgGame={vgGame}
              setVgGame={setVgGame}
              vgPurchaseForm={vgPurchaseForm}
              setVgPurchaseForm={setVgPurchaseForm}
            />
          </div>

          <div id={"purchase-form-add-purchase"} className="purchase-form">
            <p>Define purchase:</p>
            <form onSubmit={submitForm}>
              <table>
                <tbody>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='name'>Name: </label>
                  </th>
                  <td>
                    <input
                      type={"text"}
                      name={"name"}
                      id={"name"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='purchase-date'>Purchase Date: </label>
                  </th>
                  <td>
                    <input
                      type={"date"}
                      name={"purchaseDate"}
                      id={"purchaseDate"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='purchaseFrom'>Purchase From: </label>
                  </th>
                  <td>
                    <input
                      type={"text"}
                      name={"purchaseFrom"}
                      id={"purchaseFrom"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='cost-base'>Base Cost: $ </label>
                  </th>
                  <td>
                    <input
                      type={"number"}
                      name={"costBase"}
                      id={"costBase"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='cost-tax'>Tax: $ </label>
                  </th>
                  <td>
                    <input
                      type={"number"}
                      name={"costTax"}
                      id={"costTax"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='cost-shipping'>Shipping: $ </label>
                  </th>
                  <td>
                    <input
                      type={"number"}
                      name={"costShipping"}
                      id={"costShipping"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='cost-other'>Misc. Fees: $ </label>
                  </th>
                  <td>
                    <input
                      type={"number"}
                      name={"costOther"}
                      id={"costOther"}
                      required={true}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor='notes'>Notes: </label>
                  </th>
                  <td>
                    <textarea
                      name={"notes"}
                      id={"notes"}
                      rows={10}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor={"imageId"}>Image ID: </label>
                  </th>
                  <td>
                    <input
                      type={"text"}
                      name={"imageId"}
                      id={"imageId"}
                      disabled={true}
                      defaultValue={undefined}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor={"consoleId"}>Console ID: </label>
                  </th>
                  <td>
                    <input
                      type={"text"}
                      name={"consoleId"}
                      id={"consoleId"}
                      disabled={true}
                      defaultValue={vgConsole.id}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope={"row"}>
                    <label htmlFor={"gameId"}>Game ID: </label>
                  </th>
                  <td>
                    <input
                      type={"text"}
                      name={"gameId"}
                      id={"gameId"}
                      disabled={true}
                      defaultValue={vgGame.id}
                      onChange={handleChangeVgPurchaseForm}
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </form>
            <span>
              <button type={"submit"} onClick={submitForm}>Add Purchase</button>
            </span>
          </div>
        </span>

      </dialog>
    </>
  );
}

/**
 * Section of the overall Add New Purchase Form to link the purchase with a console.
 *
 * @constructor
 */
interface VgConsoleTableProps {
  openNewVgConsoleDialog: boolean;
  setOpenNewVgConsoleDialog: Dispatch<SetStateAction<boolean>>;
  vgConsole: VgConsole;
  setVgConsole: Dispatch<SetStateAction<VgConsole>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>>;
}
function PurchaseFormVgConsoleTable(props: Readonly<VgConsoleTableProps>): ReactElement {
  const {openNewVgConsoleDialog, setOpenNewVgConsoleDialog, vgConsole, setVgConsole, vgPurchaseForm, setVgPurchaseForm} = props;

  // Overwrite any empty strings or null values with a different placeholder, for better user experiences
  let name = vgConsole["name"]
  let manufacturer = vgConsole["manufacturer"]
  let releaseDate = vgConsole["releaseDate"]
  let description = vgConsole["description"]
  if (name === "") {
    name = "N/A"
  }
  if (manufacturer === null) {
    manufacturer = "N/A"
  }
  if (releaseDate === null) {
    releaseDate = "N/A"
  }
  if (description === null) {
    description = "N/A"
  }

  // Display the console data in the form
  return (
    <>
      <p>Select console:</p>
      {/*Add a new console to the database*/}
      <button onClick={() => {
        setOpenNewVgConsoleDialog(true)
      }}>Add Console
      </button>
      <NewVgConsoleForm
        openDialog={openNewVgConsoleDialog}
        setOpenDialog={setOpenNewVgConsoleDialog}
        setVgConsole={setVgConsole}
        vgPurchaseForm={vgPurchaseForm}
        setVgPurchaseForm={setVgPurchaseForm}
      />

      {/*Search database for an existing console*/}
      <SelectConsoleDropdown
        setVgConsole={setVgConsole}
        vgPurchaseForm={vgPurchaseForm}
        setVgPurchaseForm={setVgPurchaseForm}
      />

      {/*Display the selected console data in the form*/}
      <table className={"console-table"}>
        <tbody>
        <tr>
          <th scope={"row"}>Name:</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th scope={"row"}>Manufacturer:</th>
          <td>{manufacturer}</td>
        </tr>
        <tr>
          <th scope={"row"}>Release Date:</th>
          <td>{releaseDate}</td>
        </tr>
        <tr>
          <th scope={"row"}>Description:</th>
          <td>{description}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
}

/**
 * Section of the overall Add New Purchase Form to link the purchase with a game.
 *
 * @constructor
 */
interface VgGameTableProps {
  openNewVgGameDialog: boolean;
  setOpenNewVgGameDialog: Dispatch<SetStateAction<boolean>>;
  vgGame: VgGame;
  setVgGame: Dispatch<SetStateAction<VgGame>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>>;
}
function PurchaseFormVgGameTable(props: Readonly<VgGameTableProps>): ReactElement {
  const {openNewVgGameDialog, setOpenNewVgGameDialog, vgGame, setVgGame, vgPurchaseForm, setVgPurchaseForm} = props;

  // Overwrite any empty strings or null values with a different placeholder, for better user experiences
  let name = vgGame["name"]
  let developer = vgGame["developer"]
  let publisher = vgGame["publisher"]
  let releaseDate = vgGame["releaseDate"]
  let description = vgGame["description"]
  if (name === "") {
    name = "N/A"
  }
  if (developer === null) {
    developer = "N/A"
  }
  if (publisher === null) {
    publisher = "N/A"
  }
  if (releaseDate === null) {
    releaseDate = "N/A"
  }
  if (description === null) {
    description = "N/A"
  }

  // Display the game data in the form
  return (
    <>
      <p>Select Game:</p>
      <button onClick={() => {
        setOpenNewVgGameDialog(true)
      }}>Add Game
      </button>
      <NewVgGameForm
        openDialog={openNewVgGameDialog}
        setOpenDialog={setOpenNewVgGameDialog}
        setVgGame={setVgGame}
        vgPurchaseForm={vgPurchaseForm}
        setVgPurchaseForm={setVgPurchaseForm}
      />

      <SelectGameDropdown
        setVgGame={setVgGame}
        vgPurchaseForm={vgPurchaseForm}
        setVgPurchaseForm={setVgPurchaseForm}
      />

      <table className={"game-table"}>
        <tbody>
        <tr>
          <th scope={"row"}>Name:</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th scope={"row"}>Developer:</th>
          <td>{developer}</td>
        </tr>
        <tr>
          <th scope={"row"}>Publisher:</th>
          <td>{publisher}</td>
        </tr>
        <tr>
          <th scope={"row"}>Release Date:</th>
          <td>{releaseDate}</td>
        </tr>
        <tr>
          <th scope={"row"}>Description:</th>
          <td>{description}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
}