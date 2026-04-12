import fs from 'fs/promises';
import path from 'path';

// Ruta absoluta al archivo JSON
const filePath = path.join(process.cwd(), 'src/data/users.json');

export async function getUsers() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, devuelve un array vacío
    return [];
  }
}

export async function saveUsers(users: any[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}