// Dashboard.jsx or Main.jsx
import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import Main from "../components/Main";

const Dashboard = () => {
  const { transactions, loading } = useContext(TransactionContext);

  return <Main transactions={transactions} loading={loading} />;
};

export default Dashboard;
