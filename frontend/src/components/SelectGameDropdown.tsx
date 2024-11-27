import {Dispatch, SetStateAction, useEffect, useState} from "react";
import VgGame from "../models/VgGame.ts";

/**
 * Interface for the Select Game dropdown menu
 */
interface SelectGameDropdownProps {
  setVgGame: Dispatch<SetStateAction<VgGame>>;
  vgPurchaseForm: any;
  setVgPurchaseForm: Dispatch<SetStateAction<any>> | undefined;
}

export default function SelectGameDropdown(props : Readonly<SelectGameDropdownProps>) {
  const {setVgGame, vgPurchaseForm, setVgPurchaseForm} = props;
  const [vgGames, setVgGames] = useState<VgGame[] | undefined>(undefined);

  useEffect(() => {
    fetch(`api/games/all`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return undefined;
      })
      .then((data) => {
        setVgGames(data)
      })
      .catch((error) => {console.log(error)})
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
        console.log(data)
        setVgGame(data);
        if (vgPurchaseForm !== undefined && setVgPurchaseForm !== undefined) {
          vgPurchaseForm.gameId = data.id;
          setVgPurchaseForm(vgPurchaseForm);
        }
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