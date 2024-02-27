import QrCodeGenerator from "./features/QrCodeGenerator";
import PasswordGenerator from "./features/PasswordGenerator";
import Navbar from "./components/ui/Navbar";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("Password Generator");

  return (
    <>
      <Navbar setActiveTab={setActiveTab} />
      <main className="main w-full md:w-1/3 m-auto mt-8 px-4 md:px-0">
        {activeTab === "Password Generator" ? (
          <PasswordGenerator />
        ) : (
          <QrCodeGenerator />
        )}
      </main>
    </>
  );
}
