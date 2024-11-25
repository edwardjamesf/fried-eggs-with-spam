import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import VgConsole from "../models/VgConsole.ts";

/**
 * Interface for the Add New Console form
 */
interface NewVgConsoleFormProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setVgConsole: Dispatch<SetStateAction<VgConsole>>;
}

/**
 * Modal dialog for adding new console information to the database
 *
 * @param props
 * @constructor
 */
export default function NewVgConsoleForm(props: Readonly<NewVgConsoleFormProps>) {
  const {openDialog, setOpenDialog, setVgConsole} = props;
  const defaultForm = {
    name: undefined,
    manufacturer: undefined,
    releaseDate: undefined,
    description: undefined,
  }
  const [form, setForm] = useState(defaultForm)

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    fetch("api/consoles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(`New console added: \n{\n  id: ${data.id}\n  name: ${data.name}\n  manufacturer: ${data.manufacturer}\n  releaseDate: ${data.releaseDate}\n  description: ${data.description}\n  imageId: ${data.imageId}\n}`)
        setVgConsole(data);
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
              <label htmlFor={"name"}>Manufacturer:</label>
            </th>
            <td>
              <input
                type={"text"}
                name={"manufacturer"}
                id={"manufacturer"}
                value={form.manufacturer}
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