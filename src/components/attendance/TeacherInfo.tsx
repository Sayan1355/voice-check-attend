
import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Check } from "lucide-react";

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
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="flex flex-col md:flex-row md:justify-between items-center">
      {isEditing ? (
        <div className="w-full md:w-2/3 space-y-2">
          <Input 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Teacher Name"
            className="border-voice-purple"
          />
          <div className="flex gap-2">
            <Input 
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Subject"
              className="border-voice-purple"
            />
            <Input 
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="Code"
              className="border-voice-purple w-24"
            />
          </div>
          <Button 
            onClick={handleSave}
            size="sm" 
            className="attendance-gradient"
          >
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      ) : (
        <div className="text-center md:text-left mb-4 md:mb-0 flex items-center">
          <div>
            <CardTitle className="text-xl font-bold text-voice-purple-dark">
              {name}
            </CardTitle>
            <CardDescription className="text-base">
              {subject} - <span className="font-semibold">{code}</span>
            </CardDescription>
          </div>
          {onUpdate && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2" 
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 text-voice-purple" />
            </Button>
          )}
        </div>
      )}
      <div className="text-sm text-right">
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TeacherInfo;
