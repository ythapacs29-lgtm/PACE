// Fixed relative dates keep the presentation scenario reproducible.
export const mockCanvasData = {
  student: { name: 'Maya', university: 'Your academic workspace' },
  courses: ['Calculus II', 'General Chemistry', 'English Composition', 'Computer Science'],
  assignments: [
    { id: 'calc', course: 'Calculus II', title: 'Calculus Problem Set', dueInDays: 0, dueLabel: 'Tonight, 11:59 PM', estimatedMinutes: 50, type: 'assignment', importance: 1.5, completed: false },
    { id: 'chem', course: 'General Chemistry', title: 'Chemistry Exam', dueInDays: 2, dueLabel: 'In 2 days', estimatedMinutes: 150, type: 'exam', importance: 1.4, completed: false },
    { id: 'essay', course: 'English Composition', title: 'English Essay', dueInDays: 4, dueLabel: 'In 4 days', estimatedMinutes: 120, type: 'essay', importance: 1, completed: false },
    { id: 'cs', course: 'Computer Science', title: 'CS Lab', dueInDays: 5, dueLabel: 'In 5 days', estimatedMinutes: 75, type: 'lab', importance: 1, completed: false },
  ],
};
