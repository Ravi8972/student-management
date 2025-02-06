import { createSlice,current  } from '@reduxjs/toolkit';
import { loadStudents, saveStudents } from './studentService';

const initialState = {
  students: loadStudents(),
};

//console.log('Initial students:', initialState.students);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      saveStudents(current(state.students));
    },
    updateStudent: (state, action) => {
      const updatedStudents = state.students.map(student => 
        student.id === action.payload.originalId ? { ...student, ...action.payload } : student
      );
      state.students = updatedStudents;
      saveStudents(state.students);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
      saveStudents(state.students);
    }
  }
});

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;