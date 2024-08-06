import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { deletePet, getPets } from "../api/pets"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import toast from "react-hot-toast"

function Pets() {
  const [pets, setPets] = useState(null)
  const [clientes, setClientes] = useState([])

  async function carregarClientes() {
    try {
      const response = await fetch("http://localhost:3000/clientes")
      const data = await response.json()
      setClientes(data)
    } catch (error) {
      console.error("Erro ao carregar clientes:", error)
    }
  }

  function carregarPets() {
    getPets()
      .then((dados) => {
        setPets(dados)
      })
      .catch((error) => {
        console.error("Erro ao carregar pets:", error)
      })
  }

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir?")
    if (deletar) {
      deletePet(id)
        .then((resposta) => {
          toast.success(resposta.message)
          carregarPets()
        })
        .catch((error) => {
          toast.error("Erro ao excluir pet.")
        })
    }
  }

  useEffect(() => {
    carregarPets()
    carregarClientes()
  }, [])

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <Button as={Link} to="/pets/novo">
        Adicionar Pet
      </Button>
      <hr />
      {pets ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Porte</th>
              <th>Data de Nascimento</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              const cliente = clientes.find((c) => c.id === pet.clienteId)
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>{new Date(pet.dataNasc).toLocaleDateString()}</td>
                  <td>{cliente ? cliente.nome : "Cliente não encontrado"}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => deletarPet(pet.id)}
                    >
                      Excluir
                    </Button>
                    <Button size="sm" as={Link} to={`/pets/editar/${pet.id}`}>
                      Editar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  )
}

export default Pets
