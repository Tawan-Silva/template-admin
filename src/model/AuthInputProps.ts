export interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
    tipo: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}