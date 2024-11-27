import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import VgGame from "../models/VgGame.ts";

/**
 * Modal dialog for adding new game information to the database
 *
 * @param props
 * @constructor
 */
interface NewVgGameFormProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setVgGame: Dispatch<SetStateAction<VgGame>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>> | undefined;
}
export default function NewVgGameForm(props: Readonly<NewVgGameFormProps>) {
  const {openDialog, setOpenDialog, setVgGame, vgPurchaseForm, setVgPurchaseForm} = props;

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
  const [vgGameForm, setVgGameForm] = useState(defaultVgGame);

  const handleChangeVgGameForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVgGameForm({
      ...vgGameForm,
      [event.target.name]: event.target.value,
    });
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    fetch("api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vgGameForm)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then(data => {
        console.log(data)
        alert(`New game added: ${JSON.stringify(data)}`);
        setVgGame(data);
        if (vgPurchaseForm !== undefined && setVgPurchaseForm !== undefined) {
          vgPurchaseForm.gameId = data.id;
          setVgPurchaseForm(vgPurchaseForm);
        }
      })
      .catch(err => console.log(err))
    setVgGameForm(defaultVgGame);
    setOpenDialog(false)
  }

  return (
    <dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <form onSubmit={submitForm}>
        <table className={"console-table"}>
          <tbody>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Name:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"name"}
                id={"name"}
                defaultValue={vgGameForm.name}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Developer:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"developer"}
                id={"developer"}
                defaultValue={vgGameForm.developer}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Publisher:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"publisher"}
                id={"publisher"}
                defaultValue={vgGameForm.publisher}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Release Date:</label>
            </th>
            <td>
              <input
                type={"date"}
                name={"releaseDate"}
                id={"releaseDate"}
                defaultValue={vgGameForm.releaseDate}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"name"}>Description:</label>
            </th>
            <td>
              <textarea
                name={"description"}
                id={"description"}
                rows={10}
                defaultValue={vgGameForm.description}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"imageId"}>Image ID:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"imageId"}
                id={"imageId"}
                defaultValue={vgGameForm.imageId}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          <tr>
            <th scope={"row"}>
              <label htmlFor={"consoleId"}>Console ID:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"consoleId"}
                id={"consoleId"}
                defaultValue={vgGameForm.consoleId}
                onChange={handleChangeVgGameForm}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      <button onClick={() => {
        setOpenDialog(false)
      }}>Cancel
      </button>
      <button type={"submit"} onClick={submitForm}>Save</button>
    </dialog>
  );
}

