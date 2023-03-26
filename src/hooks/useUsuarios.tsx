import { useEffect, useRef, useState } from "react"
import { reqResApi } from "../api/reqRes"
import { ReqResListado, Usuario } from "../interfaces/reqRes"

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)

  const paginaRef = useRef(1)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    const resp = await reqResApi.get<ReqResListado>('/users', {
      params: { page: paginaRef.current }
    })
    setTotalPages(resp.data.total_pages)
    setUsuarios(resp.data.data)
  }

  const paginaSiguiente = () => {
    if (paginaRef.current < totalPages) {
      paginaRef.current++
      cargarUsuarios()
    }
  }

  const paginaAnterior = () => {
    if (paginaRef.current > 1) {
      paginaRef.current--
      cargarUsuarios()
    }
  }

  return { usuarios, paginaSiguiente, paginaAnterior }
}
