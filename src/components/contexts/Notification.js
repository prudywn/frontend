import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastNotified, setLastNotified] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications'); // Endpoint to fetch notifications
        setNotifications(response.data);

        if (lastNotified) {
          const newNotifications = response.data.filter(
            notification => new Date(notification.createdAt) > new Date(lastNotified)
          );

          newNotifications.forEach(notification => {
            alertNotification(notification);
          });

          if (newNotifications.length > 0) {
            setLastNotified(newNotifications[0].createdAt);
          }
        } else if (response.data.length > 0) {
          setLastNotified(response.data[0].createdAt);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [lastNotified]);

  const alertNotification = (notification) => {
    if (notification.type === 'like') {
      alert('Someone liked your post');
    } else if (notification.type === 'comment') {
      alert('Someone commented on your post');
    } else if (notification.type === 'follow') {
      alert('Someone followed you');
    }
  };

  const value = useMemo(() => ({
    notifications,
    setNotifications
  }), [notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
