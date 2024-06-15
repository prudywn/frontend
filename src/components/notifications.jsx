import React from 'react';
import { useNotifications } from '../components/contexts/Notification';

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notifications-list">
      {notifications.map((notification) => (
        <div key={notification._id} className="notification-item">
          {notification.type === 'like' && <p>Someone liked your post</p>}
          {notification.type === 'comment' && <p>Someone commented on your post</p>}
          {notification.type === 'follow' && <p>Someone followed you</p>}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
