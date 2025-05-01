
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
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-lg mb-3 text-voice-purple-dark">Student Attendance</h3>
      <div className="grid grid-cols-1 gap-2">
        {sortedStudents.map((student) => (
          <Card 
            key={student.id}
            className={`transition-all duration-300 hover:shadow-md ${
              student.present 
                ? 'border-l-4 border-l-green-500 bg-voice-green-light' 
                : 'border-l-4 border-l-gray-300'
            }`}
          >
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-voice-purple-light">
                  {student.rollNumber}
                </div>
                <span className={student.present ? 'font-medium' : ''}>{student.name}</span>
              </div>
              <div className="flex items-center">
                <Badge
                  variant={student.present ? "default" : "outline"}
                  className={student.present ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {student.present ? "Present" : "Absent"}
                </Badge>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="ml-2"
                  disabled={submitted || isRecording}
                  onClick={() => onMarkPresent(student.id)}
                >
                  {student.present ? (
                    <MicOff className="h-4 w-4 text-voice-purple" />
                  ) : (
                    <Mic className="h-4 w-4 text-voice-purple" />
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
