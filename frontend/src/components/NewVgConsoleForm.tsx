import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import VgConsole from "../models/VgConsole.ts";

/**
 * Modal dialog for adding new console information to the database
 *
 * @param props
 * @constructor
 */
interface NewVgConsoleFormProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setVgConsole: Dispatch<SetStateAction<VgConsole>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>> | undefined;
}
export default function NewVgConsoleForm(props: Readonly<NewVgConsoleFormProps>) {
  const {openDialog, setOpenDialog, setVgConsole, vgPurchaseForm, setVgPurchaseForm} = props;

  const defaultVgConsole = {
    id: "",
    name: "",
    manufacturer: undefined,
    releaseDate: undefined,
    description: undefined,
    imageId: undefined,
  }
  const [vgConsoleForm, setVgConsoleForm] = useState(defaultVgConsole);

  const handleChangeVgConsoleForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVgConsoleForm({
      ...vgConsoleForm,
      [event.target.name]: event.target.value,
    });
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    fetch("api/consoles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vgConsoleForm)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then(data => {
        console.log(data)
        alert(`New console added: ${JSON.stringify(data)}`)
        setVgConsole(data);
        if (vgPurchaseForm !== undefined && setVgPurchaseForm !== undefined) {
          vgPurchaseForm.consoleId = data.id;
          setVgPurchaseForm(vgPurchaseForm);
        }
      })
      .catch(err => console.log(err))
    setVgConsoleForm(defaultVgConsole);
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
                defaultValue={vgConsoleForm.name}
                onChange={handleChangeVgConsoleForm}
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
                defaultValue={vgConsoleForm.manufacturer}
                onChange={handleChangeVgConsoleForm}
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
                defaultValue={vgConsoleForm.releaseDate}
                onChange={handleChangeVgConsoleForm}
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
                defaultValue={vgConsoleForm.description}
                onChange={handleChangeVgConsoleForm}
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
                defaultValue={vgConsoleForm.imageId}
                onChange={handleChangeVgConsoleForm}
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