import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/src/lib/db';

// GET: Obtener todos los usuarios
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

// POST: Crear un nuevo usuario
// POST: Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const users = await getUsers();

    // Si hay usuarios, buscamos el ID más alto y le sumamos 1. 
    // Si no hay usuarios, empezamos en 1.
    const nuevoId = users.length > 0 
      ? Math.max(...users.map((u: any) => Number(u.id) || 0)) + 1 
      : 1;

    const newUser = {
      id: nuevoId.toString(), // Lo guardamos como string para que sea compatible con tu frontend
      name: body.name,
      email: body.email,
      username: body.username,
    };

    users.push(newUser);
    await saveUsers(users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 400 });
  }
}