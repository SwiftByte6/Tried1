import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';


export const TransactionContext = createContext(); // ✅ named export


export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const userid = localStorage.getItem('userid');
      // console.log("Fetching transactions for userid:", userid);

      const res = await axios.post('/transaction/get-transaction', { userid });
  
      // console.log("Fetched Transactions Response:", res); // 👈 Check response here
  
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
