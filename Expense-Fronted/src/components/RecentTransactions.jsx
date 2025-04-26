import React, { useEffect, useState } from "react";
import RecentCard from "./RecentCard";

const categoryIcons = {
  food: "fa-solid fa-utensils",
  travel: "fa-solid fa-plane",
  shopping: "fa-solid fa-bag-shopping",
  bills: "fa-solid fa-file-invoice-dollar",
  entertainment: "fa-solid fa-film",
  default: "fa-solid fa-circle",
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/transaction/get-transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid }),
        });
        const data = await res.json();
        setTransactions(data.slice(0, 6)); // show recent 6
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userid]);

  return (
    <div className="space-y-4 mt-4 overflow-auto max-h-[50vh] pr-2">
      {transactions.map((txn, i) => (
        <RecentCard
          key={txn._id || i}
          category={txn.category}
          amount={txn.amount}
          date={txn.date}
          iconClass={categoryIcons[txn.category] || categoryIcons.default}
        />
      ))}
    </div>
  );
};

export default RecentTransactions;
