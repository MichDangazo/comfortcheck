import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatTemperature } from '../../utils/temperature';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  
  // Get preferences
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    temperatureUnit: 'celsius',
  });

  // Generate mock historical data when room changes
  useEffect(() => {
    if (room) {
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
      <div className="room-details-grid">
        <Card className="room-metric-card">
          <p className="metric-label">Temperature</p>
          <p className="metric-value">
            {formatTemperature(room.temperature, preferences.temperatureUnit)}
          </p>
        </Card>
        
        <Card className="room-metric-card">
          <p className="metric-label">Humidity</p>
          <p className="metric-value">
            {room.humidity}%
          </p>
        </Card>
        
        <Card className="room-metric-card">
          <p className="metric-label">Comfort Level</p>
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
      <div className="time-range-selector">
        {['24h', '12h', '6h'].map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`time-range-button ${timeRange === range ? 'active' : ''}`}
          >
            Last {range}
          </button>
        ))}
      </div>

      {/* Temperature chart */}
      <Card className="chart-card">
        <h4 className="chart-title">
          Temperature History
        </h4>
        <div className="chart-container">
          {filteredData.map((point, index) => (
            <div
              key={index}
              className="chart-bar"
            >
              <div
                className="chart-fill chart-temp"
                style={{
                  height: `${(point.temperature / 40) * 150}px`,
                }}
              >
                <div className="chart-label">
                  {formatTemperature(point.temperature, preferences.temperatureUnit)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Humidity chart */}
      <Card>
        <h4 className="chart-title">
          Humidity History
        </h4>
        <div className="chart-container">
          {filteredData.map((point, index) => (
            <div
              key={index}
              className="chart-bar"
            >
              <div
                className="chart-fill chart-humidity"
                style={{
                  height: `${(point.humidity / 100) * 150}px`,
                }}
              >
                <div className="chart-label">
                  {point.humidity}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <div className="modal-actions">
        <button
          onClick={() => {
            alert('Report generation coming soon!');
          }}
          className="action-button secondary"
        >
          📊 Generate Report
        </button>
        <button
          onClick={onClose}
          className="action-button primary"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RoomDetailsModal;