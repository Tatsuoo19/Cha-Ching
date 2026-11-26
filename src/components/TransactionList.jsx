import { Trash2, Pencil } from "lucide-react";

function TransactionList({ transactions, onDeleteTransaction, onEditTransaction, editingId, editingAmount, setEditingAmount, onCancelEdit, onSaveEdit}) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
                Recent Transactions
            </h2>

            {transactions.map(transaction => {
                const txtColor = transaction.type === "income"
                    ? "text-emerald-600"
                    : "text-red-500";
                
                return (
                    <div
                        key={transaction.id}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                    >
                        <p className="font-medium">
                            {transaction.category}
                        </p>

                        <div className={`${txtColor} flex items-center gap-2 font-bold`}>
                            <p>{transaction.type === "income" ? "+" : "-"}</p>
                            {editingId === transaction.id ? (
                                <>
                                    <input type="number" step="0.01" value={editingAmount} onChange={(event) => setEditingAmount(event.target.value)}></input>
                                    <button type="button" onClick={onSaveEdit}>Save</button>
                                    <button type="button" onClick={onCancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <p>₱{transaction.amount.toLocaleString("en-PH")}</p>
                            )}


                            <button
                                type="button"
                                onClick={() => onDeleteTransaction(transaction.id)}
                                className="ml-3 cursor-pointer hover:opacity-70"
                                aria-label={`Delete ${transaction.category} transaction`}>
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onEditTransaction(transaction.id)}
                                className ="ml-3 cursor-pointer hover:opacity-70"
                                aria-label={`Edit ${transaction.category} transaction`}>
                                <Pencil className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TransactionList;
