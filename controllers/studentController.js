import { Student } from "../models/student.model.js";
import moment from "moment";

export const createStudent = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        const existingUser = await Student.findOne({ 'user_info.email': email });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const student = await Student.create({
            user_info: {
                first_name,
                last_name,
                email
            }
        });

        res.status(201).json({
            count: 1,
            next: null,
            previous: null,
            results: [{
                user: student._id,
                user_info: student.user_info,
                address: student.address || "",
                city: student.city || "",
                county: student.county || "",
                date_of_birth: student.date_of_birth,
                enrollment_status: student.enrollment_status,
                flagged: student.flagged,
                flagged_date: student.flagged_date,
                flagged_notes: student.flagged_notes,
                gender: student.gender || "",
                gender_other: student.gender_other || "",
                guardians: student.guardians || [],
                mentors: student.mentors || [],
                demographicsDetails: student.demographicsDetails || null,
                phone: student.phone || "",
                photo: student.photo,
                referral_source: student.referral_source || "",
                referral_source_other: student.referral_source_other || "",
                state: student.state || "",
                statement: student.statement || "",
                zip_code: student.zip_code || ""
            }]
        });
    } catch (error) {
        console.log('Error in create student controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalStudents = await Student.countDocuments({});

        const students = await Student.find({})
            .skip(skip)
            .limit(limit);

        const formattedStudents = students.map(student => ({
            user: student._id,
            user_info: student.user_info,
            address: student.address || "",
            city: student.city || "",
            county: student.county || "",
            date_of_birth: student.date_of_birth,
            enrollment_status: student.enrollment_status,
            flagged: student.flagged,
            flagged_date: student.flagged_date,
            flagged_notes: student.flagged_notes,
            gender: student.gender || "",
            gender_other: student.gender_other || "",
            guardians: student.guardians || [],
            mentors: student.mentors || [],
            phone: student.phone || "",
            photo: student.photo,
            referral_source: student.referral_source || "",
            referral_source_other: student.referral_source_other || "",
            state: student.state || "",
            statement: student.statement || "",
            zip_code: student.zip_code || ""
        }));

        const totalPages = Math.ceil(totalStudents / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        res.status(200).json({
            count: totalStudents,
            next: nextPage ? `/api/students?page=${nextPage}&limit=${limit}` : null,
            previous: prevPage ? `/api/students?page=${prevPage}&limit=${limit}` : null,
            current_page: page,
            total_pages: totalPages,
            results: formattedStudents
        });
    } catch (error) {
        console.log('Error in get all students controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getSingleStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const formattedStudent = {
            user: student._id,
            user_info: student.user_info,
            address: student.address || "",
            city: student.city || "",
            county: student.county || "",
            date_of_birth: student.date_of_birth,
            enrollment_status: student.enrollment_status,
            flagged: student.flagged,
            flagged_date: student.flagged_date,
            flagged_notes: student.flagged_notes,
            gender: student.gender || "",
            gender_other: student.gender_other || "",
            guardians: student.guardians || [],
            mentors: student.mentors || [],
            demographicsDetails: student.demographicsDetails || null,
            phone: student.phone || "",
            photo: student.photo,
            referral_source: student.referral_source || "",
            referral_source_other: student.referral_source_other || "",
            state: student.state || "",
            statement: student.statement || "",
            zip_code: student.zip_code || ""
        };

        res.status(200).json(formattedStudent);
    } catch (error) {
        console.log('Error in get single student controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateDemographicsOfStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updateFields = req.body;

        if (updateFields.date_of_birth) {
            updateFields.date_of_birth = moment(updateFields.date_of_birth).format('DD-MM-YYYY');
        }

        const student = await Student.findByIdAndUpdate(studentId, updateFields, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.log('Error in update student controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const addGuardianToStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const guardianData = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const guardianEntry = {
            ...guardianData,
            profile: student.user
        };

        student.guardians.push(guardianEntry);
        await student.save();

        res.status(200).json({
            message: "Guardian added successfully",
            guardians: student.guardians
        });
    } catch (error) {
        console.error("Error in addGuardianToStudent:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const updateGuardianToStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        const updatedFields = req.body

        const student = await Student.findByIdAndUpdate(studentId, updatedFields)

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json(student)

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const getSingleGuardian = async (req, res) => {
    try {
        const { studentId, guardianId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const guardian = student.guardians.id(guardianId);
        if (!guardian) return res.status(404).json({ message: 'Guardian not found' });

        res.status(200).json(guardian);
    } catch (error) {
        console.error("Error in getSingleGuardian:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateGuardian = async (req, res) => {
    try {
        const { studentId, guardianId } = req.params;
        const updates = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const guardian = student.guardians.id(guardianId);
        if (!guardian) return res.status(404).json({ message: 'Guardian not found' });

        Object.assign(guardian, updates);
        await student.save();

        res.status(200).json({ message: "Guardian updated successfully", guardian });
    } catch (error) {
        console.error("Error in updateGuardian:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const addMentor = async (req, res) => {
    try {
        const { studentId } = req.params;
        const mentorData = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const mentorWithStudentId = {
            ...mentorData,
            student_id: studentId
        };

        student.mentors.push(mentorWithStudentId);
        await student.save();

        res.status(200).json({ message: "Mentor added successfully", mentors: student.mentors });
    } catch (error) {
        console.error("Error in addMentor:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;
        const updates = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const mentor = student.mentors.id(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        Object.assign(mentor, updates);

        await student.save();

        res.status(200).json({
            message: "Mentor updated successfully",
            mentor: mentor
        });
    } catch (error) {
        console.error("Error in updateMentor:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getSingleMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const mentor = student.mentors.id(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found with given id" });

        res.status(200).json(mentor);
    } catch (error) {
        console.error("Error in getSingleMentor:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteSingleMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const mentor = student.mentors.id(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        student.mentors.pull(mentorId);
        await student.save();

        res.status(200).json({
            message: "Mentor deleted successfully",
            mentors: student.mentors
        });
    } catch (error) {
        console.error("Error in deleteSingleMentor:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteSingleGuardian = async (req, res) => {
    try {
        const { studentId, guardianId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const guardian = student.guardians.id(guardianId);
        if (!guardian) return res.status(404).json({ message: "Guardian not found" });

        guardian.remove();
        await student.save();

        res.status(200).json({
            message: "Guardian deleted successfully",
            guardians: student.guardians
        });
    } catch (error) {
        console.error("Error in deleteSingleGuardian:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const upsertStudentDemographics = async (req, res) => {
    try {
        const studentId = req.params.id;
        const demographics = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.demographicsDetails) {
            student.demographicsDetails = {};
        }
        Object.assign(student.demographicsDetails, demographics);

        await student.save();

        res.status(200).json({
            message: "Demographics saved successfully",
            demographicsDetails: student.demographicsDetails
        });
    } catch (error) {
        console.error("Error in upsertStudentDemographics:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};