import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';  // Add this import!

const ScanModal = ({ isOpen, onClose, onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devicesFound, setDevicesFound] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Simulate scanning progress
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            setScanComplete(true);
            const found = 0; // No devices found as requested
            setDevicesFound(found);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [scanning]);

  // Handle scan completion separately to avoid state update during render
  useEffect(() => {
    if (scanComplete && onScanComplete) {
      onScanComplete(devicesFound);
    }
  }, [scanComplete, devicesFound, onScanComplete]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setDevicesFound(0);
    setScanComplete(false);
  };

  const resetAndClose = () => {
    setScanning(false);
    setProgress(0);
    setDevicesFound(0);
    setScanComplete(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Device Scanner">
      <div className="space-y-6">
        {!scanning && !scanComplete && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to scan for new IoT devices on the network
            </p>
            <Button onClick={startScan} variant="primary" size="lg">
              Start Scan
            </Button>
          </div>
        )}

        {scanning && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4 animate-pulse">📡</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Scanning for devices... {progress}%
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Looking for compatible sensors...
            </p>
          </div>
        )}

        {scanComplete && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No Devices Found
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No new IoT devices detected on the network.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                🔍 Tips:
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-5 space-y-1">
                <li>Check if devices are powered on</li>
                <li>Verify devices are connected to the network</li>
                <li>Ensure devices are broadcasting their presence</li>
                <li>Try scanning again in a few moments</li>
              </ul>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={startScan} variant="primary">
                Scan Again
              </Button>
              <Button onClick={resetAndClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ScanModal;