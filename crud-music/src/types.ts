export interface autor {
  nombre: string
  pais: string
  periodo: string 
  foto_url: string
  id: string
  obras: obra[]
}

export interface obra {
  titulo: string
  tipo: string
  anio: number
  id: string
  autor_id: string
}