import {useEffect} from "react";
import {getVgConsolesAll} from "../api/ConsoleApi.ts";
import VgConsole from "../models/VgConsole.ts";

export default function PurchasesTable() {
  useEffect(() => {
    let value = await getVgConsolesAll();
    getVgConsolesAll()
      .then((vgConsoles: VgConsole[]) => console.log(vgConsoles))
  }, []);

  return (
    <>
    </>
  );
}