import { SaveFile } from "./save-file.use-case";
import fs from 'fs';

describe('SaveFileUseCase', () => {

  beforeEach(() => {
    // clean up
    fs.rmSync('outputs', { recursive: true, force: true });
    jest.clearAllMocks(); // este funciona solo para funciones meckeadas
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

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'test content'
    }
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error creating directory');
    });
    
    const result = saveFile.execute(options);
    
    expect(result).toBeFalsy();
    
    mkdirSpy.mockRestore();
  });

  test('should return false if file could not be written', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'test content'
    }
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Error writing file');
    });

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();

    writeFileSyncMock.mockRestore();
  });

});