import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ConsoleModel from "../models/ConsoleModel.ts";

/**
 * Interface for the Select Console dropdown menu
 */
interface SelectConsoleDropdownProps {
  setVgConsole: Dispatch<SetStateAction<ConsoleModel>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>> | undefined;
}

export default function SelectConsoleDropdown(props : Readonly<SelectConsoleDropdownProps>) {
  const {setVgConsole, vgPurchaseForm, setVgPurchaseForm} = props;
  const [vgConsoles, setVgConsoles] = useState<ConsoleModel[] | undefined>(undefined);

  useEffect(() => {
    fetch(`api/consoles/all`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then((data) => {
        setVgConsoles(data)
      })
      .catch((error) => {console.log(error)})
  }, [])

  const handleChange = (event: { target: { value: { toString: () => any; }; }; }) => {
    fetch(`api/consoles/${event.target.value.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setVgConsole(data);
        if (vgPurchaseForm !== undefined && setVgPurchaseForm !== undefined) {
          vgPurchaseForm.consoleId = data.id;
          setVgPurchaseForm(vgPurchaseForm);
        }
      })
  }

  return (
    <>
      <label htmlFor={"vgConsole"}>Select Console: </label>
      <select name={"vgConsole"} id={"vgConsole"} onChange={handleChange}>
        <option value={""} defaultValue={"--"}>--</option>
        {vgConsoles?.map((vgConsole: ConsoleModel)=> (
          <option key={vgConsole.id} value={vgConsole.id}>{vgConsole.manufacturer + " " + vgConsole.name}</option>
        ))}
      </select>
    </>
  );
}