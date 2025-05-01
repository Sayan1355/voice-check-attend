
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff } from "lucide-react";

interface Student {
  id: number;
  name: string;
  present: boolean;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Ravi Kumar", present: false },
    { id: 2, name: "Priya Sharma", present: false },
    { id: 3, name: "Anjali Mehta", present: false },
    { id: 4, name: "Raj Patel", present: false },
    { id: 5, name: "Sanjay Singh", present: false },
    { id: 6, name: "Neha Gupta", present: false },
  ]);

  const startRecording = () => {
    setIsRecording(true);
    
    // Simulate speech recognition
    toast({
      title: "Listening...",
      description: "Say a student's name to mark them present",
    });
    
    // Simulate a delay and recognition
    setTimeout(() => {
      // Select a random student to mark present
      const randomIndex = Math.floor(Math.random() * students.length);
      markStudentPresent(students[randomIndex].id);
      setIsRecording(false);
    }, 2000);
  };
  
  const markStudentPresent = (id: number) => {
    setStudents(students.map(student => {
      if (student.id === id) {
        const newStatus = !student.present;
        
        toast({
          title: newStatus ? "Attendance Marked" : "Attendance Removed",
          description: `${student.name} is marked ${newStatus ? "present" : "absent"}`,
        });
        
        return { ...student, present: newStatus };
      }
      return student;
    }));
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 animate-fade-in">
      <Card className="mb-6 card-gradient">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-voice-purple-dark">
            Voice Attendance System
          </CardTitle>
          <CardDescription>
            Say a student's name to mark them present
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            onClick={startRecording}
            disabled={isRecording}
            className={`w-20 h-20 rounded-full mb-4 attendance-gradient
              ${isRecording ? 'voice-recording' : 'hover:opacity-90'}`}
            aria-label="Start recording"
          >
            {isRecording ? (
              <Mic className="h-10 w-10 text-white animate-pulse" />
            ) : (
              <Mic className="h-10 w-10 text-white" />
            )}
          </Button>
          <p className="text-sm text-voice-purple-dark">
            {isRecording ? "Listening..." : "Tap mic to start"}
          </p>
          
          <div className="flex justify-between w-full mt-6 p-3 bg-voice-yellow-light rounded-lg">
            <div className="text-sm">
              <span className="font-semibold">Total:</span> {students.length} students
            </div>
            <div className="text-sm">
              <span className="font-semibold">Present:</span> {students.filter(s => s.present).length} students
            </div>
            <div className="text-sm">
              <span className="font-semibold">Absent:</span> {students.filter(s => !s.present).length} students
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <Card 
            key={student.id}
            className={`transition-all duration-300 hover:shadow-md ${
              student.present 
                ? 'border-l-4 border-l-green-500 bg-voice-green-light' 
                : 'border-l-4 border-l-gray-300'
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-voice-purple-light">
                  {student.name.charAt(0)}
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
                  onClick={() => markStudentPresent(student.id)}
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

export default Dashboard;
