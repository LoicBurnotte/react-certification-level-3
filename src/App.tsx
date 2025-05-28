import Header from "@/features/Header";
import Home from "@/features/Home";
import { LocalStorageProvider } from "./context/localStorageProvider";

function App() {
  return (
    <LocalStorageProvider>
      <div className="h-screen flex flex-col justify-between">
        <div id="header" className="h-[50px] w-full">
          <Header />
        </div>
        <div className="p-8 overflow-auto h-full">
          <Home />
        </div>
        <div
          id="footer"
          className="h-[50px] flex items-center justify-center text-[15px] font-mono text-gray-500"
        >
          <span>React Level 3 Certification - ©Loïc BURNOTTE - 2025</span>
        </div>
      </div>
    </LocalStorageProvider>
  );
}

export default App;
