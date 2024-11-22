import {Dispatch, FormEvent, SetStateAction, useState} from "react";

export default function NewVgConsoleForm({openDialog, setOpenDialog}: Readonly<{
  openDialog: boolean,
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}>) {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    releaseDate: "",
    description: "",
  })

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    console.log("Submitted form.")
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
      })
      .catch(err => console.log(err))
    setForm({
      name: "",
      manufacturer: "",
      releaseDate: "",
      description: "",
    })
    setOpenDialog(false)
  }

  return (
    <dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <form onSubmit={submitForm}>
        <table className={"console-table"}>
          <tbody>
          <tr>
            <th scope={"row"}><label htmlFor={"name"}>Name:</label></th>
            <td><input type={"text"} name={"name"} id={"name"} value={form.name} onChange={handleChange}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor={"name"}>Manufacturer:</label></th>
            <td><input type={"text"} name={"manufacturer"} id={"manufacturer"} value={form.manufacturer} onChange={handleChange}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor={"name"}>Release Date:</label></th>
            <td><input type={"date"} name={"releaseDate"} id={"releaseDate"} value={form.releaseDate} onChange={handleChange}/></td>
          </tr>
          <tr>
            <th scope={"row"}><label htmlFor={"name"}>Description:</label></th>
            <td><textarea name={"description"} id={"description"} rows={10} value={form.description} onChange={handleChange}/></td>
          </tr>
          </tbody>
        </table>
      </form>
      <button onClick={() => {setOpenDialog(false)}}>Cancel</button>
      <button type={"submit"} onClick={submitForm}>Save</button>
    </dialog>
  );
}