import { useState } from "react";
import {CirclePlus} from "lucide-react";


function AddTransactionForm({onAddTransaction}){
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("Income");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const normalizedType = transactionType.trim().toLowerCase();
        const cleanedCategory = category.trim();
        const cleanedDescription = description.trim() || null;

        if (Number(amount) <= 0 || !Number.isFinite(Number(amount))){
            alert("Please enter a valid amount!");
            return;
        }

        if (normalizedType !== "income" && normalizedType!== "expense"){
            alert("Transaction Type needed");
            return;
        }

        if(!cleanedCategory){
            alert("Enter a valid category");
            return;
        }



        

        const newTransaction = {
            id: crypto.randomUUID(),
            amount: Number(amount),
            type: normalizedType,
            category: cleanedCategory,
            description : cleanedDescription
        }


        onAddTransaction(newTransaction);
        setAmount("");
        setTransactionType("Income");
        setCategory("");
        setDescription("");

    }

    return(
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-700  ">
                    <h2 className="text-xl font-bold flex pb-2 items-center gap-2"><CirclePlus className="text-emerald-500 w-4 h-4 " />Add Transaction</h2>
                    <p className="text-xs">Record a new income or expense</p>
                </div>
                <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount(₱)</label>
                <input id="amount" type="number" step="0.01" value={amount} placeholder="Amount" onChange={(event) => setAmount(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                <label className="text-sm font-medium text-gray-700">Transaction Type</label>    
                <div className="flex gap-5 ">   
                    <button type="button" value="Income" onClick={(event) => setTransactionType(event.target.value)} className={`w-full rounded-lg border border-gray-300 px-3 py-2 hover:bg-emerald-700 cursor-pointer ${transactionType === "Income" ? "bg-emerald-600 text-white" : "bg-white"}`}>Income</button>
                    <button type="button" value="Expense" onClick={(event) => setTransactionType(event.target.value)} className={`w-full rounded-lg border border-gray-300 px-3 py-2 hover:bg-emerald-700 cursor-pointer ${transactionType === "Expense" ? "bg-emerald-600 text-white" : "bg-white"}`}>Expense</button>
                </div>
                <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                <input id = "category" type="text" placeholder="Category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                <label htmlFor="description" className="text-sm font-medium text-gray-700" >Description (optional)</label>
                <input id= "description" type="text" placeholder="e.g. Jollibee lunch" value={description} onChange={(event) => setDescription(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                <button type="submit" className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-emerald-700 cursor-pointer">+ Save Transaction</button>
            </form>
        </div>
    )
}

export default AddTransactionForm;