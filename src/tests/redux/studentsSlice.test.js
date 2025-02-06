import studentsReducer, { addStudent, updateStudent, deleteStudent } from '../../redux/studentsSlice';
import { loadStudents, saveStudents } from '../../redux/studentService';
import cloneDeep from 'lodash.clonedeep';

jest.mock('../../redux/studentService', () => ({
    saveStudents: jest.fn(),
    loadStudents: jest.fn(() => []),
  }));

describe('studentsSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = cloneDeep({
      students: [
        { id: 1, name: 'John Doe', totalMarks: 450, address: '123 Street' },
        { id: 2, name: 'Jane Smith', totalMarks: 400, address: '456 Avenue' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

test('should add a student', () => {
    const newStudent = { id: 3, name: 'New Student', totalMarks: 500, address: '789 Road' };
    const action = addStudent(newStudent);
    const nextState = studentsReducer(initialState, action);
  
    expect(nextState.students).toHaveLength(3);
    expect(nextState.students).toContainEqual(newStudent);
    // Check if saveStudents was called with the expected plain array
    expect(saveStudents).toHaveBeenCalledWith(nextState.students);
  });


  test('should update an existing student', () => {
    const updatedStudent = { id: 1, name: 'John Doe Updated', totalMarks: 470, address: '123 Street' };

    const action = updateStudent({ ...updatedStudent, originalId: 1 });
    const nextState = studentsReducer(initialState, action);

    const cleanedStudents = nextState.students.map(({ originalId, ...rest }) => rest);

    expect(cleanedStudents).toContainEqual(updatedStudent);
    expect(saveStudents).toHaveBeenCalledWith(nextState.students); // No need for JSON.parse(JSON.stringify())
  });

  test('should delete a student', () => {
    const action = deleteStudent(1);
    const nextState = studentsReducer(initialState, action);

    expect(nextState.students).toHaveLength(1);
    expect(nextState.students).not.toContainEqual(initialState.students[0]);
    expect(saveStudents).toHaveBeenCalledWith(nextState.students); // No need for JSON.parse(JSON.stringify())
  });

  test('should handle empty students array', () => {
    initialState.students = [];

    const newStudent = { id: 3, name: 'New Student', totalMarks: 500, address: '789 Road' };

    const action = addStudent(newStudent);
    const nextState = studentsReducer(initialState, action);

    expect(nextState.students).toHaveLength(1);
    expect(nextState.students).toContainEqual(newStudent);
    expect(saveStudents).toHaveBeenCalledWith(nextState.students); // No need for JSON.parse(JSON.stringify())
  });
});