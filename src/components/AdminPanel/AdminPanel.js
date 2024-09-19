import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.scss';
import { ToastContainer, toast } from 'react-toastify';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [error, setError] = useState(null);

    
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5050/admin/users/${userId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
    
            // Remove the user from the frontend state
            setUsers(users.filter(user => user.id !== userId));
    
            // Show success notification
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
    
            // Show error notification
            toast.error('Failed to delete user');
        }
    };
    
    
    // Fetch Users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5050/admin/users');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []);

    // Fetch Appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const role = 'admin'; // Example role, adjust based on your authentication system
                const response = await fetch(`http://localhost:5050/appointments?role=${role}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    setAppointments(data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setError(error.message);
            } finally {
                setLoadingAppointments(false);
            }
        };
    
        fetchAppointments();
    }, []);
    

        
    

    // Delete Appointment
    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:5050/appointments/${appointmentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete appointment');
            }

            // Update the state to remove the deleted appointment from the list
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            toast.success('Appointment deleted successfully!');
        } catch (error) {
            console.error('Error deleting appointment:', error);
            toast.error('Failed to delete appointment');
        }
    };

    // Determine if the appointment is past or upcoming
    const getAppointmentStatus = (appointmentDate) => {
        const now = new Date();
        const appointmentDateTime = new Date(appointmentDate);
        return appointmentDateTime < now ? 'Complete' : 'Pending';
    };

    if (loadingUsers || loadingAppointments) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <ToastContainer />

            <h2>Users</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Appointments</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Appointment Name</th>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.repair_name}</td>
                            <td>{appointment.user_id}</td>
                            <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                            <td>{getAppointmentStatus(appointment.appointment_date)}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteAppointment(appointment.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
