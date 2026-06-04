import CardData from "../components/CardData";
import CardResultado from "../components/CardResultado";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";

export default function Resultados (){
    return(
        <div >
            <Header/>
            <CardVoltar title="Resultados" to="/"/>
            
            <CardData/>
            <div className="flex flex-wrap justify-center bg- p-6">
               <CardResultado/> 
               <CardResultado/> 
               <CardResultado/> 
            </div>
            
        </div>
    )
}