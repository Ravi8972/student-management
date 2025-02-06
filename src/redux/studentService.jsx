export const loadStudents = () => {
  try {
    const localData = localStorage.getItem('students');
    
    if (!localData) {
      return []; 
    }
    
    const parsedData = JSON.parse(localData);
    return parsedData.map(student => ({
      ...student,
      id: Number(student.id)
    }));
    
  } catch (error) {
    console.error('Error loading students:', error);
    return []; 
  }
};

export const saveStudents = (students) => {
  try {
    if (students) {
      localStorage.setItem('students', JSON.stringify(students));
    } else {
      localStorage.removeItem('students');
    }
  } catch (error) {
    console.error('Error saving students:', error);
  }
};
