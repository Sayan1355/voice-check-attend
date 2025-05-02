import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import TeacherInfo from './attendance/TeacherInfo';
import StudentList from './attendance/StudentList';
import RecordingControls from './attendance/RecordingControls';

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
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Ravi Kumar", rollNumber: 101, present: false },
    { id: 2, name: "Priya Sharma", rollNumber: 102, present: false },
    { id: 3, name: "Anjali Mehta", rollNumber: 103, present: false },
    { id: 4, name: "Raj Patel", rollNumber: 104, present: false },
    { id: 5, name: "Sanjay Singh", rollNumber: 105, present: false },
    { id: 6, name: "Neha Gupta", rollNumber: 106, present: false },
  ]);
  
  // Default empty teacher data for user to fill in
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    subject: "",
    code: "",
  });

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  const toggleRecording = () => {
    // Don't allow recording if teacher info is not set
    if (!teacherInfo.name || !teacherInfo.subject || !teacherInfo.code) {
      toast({
        title: "Teacher info required",
        description: "Please enter your name and subject details first",
      });
      return;
    }
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    
    toast({
      title: "Recording Started",
      description: "Voice attendance is now active",
    });
    
    // Create an interval that will mark a student present every 2 seconds
    const interval = setInterval(() => {
      markRandomStudent();
    }, 2000);
    
    setRecordingInterval(interval);
  };
  
  const markRandomStudent = () => {
    // Find students who haven't been marked yet
    const unmarkedStudents = students.filter(s => !s.present);
    
    if (unmarkedStudents.length === 0) {
      // All students have been marked, stop recording
      stopRecording();
      return;
    }
    
    // Select a random student from those not yet marked
    const randomIndex = Math.floor(Math.random() * unmarkedStudents.length);
    markStudentPresent(unmarkedStudents[randomIndex].id);
    
    // If this was the last student, stop recording
    if (unmarkedStudents.length === 1) {
      stopRecording();
    }
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    toast({
      title: "Recording Stopped",
      description: "Voice attendance marking paused",
    });
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
    
    // Ensure recording stops when submitting
    if (isRecording) {
      stopRecording();
    }
    
    toast({
      title: "Attendance Submitted",
      description: `Submitted attendance for ${students.filter(s => s.present).length} students`,
    });
  };

  const updateTeacherInfo = (name: string, subject: string, code: string) => {
    setTeacherInfo({
      name,
      subject,
      code
    });
    
    toast({
      title: "Teacher Info Updated",
      description: "Teacher details have been saved",
    });
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Card className="mb-4 shadow-sm border border-gray-200">
        <CardHeader>
          <TeacherInfo 
            name={teacherInfo.name} 
            subject={teacherInfo.subject} 
            code={teacherInfo.code} 
            onUpdate={updateTeacherInfo}
          />
        </CardHeader>
        {(teacherInfo.name && teacherInfo.subject && teacherInfo.code) && (
          <CardContent className="flex flex-col items-center">
            <RecordingControls 
              isRecording={isRecording}
              submitted={submitted}
              presentCount={students.filter(s => s.present).length}
              totalCount={students.length}
              onToggleRecording={toggleRecording}
            />
          </CardContent>
        )}
      </Card>
      
      {(teacherInfo.name && teacherInfo.subject && teacherInfo.code) && (
        <div className="space-y-4">
          <StudentList 
            students={students}
            submitted={submitted}
            isRecording={isRecording}
            onMarkPresent={markStudentPresent}
          />
          
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={submitted || isRecording || students.filter(s => s.present).length === 0}
              className="attendance-gradient hover:opacity-90 transition-opacity px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitted ? "Submitted" : "Submit Attendance"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
