
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
      <Button 
        disabled={submitted} 
        onClick={onToggleRecording}
        className={`w-14 h-14 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'attendance-gradient hover:opacity-90'}`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </Button>
      
      <p className="text-sm text-voice-purple my-3">
        {isRecording ? "Recording active" : "Click to start"}
      </p>
      
      <div className="flex justify-between w-full p-2 bg-gray-50 rounded-lg text-center text-sm">
        <div className="w-1/3">
          <span className="font-medium">{totalCount}</span> total
        </div>
        <div className="text-green-600 w-1/3">
          <span className="font-medium">{presentCount}</span> present
        </div>
        <div className="text-red-500 w-1/3">
          <span className="font-medium">{totalCount - presentCount}</span> absent
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;
