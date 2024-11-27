// src/components/RoleList.js
import { useEffect, useState } from 'react';
import { fetchRoles } from '../api/mockApi';
import RoleForm from './RoleForm';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [editingRole, setEditingRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRoles = async () => {
        try {
            setIsLoading(true);
            const data = await fetchRoles();
            setRoles(data);
        } catch (error) {
            console.error('Error loading roles:', error);
            setError('Failed to load roles');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    if (isLoading) return (
        <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading roles...</p>
        </div>
    );

    if (error) return (
        <div className="text-red-500 p-4 rounded-md bg-red-50 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Role Management</h2>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {roles.length} Roles
                </span>
            </div>

            <RoleForm 
                role={editingRole} 
                setEditingRole={setEditingRole} 
                setRoles={setRoles}
                onSuccess={() => {
                    loadRoles();
                    setEditingRole(null);
                }}
            />

            {roles.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new role.</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow overflow-hidden">
                    {roles.map(role => (
                        <li key={role.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                            <span className="text-purple-600 font-medium">
                                                {role.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {role.permissions.map((permission, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                                                >
                                                    {permission}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setEditingRole(role)}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoleList;