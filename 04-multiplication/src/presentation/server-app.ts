import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  fileName: string;
  destination: string;
}

export class ServerApp {

  static run({base, limit, show, fileName, destination}: RunOptions) {
    console.log('Server running...');

    const table = new CreateTable().execute({base, limit});
    const wasSaved = new SaveFile().execute({
      fileName,
      fileContent: table,
      destination,
    });

    (wasSaved) ? console.log('file created') : console.error('file not created');

    if (show === true) {
      console.log(table);
      
    }

  }

}