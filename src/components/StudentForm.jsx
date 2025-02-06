import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../redux/studentsSlice";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { FaTimes, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

const StudentForm = ({ open, onClose, student }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    totalMarks: "",
    address: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id.toString(),
        originalId: student.id,
        name: student.name,
        totalMarks: student.totalMarks.toString(),
        address: student.address,
      });
    } else {
      setFormData({
        id: "",
        name: "",
        totalMarks: "",
        address: "",
        originalId: null,
      });
    }
  }, [student, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const idNumber = Number(formData.id);

    const isDuplicate = students.some(
      (s) => s.id === idNumber && (!student || s.id !== student.id)
    );

    if (isDuplicate) {
      toast.error("Student ID already exists!");
      return;
    }
    if (isNaN(idNumber) || idNumber <= 0) {
      toast.error("Please enter a valid numeric ID");
      return;
    }

    const marks = Number(formData.totalMarks);
    if (isNaN(marks) || marks < 0 || marks > 500) {
      toast.error("Total Marks must be between 0 and 500!");
      return;
    }

    const percentage = ((marks / 500) * 100).toFixed(2);
    const payload = {
      ...formData,
      id: idNumber,
      totalMarks: marks,
      percentage: Number(percentage),
    };

    try {
      if (student) {
        dispatch(updateStudent(payload));
        toast.success("Student updated successfully!");
      } else {
        dispatch(addStudent(payload));
        toast.success("Student added successfully!");
      }
      onClose();
    } catch (error) {
      toast.error("Error saving student: " + error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="student-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "90%",
          maxWidth: "500px",
          bgcolor: "background.paper",
          borderRadius: "16px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FaTimes
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            cursor: "pointer",
            color: "#6B7280",
            fontSize: "1.5rem",
          }}
          onClick={onClose}
        />

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {student ? "Edit Student" : "Add New Student"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <div>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Student Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>

            <div>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Student ID
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                error={
                  isNaN(formData.id) ||
                  students.some(
                    (s) =>
                      s.id === Number(formData.id) &&
                      (!student || s.id !== student.id)
                  )
                }
                helperText={
                  isNaN(formData.id)
                    ? "Must be a valid number"
                    : students.some(
                        (s) =>
                          s.id === Number(formData.id) &&
                          (!student || s.id !== student.id)
                      )
                    ? "ID already exists"
                    : ""
                }
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>

            <div>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Total Marks (0 - 500)
              </Typography>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                inputProps={{ max: 500, min: 0 }}
                value={formData.totalMarks}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (Number(value) >= 0 && Number(value) <= 500)
                  ) {
                    setFormData({ ...formData, totalMarks: value });
                  }
                }}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>

            <div>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Student Address
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<FaSave />}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {student ? "Update Student" : "Create Student"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentForm;
