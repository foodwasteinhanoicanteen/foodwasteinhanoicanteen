/* CampusMeal entry point (served at /campusmeal). */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts";
import "./styles/campusmeal.tw.css";
import { CampusMealApp } from "./campusmeal/App";

createRoot(document.getElementById("root")!).render(<StrictMode><CampusMealApp /></StrictMode>);
