import { Grid, Typography } from "@mui/material";
import ActionCard from "../components/cards/ActionCard";
import { useEffect, useState } from "react";
import { AddPurchaseForm } from "../features/forms/AddPurchaseForm";
import Purchase from "../models/Purchase";
import { getPurchaseData } from "../api/PurchaseApi";
import PurchaseCard from "../components/cards/PurchaseCard";

export default function PurchasesPage() {
  const [purchaseData, setPurchaseData] = useState<Purchase[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  }

  useEffect(() => {
    getPurchaseData(setPurchaseData);
  }, []);
  console.log(purchaseData)

  return (
    <>
      {/* Add new console card */}
      <ActionCard image="src/assets/images/add-to-database.png" text="Add a new purchase" callback={handleOpenForm} />

      <Typography margin={10}>Past Purchases</Typography>
      <Grid container spacing={2}>
        {purchaseData.map((item, index) => (
          <Grid item xs={4} key={index}>
            <PurchaseCard
              id={item.id}
              fk_console_id={item.fk_console_id}
              fk_game_id={item.fk_game_id}
              fk_place_of_purchase={item.fk_place_of_purchase}
              fk_image_id={item.fk_image_id}
              name={item.name}
              cost_base={item.cost_base}
              cost_shipping={item.cost_shipping}
              cost_tax={item.cost_tax}
              cost_other={item.cost_other}
              cost_total={item.cost_total}
              date={item.date}
              notes={item.notes}
            />
          </Grid>
        ))}
      </Grid>

      <AddPurchaseForm open={openForm} setOpen={setOpenForm} />
    </>
  );
}