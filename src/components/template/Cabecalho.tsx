import useAppData from "../../data/hook/useAppData";
import { CabecalhoProps } from "../../model/CabecalhoProps";
import AvatarUsuario from "./AvatarUsuario";
import BotaoAternarTema from "./BotaoAternarTema";
import Titulo from "./Titulo";

export default function Cabecalho(props: CabecalhoProps) {
  const { tema, alternarTema } = useAppData();

  return (
    <div className={`flex`}>
      <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
      <div className={`flex flex-grow justify-end items-center`}>
        <BotaoAternarTema tema={tema} alternarTema={alternarTema} />
        <AvatarUsuario className="ml-3"/>
      </div>
    </div>
  );
}
