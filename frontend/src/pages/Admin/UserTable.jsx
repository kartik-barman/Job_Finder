import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer' }
  ]);

  const handleEdit = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
    // Implement edit logic
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Admin' 
                          ? 'bg-red-100 text-red-800' 
                          : user.role === 'Editor' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
                        aria-label="Edit user"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                        aria-label="Delete user"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;