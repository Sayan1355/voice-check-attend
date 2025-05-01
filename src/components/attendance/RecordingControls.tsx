
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="flex flex-col items-center">
      <div className="mb-6">
        {/* Toggle recording on/off button */}
        <ToggleGroup type="single" value={isRecording ? "on" : "off"}>
          <ToggleGroupItem 
            value="on" 
            disabled={submitted} 
            onClick={onToggleRecording}
            className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'attendance-gradient hover:opacity-90'} flex items-center justify-center`}
          >
            {isRecording ? (
              <MicOff className="h-10 w-10 text-white" />
            ) : (
              <Mic className="h-10 w-10 text-white" />
            )}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <p className="text-sm text-voice-purple-dark mb-6">
        {isRecording ? "Recording active - Click to stop" : "Click mic to start voice attendance"}
      </p>
      
      <div className="flex justify-between w-full p-3 bg-voice-yellow-light rounded-lg">
        <div className="text-sm">
          <span className="font-semibold">Total:</span> {totalCount} students
        </div>
        <div className="text-sm">
          <span className="font-semibold">Present:</span> {presentCount} students
        </div>
        <div className="text-sm">
          <span className="font-semibold">Absent:</span> {totalCount - presentCount} students
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;
