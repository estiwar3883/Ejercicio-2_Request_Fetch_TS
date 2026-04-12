type User = {
  id: number | string;
  name: string;
  email: string;
  username?: string;
};

type ApiResult<T> = {
  NombreApi?: string;
  data: T;
  error: string | null;
  status: number;
};

const state = {
  selectedUserId: null as number | null | string,
  currentUsers: [] as User[],
};
const API_BASE = '/api';

window.addEventListener('load', () => {
  void getAllUsers();

  document.getElementById('createBtn')?.addEventListener('click', () => {
    void createUser();
  });
  document.getElementById('updateBtn')?.addEventListener('click', () => {
    void updateUser();
  });
  document.getElementById('deleteBtn')?.addEventListener('click', () => {
    void deleteUser();
  });
  document.getElementById('getAllBtn')?.addEventListener('click', () => {
    void getAllUsers();
  });
  document.getElementById('getOneBtn')?.addEventListener('click', () => {
    void getOneUser();
  });
});

function getInput(id: string): HTMLInputElement {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`Input ${id} no encontrado`);
  }
  return element;
}

function showResponse(data: unknown, isError = false, message = ''): void {
  const responseDiv = document.getElementById('response');
  if (!responseDiv) return;

  const responseClass = isError ? 'error' : 'success';
  responseDiv.innerHTML = `
    <div class="response ${responseClass}">
      <h3>${isError ? 'Error' : 'Éxito'}</h3>
      ${message ? `<p><strong>${message}</strong></p>` : ''}
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </div>
  `;
}

function displayUsers(users: User[]): void {
  const usersList = document.getElementById('usersList');
  if (!usersList) return;

  if (!Array.isArray(users) || users.length === 0) {
    usersList.innerHTML = '<p style="color: #999;">No hay usuarios disponibles</p>';
    return;
  }

  usersList.innerHTML = users
    .map((user) => {
      // Validación para evitar el 'undefined' en el ID
      const userId = user.id !== undefined && user.id !== null ? user.id : 'S/N';
      const isSelected = String(user.id) === String(state.selectedUserId);

      return `
        <div class="user-item ${isSelected ? 'selected' : ''}" data-id="${user.id}">
          <h3>#${userId} - ${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Username: ${user.username ?? 'N/A'}</p>
        </div>
      `;
    })
    .join('');

  usersList.querySelectorAll<HTMLDivElement>('.user-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      const user = users.find((u) => String(u.id) === String(id));
      if (user) {
        selectUser(user);
      }
    });
  });
}

function selectUser(user: User): void {
  state.selectedUserId = user.id;
  getInput('userId').value = String(user.id ?? '');
  getInput('userName').value = user.name;
  getInput('userEmail').value = user.email;
  getInput('userUsername').value = user.username ?? '';
  displayUsers(state.currentUsers);
}

// Extrae datos tanto si vienen en .data como si vienen directos
function extractData<T>(result: any): T {
  if (result && typeof result === 'object' && 'data' in result) {
    return result.data;
  }
  return result;
}

async function getAllUsers(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/users`);
    const result = await response.json();
    const data = extractData<User[]>(result);

    if (response.ok && Array.isArray(data)) {
      state.currentUsers = data;
      displayUsers(data);
      showResponse(data, false, 'Usuarios cargados correctamente');
    } else {
      showResponse(result, true, 'Error al obtener usuarios');
    }
  } catch (error) {
    showResponse({ error: (error as Error).message }, true, 'Error de conexión');
  }
}

async function getOneUser(): Promise<void> {
  const id = getInput('userId').value;
  if (!id) {
    showResponse({ error: 'Proporciona un ID' }, true, 'Campo requerido');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/${id}`);
    const result = await response.json();
    const data = extractData<User>(result);

    if (response.ok && data) {
      selectUser(data);
      showResponse(data, false, 'Usuario encontrado');
    } else {
      showResponse(result, true, 'Error al obtener usuario');
    }
  } catch (error) {
    showResponse({ error: (error as Error).message }, true, 'Error de conexión');
  }
}

async function createUser(): Promise<void> {
  const name = getInput('userName').value;
  const email = getInput('userEmail').value;
  const username = getInput('userUsername').value;

  if (!name || !email) {
    showResponse({ error: 'Nombre y email son requeridos' }, true, 'Campos requeridos');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, username }),
    });
    const result = await response.json();
    const data = extractData<User>(result);

    if (response.ok && data) {
      showResponse(data, false, 'Usuario creado correctamente');
      clearInputs();
      void getAllUsers();
    } else {
      showResponse(result, true, 'Error al crear usuario');
    }
  } catch (error) {
    showResponse({ error: (error as Error).message }, true, 'Error de conexión');
  }
}

async function updateUser(): Promise<void> {
  const id = getInput('userId').value;
  const name = getInput('userName').value;
  const email = getInput('userEmail').value;
  const username = getInput('userUsername').value;

  if (!id) {
    showResponse({ error: 'Selecciona un usuario para actualizar' }, true, 'ID requerido');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, username }),
    });
    const result = await response.json();
    const data = extractData<User>(result);

    if (response.ok && data) {
      showResponse(data, false, 'Usuario actualizado correctamente');
      void getAllUsers();
    } else {
      showResponse(result, true, 'Error al actualizar usuario');
    }
  } catch (error) {
    showResponse({ error: (error as Error).message }, true, 'Error de conexión');
  }
}

async function deleteUser(): Promise<void> {
  const id = getInput('userId').value;

  if (!id) {
    showResponse({ error: 'Selecciona un usuario para eliminar' }, true, 'ID requerido');
    return;
  }

  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();

    if (response.ok) {
      showResponse(result, false, 'Usuario eliminado correctamente');
      clearInputs();
      state.selectedUserId = null;
      void getAllUsers();
    } else {
      showResponse(result, true, 'Error al eliminar usuario');
    }
  } catch (error) {
    showResponse({ error: (error as Error).message }, true, 'Error de conexión');
  }
}

function clearInputs(): void {
  getInput('userName').value = '';
  getInput('userEmail').value = '';
  getInput('userUsername').value = '';
  getInput('userId').value = '';
}