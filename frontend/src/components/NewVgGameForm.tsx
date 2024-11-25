import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import VgGame from "../models/VgGame.ts";

/**
 * Interface for the Add New Game form
 */
interface NewVgGameFormProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setVgGame: Dispatch<SetStateAction<VgGame>>;
}

/**
 * Modal dialog for adding new game information to the database
 *
 * @param props
 * @constructor
 */
export default function NewVgGameForm(props: Readonly<NewVgGameFormProps>) {
  const {openDialog, setOpenDialog, setVgGame} = props;
  const defaultForm = {
    name: undefined,
    developer: undefined,
    publisher: undefined,
    releaseDate: undefined,
    description: undefined,
    consoleName: undefined,
  }
  const [form, setForm] = useState(defaultForm);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    fetch("api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(`New game added: \n{\n  id: ${data.id}\n  name: ${data.name}\n  manufacturer: ${data.manufacturer}\n  releaseDate: ${data.releaseDate}\n  description: ${data.description}\n  imageId: ${data.imageId}\n}`)
        setVgGame(data);
      })
      .catch(err => console.log(err))
    setForm(defaultForm)
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
                name={"name"} id={"name"}
                value={form.name}
                onChange={handleChange}
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
                value={form.developer}
                onChange={handleChange}
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
                value={form.publisher}
                onChange={handleChange}
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
                value={form.releaseDate}
                onChange={handleChange}/>
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
                value={form.description}
                onChange={handleChange}/>
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

