

function SummaryCard({title,amount, Icon, variant, iconColor}){
    //terniary operator to sah its just if else but cooler :P
    const bgColor = variant === "primary"
        ?"bg-emerald-900"
        :"bg-white";

    const txtColor = variant === "primary"
        ?"text-white"
        : "text-gray-900"
    return(
        <div className={`flex flex-col rounded-xl p-5 shadow-sm ${bgColor}`}>
            <div className={`${txtColor}`}>
                <div className="flex justify-between">
                    <h2 className="text-xs">{title}</h2>
                    <Icon className={`w-8 h-8 ${iconColor}`}/>
                </div>
                <p className="font-bold text-2xl">₱{amount.toLocaleString("en-PH")}</p>
            </div>
        </div>
    );
}

export default SummaryCard