import { Stack } from "@mui/material";
import ConsolesViewer from "../features/viewers/ConsolesViewer";
// import ConsoleTable from "../features/tables/ConsoleTable";
// import GameTable from "../features/tables/GameTable";

export default function Home() {
  return(
    <>
      <Stack spacing={8}>
          <ConsolesViewer />
          {/* <ConsoleTable /> */}
          {/* <GameTable /> */}
      </Stack>
    </>
  );
}