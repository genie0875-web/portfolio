import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import { HomeView } from "./views/HomeView";
import { PortfolioView } from "./views/PortfolioView";
import { AdminView } from "./views/AdminView";
import { SortView } from "./views/SortView";
import ManageView from "./views/ManageView"; // ← 추가

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomeView },
      { path: "portfolio", Component: PortfolioView },
    ],
  },
  {
    path: "/admin",
    Component: AdminView,
  },
  {
    path: "/sort",
    Component: SortView,
  },
  {
    path: "/manage",       // ← 추가
    Component: ManageView,
  },
]);