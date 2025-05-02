
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface RecordingControlsProps {
  isRecording: boolean;
  submitted: boolean;
  presentCount: number;
  totalCount: number;
  onToggleRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({ 
  isRecording, 
  submitted, 
  presentCount,
  totalCount,
  onToggleRecording 
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4">
        <Button 
          disabled={submitted} 
          onClick={onToggleRecording}
          className={`w-16 h-16 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'attendance-gradient hover:opacity-90'}`}
        >
          {isRecording ? (
            <MicOff className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </Button>
      </div>
      
      <p className="text-sm text-voice-purple mb-3">
        {isRecording ? "Recording active - Click to stop" : "Click mic to start voice attendance"}
      </p>
      
      <div className="flex justify-between w-full p-2 bg-voice-yellow-light/50 rounded-lg text-center">
        <div className="text-sm w-1/3">
          <span className="font-medium">{totalCount}</span> total
        </div>
        <div className="text-sm text-green-600 w-1/3">
          <span className="font-medium">{presentCount}</span> present
        </div>
        <div className="text-sm text-red-500 w-1/3">
          <span className="font-medium">{totalCount - presentCount}</span> absent
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;
