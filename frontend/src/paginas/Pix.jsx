import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";

import {
  criarPagamentoPix,
  consultarPagamento
} from "../api/apiPagamentos";

import { useUsuario } from "../context/useUsuario";


export default function Pix() {


  const navigate = useNavigate();

  const { atualizarUsuario } = useUsuario();



  const [valor, setValor] = useState("");

  const [qrCode, setQrCode] = useState("");

  const [pixCopiaCola, setPixCopiaCola] = useState("");

  const [pagamentoId, setPagamentoId] = useState(null);

  const [carregando, setCarregando] = useState(false);

  const [tempo, setTempo] = useState(300);


  // ============================
  // VERIFICAR LOGIN
  // ============================

  useEffect(() => {


    const token =
      localStorage.getItem("token");


    if (!token) {

      navigate("/login");

    }


  }, [navigate]);







  // ============================
  // CRONÔMETRO 5 MINUTOS
  // ============================

  useEffect(() => {


    if (!pagamentoId)
      return;


    if (tempo <= 0)
      return;



    const timer = setInterval(() => {


      setTempo((tempoAtual) =>
        tempoAtual - 1
      );


    }, 1000);



    return () =>
      clearInterval(timer);



  }, [pagamentoId, tempo]);







  // ============================
  // EXPIRA PIX
  // ============================
  const expirado = pagamentoId && tempo <= 0;

  // ============================
  // CONSULTAR PAGAMENTO
  // ============================

  useEffect(() => {


    if (!pagamentoId)
      return;



    const verificarPagamento =
      setInterval(async () => {


        try {


          const data =
            await consultarPagamento(
              pagamentoId
            );



          if (
            data.status === "approved"
          ) {



            clearInterval(
              verificarPagamento
            );



            // Atualiza usuário e saldo
            await atualizarUsuario();



            alert(
              "PIX confirmado! Saldo atualizado."
            );



            navigate("/");

          }



        } catch (error) {


          console.log(
            error
          );


        }



      }, 5000);




    return () =>
      clearInterval(
        verificarPagamento
      );



  }, [
    pagamentoId,
    navigate,
    atualizarUsuario
  ]);









  // ============================
  // CRIAR PIX
  // ============================

  async function handlePagamento() {



    const token =
      localStorage.getItem("token");



    if (!token) {

      navigate("/login");

      return;

    }



    const valorNumerico =
      Number(valor);




    if (
      !valorNumerico ||
      valorNumerico <= 0
    ) {

      alert(
        "Informe um valor válido."
      );

      return;

    }





    try {



      setCarregando(true);



      const data =
        await criarPagamentoPix({

          valor: valorNumerico

        });





      setQrCode(
        data.qr_code_base64
      );



      setPixCopiaCola(
        data.qr_code
      );



      setPagamentoId(
        data.id
      );



      setTempo(300);


    } catch (error) {



      console.error(error);



      alert(
        error.response?.data?.erro ||
        "Erro ao gerar PIX."
      );



    } finally {


      setCarregando(false);


    }



  }









  function formatarTempo() {


    const minutos =
      Math.floor(
        tempo / 60
      );


    const segundos =
      tempo % 60;



    return (

      `${minutos}:${segundos
        .toString()
        .padStart(2, "0")}`

    );


  }









  async function copiarPix() {


    try {


      await navigator.clipboard.writeText(
        pixCopiaCola
      );


      alert(
        "PIX copiado!"
      );


    } catch {


      alert(
        "Não foi possível copiar."
      );


    }


  }









  return (


    <div className="min-h-screen bg-gray-50">


      <Header />



      <CardVoltar
        title="Recarregar seu Saldo"
      />





      <div className="
        max-w-lg
        mx-auto
        px-4
        py-6
      ">



        <h1 className="
          text-2xl
          font-bold
          text-center
          text-[#001A72]
          mb-6
        ">


          Qual o valor da recarga?


        </h1>






        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        ">






          <label className="
            block
            text-sm
            mb-2
          ">


            Valor mínimo: R$ 10,00


          </label>






          <input

            type="number"

            placeholder="Ex: 50"

            value={valor}

            onChange={
              e =>
                setValor(e.target.value)
            }

            className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
            "

          />







          <button

            onClick={handlePagamento}

            disabled={carregando}

            className="
              mt-6
              w-full
              h-12
              rounded-xl
              bg-[#062272]
              text-white
              font-bold
            "

          >


            {
              carregando
                ?
                "Gerando PIX..."
                :
                "Recarregar via PIX"
            }


          </button>








          {
            qrCode &&
            !expirado &&


            <div className="
              mt-8
              text-center
            ">



              <h2 className="font-bold">

                Pague em até:

              </h2>





              <p className="
                text-3xl
                font-bold
                text-red-600
              ">


                {formatarTempo()}


              </p>






              <img

                src={
                  `data:image/png;base64,${qrCode}`
                }

                alt="QR Code PIX"

                className="
                  mx-auto
                  w-64
                  mt-4
                "

              />







              <h3 className="
                font-bold
                mt-6
              ">


                PIX Copia e Cola


              </h3>






              <div className="
                mt-3
                p-3
                bg-gray-100
                rounded-xl
                break-all
                text-sm
              ">


                {pixCopiaCola}


              </div>






              <button

                onClick={copiarPix}

                className="
                  mt-3
                  w-full
                  rounded-xl
                  bg-green-600
                  text-white
                  py-3
                  font-bold
                "

              >


                Copiar PIX


              </button>






              <p className="
                mt-4
                text-sm
                text-gray-600
              ">


                Aguardando confirmação do pagamento...


              </p>




            </div>


          }







          {
            expirado &&


            <div className="
              mt-8
              text-center
              text-red-600
              font-bold
            ">


              PIX expirado.
              Gere um novo pagamento.


            </div>


          }





        </div>



      </div>



    </div>


  );


}