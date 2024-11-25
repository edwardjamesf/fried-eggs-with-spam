import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import VgConsole from "../models/VgConsole.ts";

/**
 * Interface for the Select Console dropdown menu
 */
interface SelectConsoleDropdownProps {
  setVgConsole: Dispatch<SetStateAction<VgConsole>>;
}

export default function SelectConsoleDropdown(props : Readonly<SelectConsoleDropdownProps>) {
  const {setVgConsole} = props;
  const [vgConsoles, setVgConsoles] = useState<VgConsole[] | undefined>(undefined);

  useEffect(() => {
    fetch(`api/consoles/all`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setVgConsoles(data)
      })
  }, [])

  const handleChange = (event: { target: { value: SetStateAction<VgConsole>; }; }) => {
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
        console.log(data);
        setVgConsole(data);
      })
  }

  return (
    <>
      <label htmlFor={"vgConsole"}>Select Console: </label>
      <select name={"vgConsole"} id={"vgConsole"} onChange={handleChange}>
        <option value={""} defaultValue={"--"}>--</option>
        {vgConsoles?.map((vgConsole: VgConsole)=> (
          <option key={vgConsole.id} value={vgConsole.id}>{vgConsole.manufacturer + " " + vgConsole.name}</option>
        ))}
      </select>
    </>
  );
}