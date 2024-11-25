import {useEffect, useState} from "react";
import PurchasesTable from "../components/PurchasesTable.tsx";
import NewVgPurchaseForm from "../components/NewVgPurchaseForm.tsx";
import VgPurchase from "../models/VgPurchase.ts";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<VgPurchase[]>([{
    id: "",
    name: "",
    purchaseDate: null,
    costBase: 0.0,
    costTax: 0.0,
    costShipping: 0.0,
    costOther: 0.0,
    costTotal: 0.0,
    notes: null,
    imageId: null,
    consoleId: null,
    gameId: null,
  }]);

  useEffect(() => {
    fetch(`api/purchases/all?limit=10`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPurchases(data)
      })
  }, []);

  return (
    <>
      <div style={{ border: "3px solid red", margin: "2em" }}>
        <h1>Things I still need to do:</h1>
        <ul>
          <li>Add purchasedFrom field (text) to purchases database table</li>
          <li>Update backend to include purchasedFrom field in API call</li>
          <li>Update PurchasesTable to show purchasedFrom field</li>
          <li>Update NewVgPurchaseForm to include purchasedFrom field</li>
          <li>Add edit purchase feature</li>
          <li>Add delete purchase feature</li>
          <li>Create ConsolesPage and all features</li>
          <li>Create GamesPage and all features</li>
        </ul>
      </div>
      <NewVgPurchaseForm/>
      <PurchasesTable dbPurchases={purchases}/>
    </>
  );
}