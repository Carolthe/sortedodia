export function CardSaldo({ saldo = "R$ 0,00" }) {
    return (
        <div className="flex justify-center">
            <div className="w-[90%]  rounded-2xl border-2 border-orange-500 bg-[#fefdfd] py-[5px] px-[10px]">
                <h3 className="text-[20px] font-medium text-gray-800">
                    Saldo
                </h3>

                <p className="mt-[2px] text-[17px] font-semibold text-black">
                    {saldo}
                </p>
            </div>
        </div>
    );
}