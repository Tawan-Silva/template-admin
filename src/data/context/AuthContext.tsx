import Router from "next/router";
import { createContext, useEffect, useState } from "react"
import Auth from "../../firebase/config";
import Cookies from 'js-cookie';
import { AuthContextProps } from "../../model/AuthContextProps";
import { Usuario } from "../../model/Usuario";

const AuthContext = createContext<AuthContextProps>(null);

async function usuarioNormalizado(usuarioFirebase: firebase.default.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        photoURL: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>(null);

   async function configurarSessao(usuarioFirebase) {
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase);
            setUsuario(usuario);
            gerenciarCookie(true);;
            setCarregando(false);
            return usuario.email;
        } else {
            setUsuario(null);
            gerenciarCookie(false);
            setCarregando(false);
            return false;
        }
    }

    async function login(email: string, senha: string) {
     try {
        setCarregando(true);
        const resp = await Auth.auth().
        signInWithEmailAndPassword(email, senha);

        await configurarSessao(resp.user);
        Router.push('/');
     } finally {
        setCarregando(false);
     }
    }

    async function cadastrar(email: string, senha: string) {
     try {
        setCarregando(true);
        const resp = await Auth.auth().
        createUserWithEmailAndPassword(email, senha);

        await configurarSessao(resp.user);
        Router.push('/');
     } finally {
        setCarregando(false);
     }
    }

    async function loginGoogle() {
     try {
        setCarregando(true);
        const resp = await Auth.auth().signInWithPopup(
            new Auth.auth.GoogleAuthProvider()
        )
        await configurarSessao(resp.user);
        Router.push('/');
     } finally {
        setCarregando(false);
     }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-auth')) {
            const cancelar = Auth.auth().onIdTokenChanged(configurarSessao);
            return () => cancelar();
        } else {
            setCarregando(false)
        }
    }, [])

    async function logout() {
        try {
            setCarregando(true);
            await Auth.auth().signOut();
            await configurarSessao(null);
        } finally {
            setCarregando(false);
        }
    }

    return <AuthContext.Provider value={{
        usuario,
        carregando,
        cadastrar,
        login,
        loginGoogle,
        logout
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
