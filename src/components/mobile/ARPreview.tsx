import React, { useState, useRef, useEffect } from 'react';
import type { AROverlay } from '../../types';
import Button from '../ui/Button';

interface ARPreviewProps {
  onAnalyzeWithAR: () => void;
  arOverlay: AROverlay;
  setAROverlay: (overlay: AROverlay) => void;
}

const ARPreview: React.FC<ARPreviewProps> = ({ onAnalyzeWithAR, arOverlay, setAROverlay }) => {
  const [isARActive, setIsARActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startAR = async () => {
    try {
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsARActive(true);
      setAROverlay({ isActive: true });

      // Simulate AR detection after 2 seconds
      setTimeout(() => {
        simulateARDetection();
      }, 2000);

    } catch (err) {
      setError('Camera access required for AR mode');
    }
  };

  const stopAR = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsARActive(false);
    setAROverlay({ isActive: false });
  };

  const simulateARDetection = () => {
    // Simulate card detection and grade estimation
    const estimatedGrade = 7 + Math.random() * 3; // 7-10 range
    const confidence = 75 + Math.random() * 20; // 75-95% range

    setAROverlay({
      isActive: true,
      gradeInfo: {
        estimatedGrade: Math.round(estimatedGrade * 10) / 10,
        confidence: Math.round(confidence)
      }
    });

    // Draw AR overlay on canvas
    drawAROverlay();
  };

  const drawAROverlay = () => {
    if (!canvasRef.current || !arOverlay.gradeInfo) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw card detection box
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 100, 200, 280);

    // Draw grade info overlay
    ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
    ctx.fillRect(60, 110, 180, 80);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Estimated Grade:', 70, 130);
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${arOverlay.gradeInfo.estimatedGrade}`, 70, 155);

    ctx.font = '12px Arial';
    ctx.fillText(`${arOverlay.gradeInfo.confidence}% confidence`, 70, 175);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">AR Preview Mode</h3>
        <Button
          onClick={isARActive ? stopAR : startAR}
          variant={isARActive ? "secondary" : "primary"}
        >
          {isARActive ? 'Stop AR' : 'Start AR'}
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {isARActive && (
        <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          
          <canvas
            ref={canvasRef}
            width={320}
            height={240}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {arOverlay.gradeInfo && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
              <div className="text-sm font-medium">Estimated Grade</div>
              <div className="text-2xl font-bold">{arOverlay.gradeInfo.estimatedGrade}</div>
              <div className="text-xs opacity-90">{arOverlay.gradeInfo.confidence}% confidence</div>
              
              <Button
                onClick={() => {
                  onAnalyzeWithAR();
                  stopAR();
                }}
                variant="primary"
                size="sm"
                className="mt-2 w-full"
              >
                Analyze Card
              </Button>
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-sm mb-2">Point camera at Pokemon card</p>
            <div className="w-48 h-2 bg-white bg-opacity-30 rounded-full">
              <div className="h-full bg-white rounded-full transition-all duration-1000" 
                   style={{ width: arOverlay.gradeInfo ? '100%' : '20%' }}></div>
            </div>
          </div>
        </div>
      )}

      {!isARActive && (
        <div className="bg-slate-100 rounded-lg p-8 text-center" style={{ aspectRatio: '4/3' }}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4">📷</div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">AR Grade Preview</h4>
            <p className="text-slate-600 mb-4">
              Use your camera to get instant grade estimates before full analysis
            </p>
            <Button onClick={startAR} variant="primary">
              Start AR Mode
            </Button>
          </div>
        </div>
      )}

      <div className="text-xs text-slate-500">
        <p className="mb-1">📱 <strong>AR Features:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Real-time grade estimation</li>
          <li>Card edge detection</li>
          <li>Condition analysis overlay</li>
          <li>Quick capture and analyze</li>
        </ul>
      </div>
    </div>
  );
};

export default ARPreview;