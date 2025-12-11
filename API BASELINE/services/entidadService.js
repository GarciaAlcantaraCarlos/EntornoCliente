import { API } from "./api.js"

export function getEntidads(){
  return API.get('/entidad')
}

export function getEntidadByID(id){
  return API.get('/entidad/'+id)
}

export function postEntidad(entidad){
  return API.post('/entidad', entidad);
}

export function putEntidad(entidad){
  return API.put('/entidad/'+entidad._id, entidad);
}

export function deleteEntidadByID(id){
  return API.delete('/entidad/'+id)
}