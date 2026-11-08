import Header from './components/Header.jsx'
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import SummaryCard from './components/SummaryCard.jsx';
import TransactionList from './components/TransactionList.jsx';
import {useState} from "react";
import initialTransactions from "./data/transactions"
import AddTransactionForm from './components/AddTransactionForm.jsx';

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);

  //filter just filter outs the thing you need
  const totalIncome = transactions
                      .filter(transaction => transaction.type === "income")
                      .reduce((total, transaction)=>{
                        return total + transaction.amount
                      },0);
  //reduce is itterating through the array and changes its outcome
  const totalExpense = transactions
                       .filter(transaction => transaction.type === "expense")
                       .reduce((total, transaction) => {
                        return total + transaction.amount
                       }, 0); 

  const balance = totalIncome - totalExpense;
    
  function handleAddTransaction(newTransaction) {
    
    //spread operator copies old array, and adds new item then shows it all
    setTransactions(previousTransactions => [
      ...previousTransactions, newTransaction
    ]);


  }

    return(
      <>
        <Header/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 ">
          <SummaryCard 
            title="Total Balance"
            amount={balance}
            Icon={Wallet}
            variant="primary"
            iconColor="text-white"
          />
          <SummaryCard
            title="Income"
            amount={totalIncome}
            Icon={TrendingUp}
            iconColor="text-green-500"
          />
            <SummaryCard
              title="Expenses"
              amount={totalExpense}
              Icon={TrendingDown}
              iconColor="text-red-500"
            />
        </div>
        <div>
          <AddTransactionForm onAddTransaction={handleAddTransaction}/>
        </div>
        <div className="p-6">
          <TransactionList transactions={transactions}/>
        </div>
      </>  
    );
}

export default App
