import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Appointments.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointmentDetails, setNewAppointmentDetails] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [editAppointmentId, setEditAppointmentId] = useState(null);
    const [editDetails, setEditDetails] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user) {
            navigate('/login'); // Redirect guests to login
            return; // Return early to stop execution if no user is found
        }
    
        const fetchAppointments = async () => {
            try {
                const userId = user.id;  // Ensure user ID exists in the stored user object
                const role = user.role;  // Ensure role exists in the stored user object
                console.log('Fetching appointments for userId:', userId);
                console.log('Role:', role);
                
                const response = await fetch(`http://localhost:5050/appointments?userId=${userId}&role=${role}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
    
                const data = await response.json();
                console.log('Fetched Appointments:', data);  // Log the fetched data
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
    
        fetchAppointments();  // Call the fetchAppointments function
    
    }, [navigate]);  // Keep navigate in the dependency array
    
        

        
    const handleAppointment = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            // Format the appointment date and time using dayjs
            const formattedDate = dayjs(`${appointmentDate} ${appointmentTime}`).format('YYYY-MM-DD HH:mm:ss');
            
            const response = await fetch('http://localhost:5050/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    repair_name: newAppointmentDetails,
                    appointment_date: formattedDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }

            const createdAppointment = await response.json();
            setAppointments([...appointments, createdAppointment]);
            setNewAppointmentDetails('');
            setAppointmentDate('');
            setAppointmentTime('');
            toast.success('Appointment created successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1150);        } catch (error) {
            console.error('Error creating appointment:', error);
            toast.error('Error creating appointment');
        }
    };

    const handleEditAppointment = async (id) => {
        try {
            await fetch(`http://localhost:5050/appointments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ repair_name: editDetails }),
            });

            setAppointments(appointments.map((appointment) =>
                appointment.id === id ? { ...appointment, repair_name: editDetails } : appointment
            ));
            setEditAppointmentId(null);
            setEditDetails('');
            toast.success('Appointment updated successfully');
        } catch (error) {
            console.error('Error editing appointment:', error);
            toast.error('Error updating appointment');
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await fetch(`http://localhost:5050/appointments/${id}`, {
                method: 'DELETE',
            });

            setAppointments(appointments.filter((appointment) => appointment.id !== id));
            toast.success('Appointment deleted successfully');
        } catch (error) {
            console.error('Error deleting appointment:', error);
            toast.error('Error deleting appointment');
        }
    };

    return (
        <div className={styles.appointments}>
            <ToastContainer />
            <h1>Manage Your Appointments</h1>
            <div className={styles.appointmentForm}>
                <input
                    type="text"
                    value={newAppointmentDetails}
                    onChange={(e) => setNewAppointmentDetails(e.target.value)}
                    placeholder="Enter appointment details"
                />
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    placeholder="Appointment Date"
                />
                <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    placeholder="Appointment Time"
                />
                <button onClick={handleAppointment}>Book Appointment</button>
            </div>

            <h2>Your Appointments</h2>
            <ul className={styles.appointmentsList}>
                {appointments.length > 0 ? appointments.map((appointment) => (
                    <li key={appointment.id}> 
                        <div className={styles.appointmentDetails}>
                            {editAppointmentId === appointment.id ? (
                                <input
                                    type="text"
                                    value={editDetails}
                                    className={styles.editInput}
                                    onChange={(e) => setEditDetails(e.target.value)}
                                />
                            ) : (
                                <span>{appointment.repair_name} - {new Date(appointment.appointment_date).toLocaleDateString()} {new Date(appointment.appointment_date).toLocaleTimeString()}</span>
                            )}
                        </div>
                        <div className={styles.appointmentActions}>
                            {editAppointmentId === appointment.id ? (
                                <>
                                    <button
                                        className={styles.saveButton}
                                        onClick={() => handleEditAppointment(appointment.id)}
                                    >
                                        Save
                                    </button>
                                    <button onClick={() => setEditAppointmentId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            setEditAppointmentId(appointment.id);
                                            setEditDetails(appointment.repair_name);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                )) : <p>No appointments found.</p>}
            </ul>
        </div>
    );
};

export default Appointments;
