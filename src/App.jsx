import Header from './components/Header.jsx'
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import SummaryCard from './components/SummaryCard.jsx';
import transactions from './data/transactions.js';

function App() {

  const totalIncome = transactions
                      .filter(transaction => transaction.type === "income")
                      .reduce((total, transaction)=>{
                        return total + transaction.amount
                      },0);

  const totalExpense = transactions
                       .filter(transaction => transaction.type === "expense")
                       .reduce((total, transaction) => {
                        return total + transaction.amount
                       }, 0); 
  

  const balance = totalIncome - totalExpense;

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
      </>  
    );
}

export default App
