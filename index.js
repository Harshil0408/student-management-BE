import express from "express";
import './config/config.js'
import { register, login, refreshToken, logout } from "./controllers/authController.js";
import { addGuardianToStudent, addMentor, createStudent, deleteSingleGuardian, deleteSingleMentor, getAllStudents, getSingleGuardian, getSingleMentor, getSingleStudent, updateDemographicsOfStudent, updateGuardian, updateMentor, upsertStudentDemographics } from "./controllers/studentController.js";
import cors from "cors";

const app = express()

const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/refresh-token', refreshToken);
app.post('/api/auth/logout', logout);

app.post('/api/students', createStudent);
app.get('/api/students', getAllStudents);
app.get('/api/students/:id', getSingleStudent)
app.put('/api/students/:id', updateDemographicsOfStudent)

// guardians
app.post('/api/students/:studentId/guardians', addGuardianToStudent)
app.get('/api/students/:studentId/guardians/:guardianId', getSingleGuardian)
app.put('/api/students/:studentId/guardians/:guardianId', updateGuardian)
app.delete('/api/students/:studentId/guardians/:guardianId', deleteSingleGuardian)

//mentors
app.post('/api/students/:studentId/mentors', addMentor)
app.get('/api/students/:studentId/mentors/:mentorId', getSingleMentor)
app.put('/api/students/:studentId/mentors/:mentorId', updateMentor)
app.delete('/api/students/:studentId/mentors/:mentorId', deleteSingleMentor)

app.post('/api/students/:id/demographics', upsertStudentDemographics);
app.put('/api/students/:id/demographics', upsertStudentDemographics);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})