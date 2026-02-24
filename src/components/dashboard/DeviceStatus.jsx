import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('all'); // State for toggling views

  // Simulate device data
  useEffect(() => {
    const mockDevices = [
      { id: 1, name: 'Sensor R101', type: 'temperature', status: 'online', battery: 85, lastSeen: '2 min ago' },
      { id: 2, name: 'Sensor R102', type: 'temperature', status: 'online', battery: 92, lastSeen: '1 min ago' },
      { id: 3, name: 'Sensor R103', type: 'temperature', status: 'offline', battery: 0, lastSeen: '2 hours ago' },
      { id: 4, name: 'Sensor R104', type: 'humidity', status: 'online', battery: 67, lastSeen: '3 min ago' },
      { id: 5, name: 'Sensor R105', type: 'temperature', status: 'warning', battery: 15, lastSeen: '5 min ago' },
      { id: 6, name: 'Sensor R106', type: 'humidity', status: 'online', battery: 78, lastSeen: '1 min ago' },
    ];
    setDevices(mockDevices);
  }, []);

  // Filter devices based on status (state-based UI update)
  const filteredDevices = devices.filter(device => {
    if (filter === 'all') return true;
    return device.status === filter;
  });

  // Count devices by status
  const counts = {
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length,
  };

  return (
    <div className="space-y-4">
      {/* Filter toggles - state changes update UI */}
      <div className="flex gap-2">
        {['all', 'online', 'offline', 'warning'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status} {status !== 'all' && `(${counts[status] || 0})`}
          </button>
        ))}
      </div>

      {/* Device list - updates based on filter state */}
      <div className="grid gap-3">
        {filteredDevices.map(device => (
          <Card key={device.id} padding="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{device.name}</div>
                <div className="text-sm text-gray-600">Type: {device.type}</div>
                <div className="text-xs text-gray-500">Last seen: {device.lastSeen}</div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    device.status === 'online' ? 'success' :
                    device.status === 'offline' ? 'danger' : 'warning'
                  }
                  size="sm"
                >
                  {device.status}
                </Badge>
                {device.status !== 'offline' && (
                  <div className="mt-1 text-sm">
                    Battery: {device.battery}%
                    <div className="w-16 h-1 bg-gray-200 rounded mt-1">
                      <div
                        className={`h-1 rounded ${
                          device.battery > 50 ? 'bg-green-500' :
                          device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredDevices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No devices match the selected filter
        </div>
      )}
    </div>
  );
};

export default DeviceStatus;