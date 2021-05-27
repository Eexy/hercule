import { ipcMain } from 'electron';
import joinProject from './handlers/join-project';
import newProject from './handlers/new-project';

ipcMain.handle('new project', newProject);

ipcMain.handle('join project', joinProject);
