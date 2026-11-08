import { Wallet } from "lucide-react";

function Header(){
    return (
        <div className="flex items-center gap-3 p-2">
            <Wallet className="w-8 h-8 text-emerald-600"/>
            <div>
                <h1 className="text-2xl font-bold ">
                    Cha-Ching
                </h1>
                <p className="text-sm text-emerald-600">
                    Take control of your finances.
                </p>
            </div>
            
        </div>
        
    )
}

export default Header