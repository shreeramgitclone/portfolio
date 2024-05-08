import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingLayout from "./LandingLayout";
import Landing from "./Pages/Landing";
import PageNotFound from "./Error/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing Screen */}
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<Landing />} />
                </Route>

                {/* Error routes */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;