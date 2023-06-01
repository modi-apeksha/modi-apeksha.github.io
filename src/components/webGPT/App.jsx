import "./App.scss";
import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/sections/header/header";
import Sidebar from "./components/common/sidebar/sidebar";
import Footer from "./components/sections/footer/footer";
import PageManager from "./managers/page.manager";
import { useConfig } from "./hooks/ConfigContext";

const App = () => {

  const { header, views } = useConfig();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);
  
  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
      />
      <Sidebar
        toggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}
      />
      <main
        className="main"
        style={{
          paddingTop: header.position === 'fixed' ? header.height : ""
        }}
      >
        <PageManager views={views}/>
      </main>
      <Footer />
    </>
  );
};

export default App;
