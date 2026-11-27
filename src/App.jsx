import Header from './components/Header.jsx'
import { Wallet, TrendingUp, TrendingDown, } from "lucide-react";
import SummaryCard from './components/SummaryCard.jsx';
import TransactionList from './components/TransactionList.jsx';
import {useState, useEffect} from "react";
import initialTransactions from "./data/transactions"
import AddTransactionForm from './components/AddTransactionForm.jsx';

function App() {
  
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("cha-ching-transactions");
    if(savedTransactions !== null){
      return JSON.parse(savedTransactions)
    }else{
      return initialTransactions;
    }
  });

  const [editingId, setEditingId] = useState(null)
  
  const [editingAmount, setEditingAmount] = useState("")


  useEffect(() => {
    localStorage.setItem("cha-ching-transactions", JSON.stringify(transactions));
  },[transactions])


  
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

  function handleDeleteTransaction(id){
    setTransactions(previousTransactions => 
      previousTransactions.filter(transaction => transaction.id !== id)
    )
  };

  function handleEditTransaction(id){
    setEditingId(id);

    const selectedTransaction = transactions.find(transaction => transaction.id === id)

    setEditingAmount(selectedTransaction.amount)

  }

  function handleCancelEdit(){
    setEditingId(null);
  }

  function handleSaveEdit(){
    const newAmount = Number(editingAmount);

    if(newAmount <= 0 || !Number.isFinite(newAmount)){
      alert("Please enter a valid input");
      return;
    }

    setTransactions(previousTransactions => {
      return previousTransactions.map(transaction => {
        if (transaction.id === editingId){
          return {...transaction, amount: newAmount};
        }else{
          return transaction;
        }
      })
    })

    setEditingId(null);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <AddTransactionForm onAddTransaction={handleAddTransaction}/>
            <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} onEditTransaction={handleEditTransaction} editingId={editingId}  setEditingAmount={setEditingAmount} editingAmount={editingAmount} onCancelEdit={handleCancelEdit} onSaveEdit={handleSaveEdit}/>
        </div>
      </>  
    );
}


export default App
