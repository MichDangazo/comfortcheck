import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatTemperature } from '../utils/temperature';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get preferences
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    temperatureUnit: 'celsius',
  });

  useEffect(() => {
    // Simple mock data
    const mockRooms = [
      { id: 1, name: "Room 101", temperature: 23.5, humidity: 55, comfort: "comfortable" },
      { id: 2, name: "Room 102", temperature: 27.2, humidity: 62, comfort: "warm" },
      { id: 3, name: "Room 103", temperature: 31.8, humidity: 70, comfort: "hot" },
      { id: 4, name: "Room 104", temperature: 22.1, humidity: 48, comfort: "comfortable" },
      { id: 5, name: "Room 105", temperature: 26.5, humidity: 58, comfort: "warm" },
      { id: 6, name: "Room 106", temperature: 29.4, humidity: 65, comfort: "hot" },
      { id: 7, name: "Room 107", temperature: 24.0, humidity: 52, comfort: "comfortable" },
      { id: 8, name: "Room 108", temperature: 28.1, humidity: 60, comfort: "warm" },
    ];

    const foundRoom = mockRooms.find(r => r.id === parseInt(roomId));
    
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      navigate('/');
    }
    setLoading(false);
  }, [roomId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {room.name} - Details
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Temperature</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatTemperature(room.temperature, preferences.temperatureUnit)}
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {room.humidity}%
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 dark:text-gray-400">Comfort Level</p>
              <Badge
                variant={
                  room.comfort === 'comfortable' ? 'success' :
                  room.comfort === 'warm' ? 'warning' : 'danger'
                }
                size="lg"
              >
                {room.comfort}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoomDetails;