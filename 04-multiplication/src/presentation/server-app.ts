import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
}

export class ServerApp {

  static run({base, limit, show}: RunOptions) {
    console.log('Server running...');

    const table = new CreateTable().execute({base, limit});
    const wasSaved = new SaveFile().execute({
      fileContent: table,
      destination: `outputs/table_${base}`,
    });

    (wasSaved) ? console.log('file created') : console.log('file not created');

    if (show === true) {
      console.log(table);
      
    }

  }

}