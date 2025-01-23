export class Publicacion {
    constructor(
      public id: number,
      public titulo: string,
      public descripcion: string,
      public fecha: Date,
      public foto?: string,
    ) {}
  }