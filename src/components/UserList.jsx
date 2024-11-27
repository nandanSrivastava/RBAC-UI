// src/components/UserList.js
import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api/mockApi';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
            setError('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };

    if (isLoading) return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-center space-x-3 py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-500">Loading users...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center p-4 rounded-lg bg-red-50 border border-red-100">
                <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800">{error}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    User Management
                </h2>
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                    {users.length} Users
                </span>
            </div>

            <div className="px-6">
                <UserForm 
                    user={editingUser} 
                    setEditingUser={setEditingUser} 
                    setUsers={setUsers}
                    onSuccess={() => {
                        loadUsers();
                        setEditingUser(null);
                    }}
                />
            </div>

            <div className="px-6 pb-6">
                {users.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <h3 className="mt-4 text-sm font-medium text-gray-900">No users found</h3>
                        <p className="mt-2 text-sm text-gray-500">Get started by creating a new user.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100 bg-white/50 rounded-xl border border-gray-100 overflow-hidden">
                        {users.map(user => (
                            <li key={user.id} className="p-5 hover:bg-gray-50/50 transition-all duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                <span className="text-blue-700 font-medium text-lg">
                                                    {user.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                            user.status === 'Active' 
                                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                                : 'bg-red-50 text-red-700 border border-red-100'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => setEditingUser(user)}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserList;