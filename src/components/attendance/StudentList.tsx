
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface Student {
  id: number;
  name: string;
  rollNumber: number;
  present: boolean;
}

interface StudentListProps {
  students: Student[];
  submitted: boolean;
  isRecording: boolean;
  onMarkPresent: (id: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  submitted, 
  isRecording, 
  onMarkPresent 
}) => {
  // Sort students by roll number
  const sortedStudents = [...students].sort((a, b) => a.rollNumber - b.rollNumber);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
      <h3 className="font-medium text-base mb-2 text-voice-purple-dark">Student Attendance</h3>
      <div className="grid grid-cols-1 gap-1">
        {sortedStudents.map((student) => (
          <Card 
            key={student.id}
            className={`transition-all hover:shadow-sm border-l-4 ${
              student.present 
                ? 'border-l-green-500 bg-green-50' 
                : 'border-l-gray-200'
            }`}
          >
            <CardContent className="p-2 flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-7 h-7 rounded-full flex items-center justify-center mr-2 bg-voice-purple-light text-xs">
                  {student.rollNumber}
                </span>
                <span className={`text-sm ${student.present ? 'font-medium' : ''}`}>
                  {student.name}
                </span>
              </div>
              <div className="flex items-center">
                <Badge
                  variant={student.present ? "default" : "outline"}
                  className={student.present ? "bg-green-500 hover:bg-green-600 text-xs" : "text-xs"}
                >
                  {student.present ? "Present" : "Absent"}
                </Badge>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="ml-1 p-1 h-auto"
                  disabled={submitted || isRecording}
                  onClick={() => onMarkPresent(student.id)}
                >
                  {student.present ? (
                    <MicOff className="h-3 w-3 text-voice-purple" />
                  ) : (
                    <Mic className="h-3 w-3 text-voice-purple" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
