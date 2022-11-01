import { createContext, useEffect, useState } from "react";
import { AppContextProps } from "../../model/AppContextProps";

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props) {
  const [tema, setTema] = useState("");

  function alternarTema() {
    const novoTema = tema === "" ? "dark" : "";
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  }

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    setTema(temaSalvo);
  }, [])

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
