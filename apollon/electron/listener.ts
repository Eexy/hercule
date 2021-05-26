import { ipcMain } from 'electron';
import newProject from './handlers/new-project';

ipcMain.handle('new project', newProject);
