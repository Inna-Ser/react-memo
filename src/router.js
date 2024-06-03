/* eslint-disable prettier/prettier */
import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage";
import { Leaderboard } from "./components/Leaderboard/Leaderboard";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SelectLevelPage />,
    },
    {
      path: "/levelPage",
      element: <SelectLevelPage />,
    },
    {
      path: "/game/:pairsCount",
      element: <GamePage />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />,
    },
  ],
  {
    basename: "/react-memo",
  },
);
