import { useState } from "react";
import {CirclePlus} from "lucide-react";


function AddTransactionForm({onAddTransaction}){
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");
    const [category, setCategory] = useState("Food");

    function handleSubmit(event) {
        event.preventDefault();

        if (Number(amount) <= 0 || !Number.isFinite(Number(amount))){
            alert("Please enter a valid amount!");
            return;
        }

        const newTransaction = {
            id: crypto.randomUUID(),
            amount: Number(amount),
            type: transactionType,
            category: category
        }


        onAddTransaction(newTransaction);
        setAmount("");
        setTransactionType("expense");
        setCategory("Food");

    }

    return(
        <div className="bg-white rounded-xl shadow-sm p-5 m-5 border border-gray-200 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-700 ">
                    <h2 className="text-xl font-bold flex pb-2 item-center gap-2"><CirclePlus className="text-emerald-500 w-5 h-5 " />Add Transaction</h2>
                    <p className="text-xs">Record a new income or expense</p>
                </div>
                <label className="text-sm font-medium text-gray-700">Amount(₱)</label>
                 <input type="number" value={amount} placeholder="Amount" onChange={(event) => setAmount(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                 <label className="text-sm font-medium text-gray-700">Transaction type</label>
                <select  onChange={(event) => setTransactionType(event.target.value)} value={transactionType} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select onChange={(event) => setCategory(event.target.value)} value={category}className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Allowance">Allowance</option>
                </select>
                <button type="submit" className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-emerald-700 cursor-pointer">
                    + Save Transaction
                </button>
            </form>

        </div>
    )
}

export default AddTransactionForm;