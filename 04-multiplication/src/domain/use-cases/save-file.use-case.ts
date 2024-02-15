import fs from 'fs';

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export interface SaveFileUseCase { 
  execute: (options: SaveFileOptions) => boolean;
}

export class SaveFile implements SaveFileUseCase {

  constructor() {
    /**
     * DI - Dependency Injection
     * - repository
     */
  }

  execute({fileName = 'table', fileContent, destination = 'outputs'}: SaveFileOptions) {
    try {
      fs.mkdirSync(destination, { recursive: true })
      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent, { encoding: 'utf-8'});      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}