import { render } from '@create-figma-plugin/ui'
import { h } from 'preact'
import '!./output.css'
import {MemoryRouter, Route, Routes} from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import OverviewPage from "./pages/OverviewPage";
import {UICompanionContextProvider} from "./store/UICompanionContext";

function Plugin () {
    return (
        <UICompanionContextProvider>
            <MemoryRouter initialEntries={["/overview"]}>
                <Routes>
                    <Route path="/overview" element={<OverviewPage />} />
                    <Route path="/detail/:number" element={<DetailsPage />} />
                </Routes>
            </MemoryRouter>
        </UICompanionContextProvider>
  )
}

export default render(Plugin)
