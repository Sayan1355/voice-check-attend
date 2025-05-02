
import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";

interface TeacherInfoProps {
  name: string;
  subject: string;
  code: string;
  onUpdate?: (name: string, subject: string, code: string) => void;
}

const TeacherInfo: React.FC<TeacherInfoProps> = ({ 
  name, 
  subject, 
  code,
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(!name || name === "Enter Teacher Name");
  const [teacherName, setTeacherName] = useState(name);
  const [subjectName, setSubjectName] = useState(subject);
  const [subjectCode, setSubjectCode] = useState(code);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(teacherName, subjectName, subjectCode);
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      {isEditing ? (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-voice-purple/20">
          <div className="space-y-2">
            <Label htmlFor="teacherName" className="text-voice-purple-dark">Teacher Name</Label>
            <Input 
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Enter your name"
              className="border-voice-purple/30 focus:border-voice-purple"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="subjectName" className="text-voice-purple-dark">Subject</Label>
              <Input 
                id="subjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Subject name"
                className="border-voice-purple/30 focus:border-voice-purple"
              />
            </div>
            <div className="space-y-2 w-1/3">
              <Label htmlFor="subjectCode" className="text-voice-purple-dark">Code</Label>
              <Input 
                id="subjectCode"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="Code"
                className="border-voice-purple/30 focus:border-voice-purple"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSave}
            className="attendance-gradient w-full mt-2"
          >
            <Check className="h-4 w-4 mr-1" /> Start Attendance
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center text-center md:text-left mb-4">
          <div>
            <CardTitle className="text-xl font-bold text-voice-purple-dark">
              {name}
            </CardTitle>
            <CardDescription className="text-base">
              {subject} - <span className="font-semibold">{code}</span>
            </CardDescription>
          </div>
          <div className="text-sm text-right">
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherInfo;
