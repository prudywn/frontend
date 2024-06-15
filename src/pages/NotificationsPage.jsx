// NotificationsPage.js
import React from 'react';
import NotificationList from '../components/notifications';

const NotificationsPage = () => {
  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      <NotificationList />
    </div>
  );
};

export default NotificationsPage;
