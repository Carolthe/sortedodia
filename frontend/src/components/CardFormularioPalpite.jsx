import { useEffect, useState } from "react";
import CardSelect from "./CardSelect";
import { criarAposta } from "../api/apostasServices";
import { buscarSelects } from "../api/selectsService";
import { useNavigate } from "react-router-dom";

export default function CardFormularioPalpite() {

  const [form, setForm] = useState({
    extracao: "",
    data: "",
    modalidade: "",
    colocacao: "",
    valorOutro: "",
    numeros: "",
    valor: ""
  });


  const [selects, setSelects] = useState([]);

  const [numerosSelecionados, setNumerosSelecionados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    async function carregarSelects() {

      try {

        const dados = await buscarSelects();

        console.log("DADOS RECEBIDOS:", dados);

        setSelects(dados);

      } catch (erro) {

        console.error(
          "Erro ao carregar opções do formulário:",
          erro
        );

      }

    }

    carregarSelects();

  }, []);


  const extracoes = [
    ...new Set(
      selects
        .map(item => item.extracao)
        .filter(Boolean)
    )
  ];


  const modalidades = [
    ...new Set(
      selects
        .map(item => item.modalidade)
        .filter(Boolean)
    )
  ];


  const colocacoes = [
    ...new Set(
      selects
        .map(item => item.colocacao)
        .filter(Boolean)
    )
  ];





  async function handleSubmit() {

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Faça login para realizar uma aposta.");

      navigate("/login");

      return;
    }

    try {

      const aposta = {
        data_jogo: form.data,
        extracao: form.extracao,
        modalidade: form.modalidade,
        colocacao:
          form.colocacao === "Outro"
            ? form.valorOutro
            : form.colocacao,
        valor: Number(form.valor),
        numeros: numerosSelecionados,
      };

      await criarAposta(aposta);

      alert("Aposta realizada com sucesso!");

    } catch (erro) {

      if (erro.response?.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

        return;
      }

      alert(
        erro.response?.data?.erro ||
        "Erro ao realizar aposta."
      );

    }

  }
  const datas = [
    ...new Set(
      selects
        .map(item => item.data)
        .filter(Boolean)
    )
  ];



  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;



    if (name === "numeros") {


      let numeros = value.replace(/\D/g, "");


      let grupos = [
        ...numerosSelecionados
      ];



      while (numeros.length >= 4) {

        grupos.push(
          numeros.slice(0, 4)
        );

        numeros = numeros.slice(4);

      }



      setNumerosSelecionados(grupos);



      setForm(prev => ({
        ...prev,
        numeros
      }));


      return;

    }



    setForm(prev => ({

      ...prev,

      [name]: value,


      ...(name === "colocacao" &&
        value !== "Outro"
        ? {
          valorOutro: ""
        }
        : {}
      )

    }));

  };



  const selectStyle =
    "w-full max-w-full h-12 rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 shadow-sm outline-none appearance-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 overflow-hidden text-ellipsis whitespace-nowrap";



  const inputStyle =
    "w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";



  return (

    <div className="bg-slate-100 p-4 pb-[120px]">

      <div className="mx-auto w-full max-w-md">

        <div className="overflow-hidden rounded-2xl bg-white p-5 shadow-sm">

          <div className="space-y-4">


            <CardSelect

              label="Extração"

              name="extracao"

              value={form.extracao}

              onChange={handleChange}

              className={selectStyle}

              options={extracoes}

            />



            <CardSelect

              label="Data"

              name="data"

              value={form.data}

              onChange={handleChange}

              className={selectStyle}

              options={datas}

            />



            <CardSelect

              label="Modalidade"

              name="modalidade"

              value={form.modalidade}

              onChange={handleChange}

              className={selectStyle}

              options={modalidades}

            />


            <CardSelect
              label="Colocação"
              name="colocacao"
              value={form.colocacao}
              onChange={handleChange}
              className={selectStyle}
              options={colocacoes}
            />



            {form.colocacao === "Outro" && (

              <div>

                <label className="mb-1.5 block text-[16px] font-medium text-[#403eb5]">

                  Outra opção de colocação

                </label>


                <input

                  type="text"

                  name="valorOutro"

                  value={form.valorOutro}

                  onChange={handleChange}

                  placeholder="Digite a quantidade"

                  className={inputStyle}

                />

              </div>

            )}





            <div>

              <label className="mb-1.5 block text-[16px] font-medium text-slate-700">

                Números

              </label>


              <input

                type="text"

                name="numeros"

                value={form.numeros}

                onChange={handleChange}

                placeholder="Digite os números"

                className={inputStyle}

              />



              {numerosSelecionados.length > 0 && (

                <div className="mt-3 flex flex-wrap gap-2">


                  {numerosSelecionados.map(
                    (numero, index) => (

                      <div

                        key={index}

                        className="rounded-lg bg-blue-100 border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700"

                      >

                        {numero}

                      </div>

                    ))}


                </div>

              )}

              <div>

                <label className="mb-1.5 block text-[16px] mt-[15px] font-medium text-slate-700">

                  Valor da Aposta

                </label>

                <input
                  type="number"
                  name="valor"
                  value={form.valor}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>


            </div>




            <button

              type="button"

              onClick={handleSubmit}

              className="mt-4 h-12 w-full rounded-xl bg-[#062272] font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"

            >

              Confirmar

            </button>



          </div>

        </div>

      </div>

    </div>

  );

}