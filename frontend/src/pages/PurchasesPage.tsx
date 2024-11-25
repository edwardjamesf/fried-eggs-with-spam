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
      <NewVgPurchaseForm/>
      <PurchasesTable dbPurchases={purchases}/>
    </>
  );
}