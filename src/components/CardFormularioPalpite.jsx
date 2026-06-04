import { useState } from "react";
import CardSelect from "./CardSelect";

export default function CardFormularioPalpite() {
  const [form, setForm] = useState({
    extracao: "",
    data: "",
    modalidade: "",
    opcao: "",
    valorOutro: "",
    numeros: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "opcao" && value !== "Outro"
        ? { valorOutro: "" }
        : {}),
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
              options={[
                "PT Rio 09h (09:10)",
                "PT Rio 11h (11:14)",
                "PT Rio 14h (14:14)",
                "PT Rio 16h (16:09)",
                "São Paulo 10h (10:10)",
                "São Paulo 13h (13:10)",
                "São Paulo 15h (15:13)",
              ]}
            />

            <CardSelect
              label="Data"
              name="data"
              value={form.data}
              onChange={handleChange}
              className={selectStyle}
              options={[
                "03/06/2026 - Hoje",
                "04/06/2026 - Quinta",
                "05/06/2026 - Sexta",
                "06/06/2026 - Sábado",
                "07/06/2026 - Domingo",
                "08/06/2026 - Segunda",
              ]}
            />

            <CardSelect
              label="Modalidade"
              name="modalidade"
              value={form.modalidade}
              onChange={handleChange}
              className={selectStyle}
              options={[
                "Milhar (R$ 4.000,00x)",
                "Centena (R$ 600,00x)",
                "Dezena (R$ 50,00x)",
                "Unidade (R$ 5,00x)",
                "Grupo (R$ 16,00x)",
                "Duque (R$ 200,00x)",
                "Terno de dezena (R$ 4.000,00x)",
                "Terno de dezena (R$ 4.000,00x)",
                "Terno 1º ao 5º (R$ 100,00x)",
                "Terno seco ESP (R$ 180,00x)",
                "Passe (R$ 80,00)",
                "Passe V. V. (R$ 40,00)",
                "Quina (R$ 1.000,00)",
                "Quadra (R$ 100,00)",
                "Terno (R$ 10,00)",
              ]}
            />

            <CardSelect
              label="Opção Colocação"
              name="opcao"
              value={form.opcao}
              onChange={handleChange}
              className={selectStyle}
              options={[
                "1º Prêmio",
                "1º ao 5º Prêmio",
                "1º E 1º ao 5º Prêmio",
                "Milhar 3x",
                "Milhar 4x",
                "Outro",
              ]}
            />

            {form.opcao === "Outro" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#403eb5]">
                  Outra opção de colocação
                </label>

                <input
                  type="number"
                  name="valorOutro"
                  value={form.valorOutro}
                  onChange={handleChange}
                  min="1"
                  placeholder="Digite a quantidade"
                  className={inputStyle}
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
            </div>

            <button
              type="button"
              onClick={() => console.log(form)}
              className="mt-6 h-12 w-full rounded-xl bg-[#062272] font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}