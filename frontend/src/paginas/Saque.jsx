import { CardSaldo } from "../components/CardSaldo";
import Header from "../components/Header";
import { useState } from "react";

import {
    CreditCard,
    Lock,
    User,
    FileText,
    Wallet,
    ArrowDownToLine
} from "lucide-react";

import CardVoltar from "../components/CardVoltar";
import { useUsuario } from "../context/useUsuario";
import api from "../api/api";


export default function Saque() {


    const { usuario, atualizarUsuario } = useUsuario();


    const [valor, setValor] = useState("");

    const [nomeTitular, setNomeTitular] = useState("");

    const [tipoDocumento, setTipoDocumento] = useState("CPF");

    const [cpfTitular, setCpfTitular] = useState("");

    const [tipoChave, setTipoChave] = useState("CPF");

    const [chavePix, setChavePix] = useState("");

    const [carregando, setCarregando] = useState(false);




    async function solicitarSaque() {


        const valorNumerico = Number(valor);



        if (!valorNumerico) {

            alert("Informe o valor do saque.");
            return;

        }



        if (valorNumerico < 35) {

            alert("O saque mínimo é R$35,00.");
            return;

        }



        if (valorNumerico > Number(usuario.saldo)) {

            alert("Saldo insuficiente.");
            return;

        }



        if (
            !nomeTitular ||
            !cpfTitular ||
            !chavePix
        ) {

            alert("Preencha todos os dados.");
            return;

        }



        try {


            setCarregando(true);



            await api.post("/saques", {


                valor: valorNumerico,

                nome_titular: nomeTitular,

                cpf_titular: cpfTitular,

                tipo_chave: tipoChave,

                chave_pix: chavePix


            });



            await atualizarUsuario();



            alert(
                "Saque solicitado com sucesso!"
            );



            setValor("");

            setNomeTitular("");

            setCpfTitular("");


            setChavePix("");



        } catch (error) {


            alert(

                error.response?.data?.erro ||

                "Erro ao solicitar saque."

            );


        } finally {

            setCarregando(false);

        }


    }




    return (

        <div className="min-h-screen bg-slate-100">


            <Header />


            <CardVoltar title="Faça seu saque" />



            <div className="px-5 py-5">


                <CardSaldo

                    saldo={

                        usuario?.saldo?.toLocaleString(

                            "pt-BR",

                            {

                                style: "currency",

                                currency: "BRL"

                            }

                        )

                        || "R$ 0,00"

                    }

                />


            </div>




            <div className="px-5 pb-10">


                <div className="
rounded-3xl
bg-white
shadow-xl
p-5
">


                    {/* CABEÇALHO */}


                    <div className="
flex
items-center
gap-3
mb-6
">


                        <div className="
rounded-2xl
bg-blue-100
p-3
">


                            <Wallet

                                size={25}

                                className="text-[#062272]"

                            />


                        </div>



                        <div>


                            <h2 className="
text-xl
font-bold
text-gray-800
">

                                Saque via PIX

                            </h2>


                            <p className="
text-sm
text-gray-500
">

                                Valor mínimo R$35,00

                            </p>


                        </div>


                    </div>





                    {/* VALOR */}


                    <label className="
text-sm
font-semibold
text-gray-700
">

                        Valor do saque

                    </label>



                    <div className="
mt-2
flex
rounded-2xl
border
bg-gray-50
overflow-hidden
">


                        <div className="
px-4
flex
items-center
bg-gray-100
font-bold
">

                            R$

                        </div>



                        <input

                            type="number"

                            value={valor}

                            onChange={(e) => setValor(e.target.value)}

                            placeholder="35,00"

                            className="
flex-1
px-4
py-4
bg-transparent
outline-none
text-lg
"

                        />


                    </div>








                    {/* TITULAR */}



                    <h3 className="
mt-7
mb-3
font-bold
text-gray-800
">

                        Dados do titular

                    </h3>



                    <div className="
flex
items-center
rounded-2xl
border
bg-gray-50
overflow-hidden
">


                        <div className="
px-4
">

                            <User size={19} />

                        </div>



                        <input

                            value={nomeTitular}

                            onChange={(e) => setNomeTitular(e.target.value)}

                            placeholder="Nome completo"

                            className="
flex-1
py-4
bg-transparent
outline-none
"

                        />


                    </div>








                    <div className="
mt-3
flex
gap-3
">


                        <select

                            value={tipoDocumento}

                            onChange={(e) => setTipoDocumento(e.target.value)}

                            className="
rounded-2xl
border
bg-gray-50
px-4
outline-none
"


                        >

                            <option>CPF</option>

                            <option>CNPJ</option>


                        </select>





                        <div className="
flex-1
flex
items-center
border
rounded-2xl
bg-gray-50
overflow-hidden
">


                            <div className="px-4">

                                <FileText size={18} />

                            </div>


                            <input

                                value={cpfTitular}

                                onChange={(e) => setCpfTitular(e.target.value)}

                                placeholder="CPF do titular"

                                className="
flex-1
py-4
bg-transparent
outline-none
"

                            />


                        </div>


                    </div>









                    {/* PIX */}



                    <h3 className="
mt-7
mb-3
font-bold
text-gray-800
">

                        Dados PIX

                    </h3>





                    <div className="
flex
gap-3
">


                        <select

                            value={tipoChave}

                            onChange={(e) => setTipoChave(e.target.value)}

                            className="
rounded-2xl
border
bg-blue-50
px-3
outline-none
"


                        >


                            <option value="CPF">
                                CPF
                            </option>

                            <option value="CNPJ">
                                CNPJ
                            </option>

                            <option value="EMAIL">
                                E-mail
                            </option>

                            <option value="PHONE">
                                Telefone
                            </option>

                            <option value="PIX_CODE">
                                Pix Aleatório</option>


                        </select>





                        <div className="
flex
flex-1
items-center
border
rounded-2xl
bg-gray-50
overflow-hidden
">


                            <div className="px-4">

                                <CreditCard size={18} />

                            </div>



                            <input

                                value={chavePix}

                                onChange={(e) => setChavePix(e.target.value)}

                                placeholder="Chave PIX"

                                className="
flex-1
py-4
bg-transparent
outline-none
"



                            />



                            <div className="px-4">

                                <Lock size={16} />

                            </div>



                        </div>



                    </div>








                    <button

                        onClick={solicitarSaque}

                        disabled={carregando}

                        className="
mt-8
w-full
rounded-2xl
bg-gradient-to-r
from-[#062272]
to-[#0b3fb4]
py-4
text-white
font-bold
text-lg
shadow-lg
transition
hover:scale-[1.02]
disabled:opacity-60
flex
items-center
justify-center
gap-2
"

                    >


                        <ArrowDownToLine size={22} />


                        {

                            carregando

                                ?

                                "Processando..."

                                :

                                "Solicitar saque"

                        }


                    </button>




                </div>


            </div>



        </div>

    );


}