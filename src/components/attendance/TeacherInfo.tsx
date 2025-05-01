
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface TeacherInfoProps {
  name: string;
  subject: string;
  code: string;
}

const TeacherInfo: React.FC<TeacherInfoProps> = ({ name, subject, code }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <CardTitle className="text-2xl font-bold text-voice-purple-dark">
          {name}
        </CardTitle>
        <CardDescription className="text-lg">
          {subject} - <span className="font-semibold">{code}</span>
        </CardDescription>
      </div>
      <div className="text-sm text-right">
        <p className="font-semibold">Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
      </div>
    </div>
  );
};

export default TeacherInfo;
