import { useState, useCallback } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import WebGPT from "./components/webGPT";
import * as views from "./pages";
import {HEADER_CONFIG, FOOTER_CONFIG, SOCIAL_LINKS, THEME} from "./pages/default.config";


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="app">
        <main
          className="main"
        >
          <Routes>
            <Route path="*" element={< WebGPT views={views} header={HEADER_CONFIG} footer={FOOTER_CONFIG} socials={SOCIAL_LINKS} themes={THEME}/>} />
          </Routes>
        </main>
    </div>
  );
};

export default App;
