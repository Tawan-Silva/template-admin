import Link from "next/link";
import useAuth from "../../data/hook/useAuth";
import { AvatarUsuarioProps } from "../../model/AvatarUsuarioProps";

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth();
    return (
        <Link href="/perfil">
            <img src={usuario?.photoURL ?? '/images/avatar.svg'} 
                alt="Avatar do Usuário" 
                className={`
                h-10 w10 rounded-full cursor-pointer
                ${props.className}
            `}/>

        </Link>
    )
}