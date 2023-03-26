import { useState } from "react"

export const useForm = <T extends Object>(formulario: T) => {
  const [state, setState] = useState(formulario)

  const onChnage = (value: string, campo: keyof T) => {
    setState({
      ...state,
      [campo]: value
    })
  }

  return {
    ...state,
    formulario: state,
    onChnage
  }
}
