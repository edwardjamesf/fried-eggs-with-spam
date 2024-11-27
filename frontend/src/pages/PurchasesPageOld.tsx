import {useEffect, useState} from "react";
import PurchasesTable from "../components/PurchasesTable.tsx";
import NewVgPurchaseForm from "../components/NewVgPurchaseForm.tsx";
import VgPurchase from "../models/VgPurchase.ts";

export default function PurchasesPageOld() {
  const [purchases, setPurchases] = useState<VgPurchase[]>([{
    id: "",
    name: "",
    purchaseDate: undefined,
    purchaseFrom: undefined,
    costBase: 0.0,
    costTax: 0.0,
    costShipping: 0.0,
    costOther: 0.0,
    costTotal: 0.0,
    notes: undefined,
    imageId: undefined,
    consoleId: undefined,
    gameId: undefined,
  }]);

  useEffect(() => {
    fetch(`api/purchases/all?limit=10`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return undefined;
      })
      .then((data) => {
        setPurchases(data)
      })
      .catch((error) => {console.log(error)})
  }, []);

  return (
    <>
      <div style={{ border: "3px solid red", margin: "2em" }}>
        <h1>Things I still need to do:</h1>
        <ul>
          <li>Fix bug with edit and delete modals</li>
          <li>Add delete purchase feature</li>
          <li>Create ConsolesPage and all features</li>
          <li>Create GamesPage and all features</li>
        </ul>
      </div>
      <NewVgPurchaseForm/>
      <PurchasesTable purchases={purchases} setPurchases={setPurchases}/>
    </>
  );
}