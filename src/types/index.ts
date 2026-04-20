export interface Posicion {
  id: string;
  texto: string;
  descripcion?: string;
}

export interface TopLista {
  id: string;
  titulo: string;
  posiciones: Posicion[];
  creadoEn: string;
}