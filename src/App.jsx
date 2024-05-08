import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreloaderLayout from "./PreloaderLayout";
import LandingLayout from "./LandingLayout";
import Landing from "./Pages/Landing";
import Preloader from "./Pages/Preloader";
// import PageNotFound from "./Error/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Preloader page */}
                <Route element={<PreloaderLayout />}>
                    <Route path="/" element={<Preloader />} />
                </Route>

                {/* Landing Screen */}
                <Route element={<LandingLayout />}>
                    <Route path="/landing" element={<Landing />} />
                </Route>

                {/* Error routes */}
                {/* <Route path="*" element={<PageNotFound />} /> */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;