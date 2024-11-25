import {ReactElement, useState} from "react";
import VgConsole from "../models/VgConsole.ts";
import VgGame from "../models/VgGame.ts";
import NewVgConsoleForm from "./NewVgConsoleForm.tsx";
import SelectConsoleDropdown from "./SelectConsoleDropdown.tsx";

/**
 * Section of the overall Add New Purchase Form to link the purchase with a console.
 *
 * @constructor
 */
function VgConsoleTable(): ReactElement {
  const [openNewVgConsoleDialog, setOpenNewVgConsoleDialog] = useState<boolean>(false);
  const [openSearchVgConsoleDialog, setOpenSearchVgConsoleDialog] = useState<boolean>(false);
  const [vgConsole, setVgConsole] = useState<VgConsole>({
    id: "",
    name: "",
    manufacturer: null,
    releaseDate: null,
    description: null,
    imageId: null
  });

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
      <button onClick={() => {setOpenNewVgConsoleDialog(true)}}>Add Console</button>
      <NewVgConsoleForm openDialog={openNewVgConsoleDialog} setOpenDialog={setOpenNewVgConsoleDialog} setVgConsole={setVgConsole}/>

      {/*Search database for an existing console*/}
      <SelectConsoleDropdown setVgConsole={setVgConsole}/>

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
function VgGameTable(): ReactElement {
  const [openNewVgGameDialog, setOpenNewVgGameDialog] = useState<boolean>(false);
  const [openSearchVgGameDialog, setOpenSearchVgGameDialog] = useState<boolean>(false);
  const [vgGame] = useState<VgGame>({
    id: "",
    name: "",
    developer: null,
    publisher: null,
    releaseDate: null,
    description: null,
    imageId: null,
    consoleId: null
  });

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
      <button>Add Game</button>
      <div>
        <label htmlFor={"game-search"}>Search games: </label>
        <input type={"search"} id={"game-search"} name={"game-search"}/>
      </div>
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

function NewVgPurchaseTable(): ReactElement {
  return (
    <>
      <p>Define purchase:</p>
      <form>
        <table>
          <tbody>
          <tr>
            <th scope={"row"}><label htmlFor='name'>Name: </label></th>
            <td><input type="text" name={"name"} id={"name"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='purchase-date'>Purchase Date: </label></th>
            <td><input type="date" name={"purchase-date"} id={"purchase-date"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='cost-base'>Base Cost: $ </label></th>
            <td><input type="number" name={"cost-base"} id={"cost-base"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='cost-tax'>Tax: $ </label></th>
            <td><input type="number" name={"cost-tax"} id={"cost-tax"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='cost-shipping'>Shipping: $ </label></th>
            <td><input type="number" name={"cost-shipping"} id={"cost-shipping"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='cost-other'>Misc. Fees: $ </label></th>
            <td><input type="number" name={"cost-other"} id={"cost-other"} required={true}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor='notes'>Notes: </label></th>
            <td><textarea name={"notes"} id={"notes"} rows={10}></textarea></td>
          </tr>
          </tbody>
        </table>
      </form>
      <span>
        <button>Add Purchase</button>
      </span>
    </>
  );
}

export default function NewVgPurchaseForm() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
            <VgConsoleTable/>
            <VgGameTable/>
          </div>

          <div id={"purchase-form-add-purchase"} className="purchase-form">
            <NewVgPurchaseTable/>
          </div>
        </span>

      </dialog>
    </>
  );
}