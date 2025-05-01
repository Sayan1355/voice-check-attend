
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Send } from "lucide-react";

interface Student {
  id: number;
  name: string;
  rollNumber: number;
  present: boolean;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Ravi Kumar", rollNumber: 101, present: false },
    { id: 2, name: "Priya Sharma", rollNumber: 102, present: false },
    { id: 3, name: "Anjali Mehta", rollNumber: 103, present: false },
    { id: 4, name: "Raj Patel", rollNumber: 104, present: false },
    { id: 5, name: "Sanjay Singh", rollNumber: 105, present: false },
    { id: 6, name: "Neha Gupta", rollNumber: 106, present: false },
  ]);
  
  // Sort students by roll number
  const sortedStudents = [...students].sort((a, b) => a.rollNumber - b.rollNumber);

  // Mock teacher data
  const teacherInfo = {
    name: "Dr. Anil Kapoor",
    subject: "Computer Science",
    code: "CS101",
  };

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

  const handleSubmit = () => {
    setSubmitted(true);
    toast({
      title: "Attendance Submitted",
      description: `Submitted attendance for ${students.filter(s => s.present).length} students`,
    });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 animate-fade-in">
      <Card className="mb-6 card-gradient">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <CardTitle className="text-2xl font-bold text-voice-purple-dark">
                {teacherInfo.name}
              </CardTitle>
              <CardDescription className="text-lg">
                {teacherInfo.subject} - <span className="font-semibold">{teacherInfo.code}</span>
              </CardDescription>
            </div>
            <div className="text-sm text-right">
              <p className="font-semibold">Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            onClick={startRecording}
            disabled={isRecording || submitted}
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
          <p className="text-sm text-voice-purple-dark mb-6">
            {isRecording ? "Listening..." : "Tap mic to start voice attendance"}
          </p>
          
          <div className="flex justify-between w-full p-3 bg-voice-yellow-light rounded-lg">
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
      
      <div className="space-y-4">
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
                      disabled={submitted}
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
        
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={submitted}
            className="attendance-gradient hover:opacity-90 transition-opacity px-6"
          >
            <Send className="h-4 w-4 mr-2" />
            {submitted ? "Submitted" : "Submit Attendance"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
