import React from 'react';
import EventCard from './EventCard';

const Events = () => {
  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {[1, 1, 1, 1].map((item, index) => (
        <EventCard key={index} />
      ))}
    </div>
  );
};

export default Events;
