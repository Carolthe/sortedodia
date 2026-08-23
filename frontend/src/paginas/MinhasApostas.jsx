import { useEffect, useState } from "react";
import { Clock, Calendar, Ticket } from "lucide-react";

import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";

import { buscarMinhasApostas } from "../api/apostasServices";

export default function MinhasApostas() {

    const [apostas, setApostas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        async function carregarApostas() {

            try {

                const dados = await buscarMinhasApostas();

                setApostas(dados);

            } catch (erro) {

                console.error("Erro ao carregar apostas:", erro);

            } finally {

                setCarregando(false);

            }

        }

        carregarApostas();

    }, []);

    return (

        <div className="min-h-screen bg-slate-100 pb-24">

            <Header />

            <CardVoltar title="Minhas Apostas" />

            <div className="mx-auto max-w-md p-4">

                {carregando ? (

                    <p className="text-center text-slate-500">
                        Carregando apostas...
                    </p>

                ) : (

                    <>
                        <div className="space-y-4">

                            {apostas.map((aposta) => {

                                const data = new Date(aposta.criado_em);

                                const dataFormatada =
                                    data.toLocaleDateString("pt-BR");

                                const horaFormatada =
                                    data.toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                return (

                                    <div
                                        key={aposta.id_aposta}
                                        className="rounded-2xl bg-white p-5 shadow-sm"
                                    >

                                        {/* Cabeçalho */}

                                        <div className="flex items-center gap-2">

                                            <Ticket
                                                size={18}
                                                className="text-[#062272]"
                                            />

                                            <span className="font-semibold text-slate-800">
                                                {aposta.modalidade}
                                            </span>

                                        </div>

                                        {/* Data e Hora */}

                                        <div className="mt-4 flex items-center gap-5 text-sm text-slate-600">

                                            <div className="flex items-center gap-1">

                                                <Calendar size={15} />

                                                {dataFormatada}

                                            </div>

                                            <div className="flex items-center gap-1">

                                                <Clock size={15} />

                                                {horaFormatada}

                                            </div>

                                        </div>

                                        {/* Extração */}

                                        <div className="mt-3">

                                            <span className="text-sm text-slate-500">
                                                Extração
                                            </span>

                                            <p className="font-medium text-slate-700">
                                                {aposta.extracao}
                                            </p>

                                        </div>

                                        {/* Números */}

                                        <div className="mt-4">

                                            <p className="mb-2 text-sm text-slate-500">
                                                Números apostados
                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {aposta.numeros.map((numero, index) => (

                                                    <span
                                                        key={index}
                                                        className="rounded-lg bg-[#062272] px-4 py-2 text-sm font-semibold text-white"
                                                    >

                                                        {numero}

                                                    </span>

                                                ))}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                        {apostas.length === 0 && (

                            <div className="mt-20 text-center">

                                <Ticket
                                    size={55}
                                    className="mx-auto text-slate-300"
                                />

                                <p className="mt-4 text-slate-500">

                                    Você ainda não realizou nenhuma aposta.

                                </p>

                            </div>

                        )}

                    </>

                )}

            </div>

        </div>

    );

}