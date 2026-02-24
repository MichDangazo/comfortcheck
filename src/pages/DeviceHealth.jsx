import { useState } from 'react';
import DeviceStatus from '../components/dashboard/DeviceStatus';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ScanModal from '../components/devices/ScanModal';
import { useNotifications } from '../contexts/NotificationContext';

const DeviceHealth = () => {
  const { addNotification } = useNotifications();
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(null);

  const handleScanClick = () => {
    setIsScanModalOpen(true);
  };

  const handleScanComplete = (devicesFound) => {
    setLastScanTime(new Date());
    addNotification({
      type: 'success',
      message: `Scan complete! Found ${devicesFound} new device${devicesFound !== 1 ? 's' : ''}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Device Health Monitoring
            </h1>
            {lastScanTime && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Last scan: {lastScanTime.toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button
            variant="primary"
            onClick={handleScanClick}
          >
            🔍 Scan for Devices
          </Button>
        </div>

        <Card className="mb-6 dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Online Devices</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Warning (Low Battery)</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Offline Devices</div>
            </div>
          </div>
        </Card>

        <DeviceStatus />

        {/* Scan Modal */}
        <ScanModal 
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onScanComplete={handleScanComplete}
        />
      </div>
    </div>
  );
};

export default DeviceHealth;