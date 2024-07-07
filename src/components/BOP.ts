export interface Equipment {
    id: number
    acronimo: string
}

export interface BOPData {
  bop_id: number;
  sonda: string;
  valvulas: string[];
  preventores: string[];
}