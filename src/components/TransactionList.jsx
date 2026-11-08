function TransactionList({ transactions }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
                Recent Transactions
            </h2>
            {/*so map is just a for loop, use to itterate through and array */}
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

                        <div className={`${txtColor} flex gap-1 font-bold`}>
                            <p>{transaction.type === "income" ? "+" : "-"}</p>
                            <p>₱{transaction.amount.toLocaleString("en-PH")}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TransactionList;