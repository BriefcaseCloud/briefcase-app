import { Database } from "sqlite3";

export class SampleStorage {
  static db: Database;

  /**
   * Creates
   */
  public static init(db: Database) {
    this.db = db;

    this.db.serialize(() => {
      this.db.run("CREATE TABLE lorem (info TEXT)");

      var stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();
    });
  }

  public static read() {
    this.db.each("SELECT rowid AS id, info FROM lorem", (err: any, row: any) => {
        if (err) {
            console.error("[SampleStorage::read] failed due to error: ", err);
            return
        }
        console.log(row.id + ": " + row.info);
    });
  }
}
