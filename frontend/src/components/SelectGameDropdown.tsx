import {Dispatch, SetStateAction, useEffect, useState} from "react";
import VgGame from "../models/VgGame.ts";

/**
 * Interface for the Select Game dropdown menu
 */
interface SelectGameDropdownProps {
  setVgGame: Dispatch<SetStateAction<VgGame>>;
}

export default function SelectGameDropdown(props : Readonly<SelectGameDropdownProps>) {
  const {setVgGame} = props;
  const [vgGames, setVgGames] = useState<VgGame[] | undefined>(undefined);

  useEffect(() => {
    fetch(`api/games/all`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setVgGames(data)
      })
  }, [])

  const handleChange = (event: { target: { value: { toString: () => any; }; }; }) => {
    fetch(`api/games/${event.target.value.toString()}`, {
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
        setVgGame(data);
      })
  }

  return (
    <>
      <label htmlFor={"vgGame"}>Select Game: </label>
      <select name={"vgGame"} id={"vgGame"} onChange={handleChange}>
        <option value={""} defaultValue={"--"}>--</option>
        {vgGames?.map((vgGame: VgGame)=> (
          <option key={vgGame.id} value={vgGame.id}>{vgGame.name}</option>
        ))}
      </select>
    </>
  );
}