"use strict";
const state = {
    selectedUserId: null,
    currentUsers: [],
};
const API_BASE = '/api';
window.addEventListener('load', () => {
    getAllUsers();
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
function getInput(id) {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Input ${id} no encontrado`);
    }
    return element;
}
function showResponse(data, isError = false, message = '') {
    const responseDiv = document.getElementById('response');
    if (!responseDiv)
        return;
    const responseClass = isError ? 'error' : 'success';
    responseDiv.innerHTML = `
    <div class="response ${responseClass}">
      <h3>${isError ? '❌ Error' : '✅ Éxito'}</h3>
      ${message ? `<p><strong>${message}</strong></p>` : ''}
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </div>
  `;
}
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    if (!usersList)
        return;
    if (!Array.isArray(users) || users.length === 0) {
        usersList.innerHTML = '<p style="color: #999;">No hay usuarios disponibles</p>';
        return;
    }
    usersList.innerHTML = users
        .map((user) => `
        <div class="user-item ${user.id === state.selectedUserId ? 'selected' : ''}" data-id="${user.id}">
          <h3>#${user.id} - ${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Username: ${user.username ?? 'N/A'}</p>
        </div>
      `)
        .join('');
    usersList.querySelectorAll('.user-item').forEach((item) => {
        item.addEventListener('click', () => {
            const id = Number(item.dataset.id);
            const user = users.find((u) => u.id === id);
            if (user) {
                selectUser(user);
            }
        });
    });
}
function selectUser(user) {
    state.selectedUserId = user.id;
    getInput('userId').value = String(user.id);
    getInput('userName').value = user.name;
    getInput('userEmail').value = user.email;
    getInput('userUsername').value = user.username ?? '';
    displayUsers(state.currentUsers);
}
async function getAllUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        const result = (await response.json());
        if (response.ok && result.data) {
            state.currentUsers = result.data;
            displayUsers(result.data);
            showResponse(result.data, false, 'Usuarios cargados correctamente');
        }
        else {
            showResponse(result, true, 'Error al obtener usuarios');
        }
    }
    catch (error) {
        showResponse({ error: error.message }, true, 'Error de conexión');
    }
}
async function getOneUser() {
    const id = getInput('userId').value;
    if (!id) {
        showResponse({ error: 'Proporciona un ID' }, true, 'Campo requerido');
        return;
    }
    try {
        const response = await fetch(`${API_BASE}/users/${id}`);
        const result = (await response.json());
        if (response.ok && result.data) {
            selectUser(result.data);
            showResponse(result.data, false, 'Usuario encontrado');
        }
        else {
            showResponse(result, true, 'Error al obtener usuario');
        }
    }
    catch (error) {
        showResponse({ error: error.message }, true, 'Error de conexión');
    }
}
async function createUser() {
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
        const result = (await response.json());
        if (response.ok && result.data) {
            showResponse(result.data, false, 'Usuario creado correctamente');
            getInput('userName').value = '';
            getInput('userEmail').value = '';
            getInput('userUsername').value = '';
            getInput('userId').value = '';
            getAllUsers();
        }
        else {
            showResponse(result, true, 'Error al crear usuario');
        }
    }
    catch (error) {
        showResponse({ error: error.message }, true, 'Error de conexión');
    }
}
async function updateUser() {
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
        const result = (await response.json());
        if (response.ok && result.data) {
            showResponse(result.data, false, 'Usuario actualizado correctamente');
            getAllUsers();
        }
        else {
            showResponse(result, true, 'Error al actualizar usuario');
        }
    }
    catch (error) {
        showResponse({ error: error.message }, true, 'Error de conexión');
    }
}
async function deleteUser() {
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
        const result = (await response.json());
        if (response.ok) {
            showResponse(result, false, 'Usuario eliminado correctamente');
            getInput('userName').value = '';
            getInput('userEmail').value = '';
            getInput('userUsername').value = '';
            getInput('userId').value = '';
            state.selectedUserId = null;
            getAllUsers();
        }
        else {
            showResponse(result, true, 'Error al eliminar usuario');
        }
    }
    catch (error) {
        showResponse({ error: error.message }, true, 'Error de conexión');
    }
}
