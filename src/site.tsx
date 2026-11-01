/* Website entry point (served at /). */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts";
import "./styles/site.tw.css";
import { RouterProvider } from "./state/router";
import { SiteProvider } from "./state/site";
import { OverlayProvider } from "./components/ui/Overlays";
import { EditModeProvider } from "./components/ui/EditMode";
import { SurveyProvider } from "./components/survey/state";
import { Footer, TopBar } from "./components/layout";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import EthicsPage from "./pages/EthicsPage";
import SolutionPage from "./pages/SolutionPage";
import SurveyPage from "./pages/SurveyPage";
import DecisionPage from "./pages/DecisionPage";
import AppPage from "./pages/AppPage";
import PlanPage from "./pages/PlanPage";
import ResultsPage from "./pages/ResultsPage";
import SourcesPage from "./pages/SourcesPage";

function SiteApp() {
  return (
    <OverlayProvider>
      <SiteProvider>
        <SurveyProvider>
          <RouterProvider>
            <EditModeProvider>
              <TopBar />
              <main id="main">
                <HomePage /><ProblemPage /><EthicsPage /><SolutionPage /><SurveyPage />
                <DecisionPage /><AppPage /><PlanPage /><ResultsPage /><SourcesPage />
              </main>
              <Footer />
            </EditModeProvider>
          </RouterProvider>
        </SurveyProvider>
      </SiteProvider>
    </OverlayProvider>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><SiteApp /></StrictMode>);
