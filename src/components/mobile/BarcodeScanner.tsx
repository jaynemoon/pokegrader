import React, { useState, useRef, useEffect } from 'react';
import type { BarcodeScanResult } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface BarcodeScannerProps {
  onScanResult: (result: BarcodeScanResult) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanResult, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Simulate barcode detection after 3 seconds
      setTimeout(() => {
        simulateBarcodeScan();
      }, 3000);

    } catch (err) {
      setError('Camera access denied or not available');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const simulateBarcodeScan = () => {
    // Simulate successful barcode scan
    const mockResults: BarcodeScanResult[] = [
      {
        cardName: 'Charizard',
        set: 'Base Set',
        cardNumber: '4/102',
        rarity: 'Holo Rare'
      },
      {
        cardName: 'Pikachu VMAX',
        set: 'Vivid Voltage',
        cardNumber: '043/185',
        rarity: 'VMAX'
      },
      {
        cardName: 'Blastoise',
        set: 'Base Set',
        cardNumber: '2/102',
        rarity: 'Holo Rare'
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    stopScanning();
    onScanResult(result);
  };

  const handleManualEntry = () => {
    const cardName = prompt('Enter card name:');
    const set = prompt('Enter set name:');
    const cardNumber = prompt('Enter card number:');
    
    if (cardName && set) {
      onScanResult({
        cardName,
        set,
        cardNumber: cardNumber || '',
        rarity: 'Unknown'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Barcode Scanner</h3>
            <Button onClick={onClose} variant="secondary" size="sm">
              Close
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-4">
            {isScanning ? (
              <div className="space-y-4">
                <div className="bg-slate-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-slate-600 mb-2">Position barcode in the center</p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                </div>

                <Button onClick={stopScanning} variant="secondary" className="w-full">
                  Stop Scanning
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-slate-100 rounded-lg p-8" style={{ aspectRatio: '4/3' }}>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-slate-600">Ready to scan barcode</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button onClick={startScanning} variant="primary" className="w-full">
                    Start Camera
                  </Button>
                  
                  <Button onClick={handleManualEntry} variant="secondary" className="w-full">
                    Manual Entry
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-500 text-center">
            Point your camera at the barcode on the Pokemon card package
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BarcodeScanner;