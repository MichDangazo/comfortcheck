import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { fetchClassrooms } from '../services/mockData';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRooms(fetchClassrooms());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Classrooms
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <Card 
            key={room.id}
            className="cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {room.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Temperature: {room.temperature}°C
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Comfort: {room.comfort}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;