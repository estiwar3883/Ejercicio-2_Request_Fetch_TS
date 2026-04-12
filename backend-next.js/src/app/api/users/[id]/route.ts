import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/src/lib/db';

interface User {
  id: string | number;
  name: string;
  email: string;
  username?: string;
}

// GET: Obtener un solo usuario por ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const users: User[] = await getUsers();
    const { id } = await params;
    const idBusca = id.trim();

    // Buscamos al usuario con la misma lógica de limpieza que usas en DELETE/PUT
    const user = users.find((u) => String(u.id).trim() === idBusca);

    if (!user) {
      // Devolvemos un 404 con un JSON válido para que el frontend no falle al procesarlo
      return NextResponse.json(
        { error: "Usuario no encontrado", idBuscado: idBusca },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor al buscar" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un usuario existente
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const users: User[] = await getUsers();
    const { id } = await params;
    const idBusca = id.trim();
    
    const index = users.findIndex((u) => String(u.id).trim() === idBusca);

    if (index === -1) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Mantenemos el ID original para evitar que se pierda o cambie a undefined
    users[index] = { ...users[index], ...body, id: users[index].id };
    await saveUsers(users);

    return NextResponse.json(users[index]);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 400 });
  }
}

// DELETE: Eliminar un usuario
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const users: User[] = await getUsers();
    const { id } = await params;
    const idBusca = id.trim();

    const filteredUsers = users.filter((u) => String(u.id).trim() !== idBusca);

    if (users.length === filteredUsers.length) {
      return NextResponse.json({ 
        error: "Usuario no encontrado",
        idRecibido: idBusca
      }, { status: 404 });
    }

    await saveUsers(filteredUsers);
    
    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}