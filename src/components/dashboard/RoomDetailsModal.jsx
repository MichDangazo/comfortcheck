import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatTemperature } from '../../utils/temperature';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
  console.log('🏠 RoomDetailsModal - isOpen:', isOpen, 'room:', room); // Debug log

  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  
  // Get preferences
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    temperatureUnit: 'celsius',
  });

  // Generate mock historical data when room changes
  useEffect(() => {
    if (room) {
      console.log('🏠 Generating historical data for room:', room.name); // Debug log
      const mockHistorical = [];
      const now = new Date();
      for (let i = 0; i < 24; i++) {
        const time = new Date(now - i * 60 * 60 * 1000);
        mockHistorical.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: room.temperature + (Math.random() * 4 - 2),
          humidity: Math.min(90, Math.max(30, room.humidity + Math.floor(Math.random() * 11 - 5))),
        });
      }
      setHistoricalData(mockHistorical.reverse());
    }
  }, [room]);

  if (!room) {
    console.log('🏠 No room provided - returning null'); // Debug log
    return null;
  }

  // Filter data based on selected time range
  const filteredData = historicalData.slice(
    timeRange === '24h' ? 0 :
    timeRange === '12h' ? 12 :
    timeRange === '6h' ? 18 : 0
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${room.name} - Detailed View`}
    >
      {/* Rest of your modal content... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Temperature</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatTemperature(room.temperature, preferences.temperatureUnit)}
          </p>
        </Card>
        
        <Card className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Humidity</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {room.humidity}%
          </p>
        </Card>
        
        <Card className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Comfort Level</p>
          <div className="mt-1">
            <Badge
              variant={
                room.comfort === 'comfortable' ? 'success' :
                room.comfort === 'warm' ? 'warning' : 'danger'
              }
              size="md"
            >
              {room.comfort}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Time range selector */}
      <div className="mb-4 flex gap-2">
        {['24h', '12h', '6h'].map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Last {range}
          </button>
        ))}
      </div>

      {/* Temperature chart */}
      <Card className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Temperature History
        </h4>
        <div className="h-48 flex items-end space-x-1">
          {filteredData.map((point, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group"
            >
              <div className="relative w-full">
                <div
                  className="bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
                  style={{
                    height: `${(point.temperature / 40) * 150}px`,
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    {formatTemperature(point.temperature, preferences.temperatureUnit)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {point.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Humidity chart */}
      <Card>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Humidity History
        </h4>
        <div className="h-48 flex items-end space-x-1">
          {filteredData.map((point, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group"
            >
              <div className="relative w-full">
                <div
                  className="bg-green-500 hover:bg-green-600 transition-all rounded-t"
                  style={{
                    height: `${(point.humidity / 100) * 150}px`,
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    {point.humidity}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {point.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => {
            alert('Report generation coming soon!');
          }}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          📊 Generate Report
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RoomDetailsModal;