// src/App.js
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import './index.css';

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                RBAC Dashboard
                            </h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <UserList />
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <RoleList />
                    </div>
                </div>
            </main>

            <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        RBAC Admin Dashboard © {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;