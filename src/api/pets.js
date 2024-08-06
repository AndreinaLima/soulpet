import axios from "axios"

export async function getPets() {
  const response = await axios.get("http://localhost:3000/pets?_expand=cliente")
  return response.data
}

export async function addPet(data) {
  const response = await axios.post("http://localhost:3000/pets", data)
  return response.data
}

export async function deletePet(id) {
  const response = await axios.delete(`http://localhost:3000/pets/${id}`)
  return response.data
}

export async function getPet(id) {
  const response = await axios.get(`http://localhost:3000/pets/${id}`)
  return response.data
}

export async function updatePet(id, data) {
  const response = await axios.put(`http://localhost:3000/pets/${id}`, data)
  return response.data
}
