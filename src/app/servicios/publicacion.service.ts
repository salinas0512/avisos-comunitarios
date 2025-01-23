import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core'; 
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'; 
import { Publicacion } from '../modelo/publicacion';

@Injectable({ providedIn: 'root' })
export class PublicacionService{
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection;

  plataforma: string = "";

  DB_NAME: string = "bd_publicaciones";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "publicaciones";

  col_titulo: string = 'titulo';
  col_descripcion: string = 'descripcion';
  col_fecha : string = 'fecha';
  col_foto : string = 'foto';


  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.col_titulo} TEXT NOT NULL,
      ${this.col_descripcion} TEXT NOT NULL,
      ${this.col_fecha} TEXT NOT NULL,
      ${this.col_foto} TEXT NOT NULL
    );`;

  constructor() { 
    this.iniciarPlugin(); // Llamamos a iniciarPlugin en el constructor para abrir la base de datos solo una vez
  }

  // Método para inicializar el plugin y abrir la conexión
  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  // Método para inicializar y abrir la conexión a la base de datos
  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();  // Abre la base de datos solo una vez
    await this.db.execute(this.DB_SQL_TABLAS);  // Ejecuta la creación de la tabla si no existe
  }

  // Abre la conexión a la base de datos
  private async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open()
    console.log("Base de datos abierta correctamente");
  }

  // Método para agregar una publicación nueva
  async agregarPublicacion(titulo: string, descripcion: string, fecha: string, foto: string) {
    const query = `INSERT INTO ${this.TABLE_NAME} (${this.col_titulo}, ${this.col_descripcion}, ${this.col_fecha}, ${this.col_foto}) 
                   VALUES (?, ?, ?, ?)`;
    await this.db.run(query, [titulo, descripcion, fecha, foto]); 
  }

  // Método para obtener todas las publicaciones
  async obtenerPublicaciones(searchTerm: string = ''): Promise<Publicacion[]> {
    let query = `SELECT * FROM ${this.TABLE_NAME}`;
  
    if (searchTerm) {
      // Agregar condiciones para buscar en título, descripción y foto
      query += ` WHERE ${this.col_titulo} LIKE '%${searchTerm}%' OR ${this.col_descripcion} LIKE '%${searchTerm}%' 
      OR ${this.col_fecha} LIKE '%${searchTerm}%' OR ${this.col_foto} LIKE '%${searchTerm}%'`;
    }
  
    const result = await this.db.query(query);  // Ejecuta la consulta de selección
    if (result.values) {
      const publicaciones = result.values.map((row: any) => new Publicacion(row.id, row[this.col_titulo], row[this.col_descripcion],
         row[this.col_fecha], row[this.col_foto]));
      return publicaciones;
    } else {
      return [];
    }
  }

  // Método para eliminar una cita por id
  async eliminarPublicacion(id: number) {
    const query = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(query, [id]);  
  }
}