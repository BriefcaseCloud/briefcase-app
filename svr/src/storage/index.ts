import sqlite3, { Database } from "sqlite3";
import { SampleStorage } from "./sample";

/**
 * Database controller
 *
 * @class IndexDatabase
 */
export class Storage {
  static db: Database;

  /**
   * Open & initialize the DB
   *
   * @class Storage
   * @method init
   * @static
   */
  public static init() {
    // if already open, stop and show error
    if (this.db) {
      console.error("[Storage::init] already initialized, exiting");
      return;
    }
    // open database and call table managers
    console.log("[Storage::init] Opening database.");
    this.db = new (sqlite3.verbose()).Database(":memory:");
    SampleStorage.init(this.db);
  }

  /**
   * Close the DB
   * 
   * @class Storage
   * @method close
   * @static
   */
  public static close() {
    this.db.close();
  }
}
