import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarSide from "./components/NavbarSide";
import NavbarTop from "./components/NavbarTop";
import CustomCursor from "./components/CustomCursor";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";
import CreateExpense from "./pages/CreateExpense";
import Login from "./components/Login"; // Import Login component
import { TransactionProvider } from "./contexts/TransactionContext"; // ✅ Import your context

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <TransactionProvider>
      <Router>
        {/* <CustomCursor /> */}
        {user ? (
          <div className="flex bg-gray-300 min-h-screen ">
            <NavbarSide />
            <NavbarTop />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/create-expense" element={<CreateExpense />} />
              {/* Make sure /login route is NOT in this block */}
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Catch-all route for login */}
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </Router>
    </TransactionProvider>
  );
};

export default App;