// src/components/RoleForm.js
import { useState } from 'react';
import { addRole, updateRole } from '../api/mockApi';
import PropTypes from 'prop-types';

const RoleForm = ({ role, setEditingRole, setRoles, onSuccess }) => {
    const [name, setName] = useState(role ? role.name : '');
    const [permissions, setPermissions] = useState(role ? role.permissions : []);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        const newRole = { name, permissions: permissions.filter(p => p.trim()) };
        
        try {
            if (role) {
                const updatedRole = await updateRole({ ...role, ...newRole });
                setRoles(roles => roles.map(r => (r.id === role.id ? updatedRole : r)));
            } else {
                const addedRole = await addRole(newRole);
                setRoles(roles => [...roles, addedRole]);
            }
            setName('');
            setPermissions([]);
            onSuccess?.();
        } catch (error) {
            console.error('Error submitting role:', error);
            setError(role ? 'Failed to update role' : 'Failed to add role');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePermissionChange = (e) => {
        const perms = e.target.value.split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);
        setPermissions(perms);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="mb-4">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Role Name" 
                    required 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-6">
                <input 
                    value={permissions.join(', ')} 
                    onChange={handlePermissionChange}
                    placeholder="Permissions (comma separated)" 
                    required 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="flex gap-4">
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : (role ? 'Update' : 'Add')} Role
                </button>
                {role && (
                    <button 
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setEditingRole(null)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                            disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                )}
            </div>
            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </form>
    );
};

RoleForm.propTypes = {
    role: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string)
    }),
    setEditingRole: PropTypes.func.isRequired,
    setRoles: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

RoleForm.defaultProps = {
    role: null,
    onSuccess: () => {}
};

export default RoleForm;