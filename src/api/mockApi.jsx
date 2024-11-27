// src/api/mockApi.js
let users = [
    { id: 1, name: 'Alice', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob', role: 'User', status: 'Inactive' },
];

let roles = [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUsers = async () => {
    await delay(500);
    return [...users];
};

export const fetchRoles = async () => {
    await delay(500);
    return [...roles];
};

const validateUser = (user) => {
    if (!user.name || user.name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
    }
    if (!user.role) {
        throw new Error('Role is required');
    }
    if (!['Active', 'Inactive'].includes(user.status)) {
        throw new Error('Invalid status');
    }
};

const validateRole = (role) => {
    if (!role.name || role.name.trim().length < 2) {
        throw new Error('Role name must be at least 2 characters long');
    }
    if (!Array.isArray(role.permissions) || role.permissions.length === 0) {
        throw new Error('At least one permission is required');
    }
};

export const addUser = async (user) => {
    await delay(500);
    validateUser(user);
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    return newUser;
};

export const updateUser = async (updatedUser) => {
    await delay(500);
    validateUser(updatedUser);
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index === -1) throw new Error('User not found');
    users[index] = updatedUser;
    return updatedUser;
};

export const deleteUser = async (id) => {
    await delay(500);
    users = users.filter(user => user.id !== id);
    return true;
};

export const addRole = async (role) => {
    await delay(500);
    validateRole(role);
    const newRole = { id: roles.length + 1, ...role };
    roles.push(newRole);
    return newRole;
};

export const updateRole = async (updatedRole) => {
    await delay(500);
    validateRole(updatedRole);
    const index = roles.findIndex(role => role.id === updatedRole.id);
    if (index === -1) throw new Error('Role not found');
    roles[index] = updatedRole;
    return updatedRole;
};