// src/components/UserForm.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addUser, updateUser, fetchRoles } from '../api/mockApi';

const UserForm = ({ user, setEditingUser, setUsers, onSuccess }) => {
    const [name, setName] = useState(user?.name || '');
    const [role, setRole] = useState(user?.role || '');
    const [status, setStatus] = useState(user?.status || 'Active');
    const [availableRoles, setAvailableRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                setIsLoading(true);
                const roles = await fetchRoles();
                setAvailableRoles(roles);
            } catch (error) {
                console.error('Error loading roles:', error);
                setError('Failed to load roles');
            } finally {
                setIsLoading(false);
            }
        };
        loadRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const newUser = { name, role, status };
        
        try {
            if (user) {
                const updatedUser = await updateUser({ ...user, ...newUser });
                setUsers(users => users.map(u => (u.id === user.id ? updatedUser : u)));
            } else {
                const addedUser = await addUser(newUser);
                setUsers(users => [...users, addedUser]);
            }
            setName('');
            setRole('');
            setStatus('Active');
            onSuccess?.();
        } catch (error) {
            console.error('Error submitting user:', error);
            setError(user ? 'Failed to update user' : 'Failed to add user');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="text-center py-4">Loading roles...</div>;
    if (error) return <div className="text-red-500 p-4 rounded-md bg-red-50">{error}</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="mb-4">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Select a role</option>
                    {availableRoles.map(r => (
                        <option key={r.id} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div className="flex gap-4">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        disabled:bg-blue-300 disabled:cursor-not-allowed`}
                >
                    {isSubmitting ? 'Loading...' : (user ? 'Update' : 'Add')} User
                </button>
                {user && (
                    <button 
                        type="button" 
                        onClick={() => setEditingUser(null)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                )}
            </div>
            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </form>
    );
};

UserForm.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        role: PropTypes.string,
        status: PropTypes.string
    }),
    setEditingUser: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

UserForm.defaultProps = {
    user: null
};

export default UserForm;