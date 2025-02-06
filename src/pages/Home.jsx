import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Button,
  IconButton,
  Typography,
  Container,
  Box,
  useMediaQuery,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import StudentForm from "../components/StudentForm";
import { deleteStudent } from "../redux/studentsSlice";

const Home = () => {
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const isMdScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1074px)"
  );
 
  // const sortedStudents = [...students]?.sort((a, b) => {
  //   const idA = Number(a.id);
  //   const idB = Number(b.id);
  //   return idA - idB;
  // });
  
  

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 6, md: 4 }, px: { xs: 2, sm: 4 }, background: "#f8f9fa" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          mb: { xs: 4, md: 8 },
          padding: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
          color: "var(--text-primary)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" },
            fontWeight: 800,
            color: "white",
            textAlign: { xs: "center", md: "left" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Student Management System
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenModal(true)}
          sx={{
            width: { xs: "100%", md: "auto" },
            bgcolor: "white",
            color: "#6366f1",
            transition: "background 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(90deg, #6366f1 0%, #a855f7 100%)",
              color: "white",
            },
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 3,
            px: 4,
            py: 1.5,
          }}
        >
          Add New Student
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          rowGap: 5,
          columnGap: 5,
          alignItems: "stretch",
          gridAutoRows: "1fr",
        }}
      >
        {students?.map((student) => (
          <Paper
            key={student.id}
            sx={{
              p: 3,
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: 4,
              borderLeft: "4px solid #6366f1",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                display: "flex",
                gap: 1,
                background: "rgba(255,255,255,0.9)",
                borderRadius: 2,
                p: 0.5,
                boxShadow: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  setSelectedStudent(student);
                  setOpenModal(true);
                }}
                color="primary"
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(var(--primary-color), 0.1)",
                  },
                }}
              >
                <FaEdit style={{ fontSize: "1.25rem" }} />
              </IconButton>
              <IconButton
                onClick={() => dispatch(deleteStudent(student.id))}
                color="error"
                sx={{
                  "&:hover": {
                    bgcolor: "#fee2e2",
                  },
                }}
              >
                <FaTrash style={{ fontSize: "1.2rem" }} />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="h5"
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#1e293b",
                  pr: 4,
                  mb: 1,
                  lineHeight: 1.3,
                  display: "block",
                }}
              >
                {isMdScreen && student.name.length > 10 ? (
                  <>
                    {student.name.substring(0, 10)}-
                    <br />
                    {student.name.substring(10)}
                  </>
                ) : (
                  student.name
                )}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  ID:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#1e293b",
                    fontSize: "1rem",
                  }}
                >
                  {student.id}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f1f5f9",
                  p: 1.5,
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Total Marks
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#1e293b",
                      fontSize: "1.2rem",
                    }}
                  >
                    {student.totalMarks}/500
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background:
                      student.percentage >= 50
                        ? "var(--success-bg)"
                        : "var(--error-bg)",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        student.percentage >= 50
                          ? "var(--success-color)"
                          : "var(--error-color)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {student.percentage}%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    mb: 0.5,
                  }}
                >
                  Address
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#475569",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {student.address}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <StudentForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </Container>
  );
};

export default Home;
