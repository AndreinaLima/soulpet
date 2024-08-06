import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { addPet } from "../api/pets"
import { getClientes } from "../api/clientes" // Importa a função para obter os clientes

function NovoPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])

  function carregarClientes() {
    getClientes().then((dados) => {
      setClientes(dados)
    })
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  function criarPet(data) {
    addPet(data)
      .then((resposta) => {
        toast.success(resposta.message)
        navigate("/pets")
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <main className="mt-4 container">
      <h1>Adicionar Pet</h1>
      <hr />
      <form onSubmit={handleSubmit(criarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true, maxLength: 100 })}
          />
          {errors.tipo && (
            <small className="text-danger">O tipo é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="porte">Porte</label>
          <input
            type="text"
            id="porte"
            className="form-control"
            {...register("porte", { required: true, maxLength: 100 })}
          />
          {errors.porte && (
            <small className="text-danger">O porte é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc", { required: true })}
          />
          {errors.dataNasc && (
            <small className="text-danger">
              A data de nascimento é inválida!
            </small>
          )}
        </div>
        <div>
          <label htmlFor="clienteId">Cliente</label>
          <select
            id="clienteId"
            className="form-control"
            {...register("clienteId", { required: true })}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
          {errors.clienteId && (
            <small className="text-danger">O cliente é inválido!</small>
          )}
        </div>
        <Button className="mt-3 mb-3" type="submit">
          Adicionar
        </Button>
      </form>
    </main>
  )
}

export default NovoPet
