import { SaveFile } from "./save-file.use-case";
import fs from 'fs';

describe('SaveFileUseCase', () => {

  beforeEach(() => {
    // clean up
    fs.rmSync('outputs', { recursive: true, force: true });
  });

  afterEach(() => {
    // clean up
    fs.rmSync('outputs', { recursive: true, force: true });
  });
  
  test('should save file with default values', () => {

    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe('test content');


  });

  test('should save file with custom values', () => {

    const options = {
      fileContent: 'custom content',
      fileName: 'custom-table-name',
      destination: 'custom-outputs/file-destination'
    }
    const saveFile = new SaveFile();
    const path = `${options.destination}/${options.fileName}.txt`;

    const result = saveFile.execute(options);

    expect(result).toBeTruthy();
    expect(fs.existsSync(path)).toBeTruthy();
    expect(fs.readFileSync(path, 'utf-8')).toBe(options.fileContent);

  });

});