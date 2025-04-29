import mongoose from "mongoose";

const guardianInfoSchema = new mongoose.Schema({
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    email: {
        type: String,
        default: "",
    },
    first_name: { type: String, default: "" },
    household_income: { type: String, default: "" },
    id: { type: Number, default: 0 },
    is_additional: { type: Boolean, default: false },
    last_name: { type: String, default: "" },
    phone: {
        type: String,
        default: "",
    },
    snap_benifits: { type: Boolean, default: false },
    state: { type: String, default: "" },
    zip_code: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const guardianSchema = new mongoose.Schema({
    autorized_pickup: { type: Boolean, default: false },
    custody: { type: Boolean, default: false },
    custody_form: { type: String, default: null },
    custody_notes: { type: String, default: "" },
    emergency_contact: { type: Boolean, default: false },
    guardian: guardianInfoSchema,
    id: { type: Number, default: 0 },
    legal_rights: { type: Boolean, default: false },
    profile: { type: Number, default: 0 },
    receives_mail: { type: Boolean, default: false },
    relationship: { type: String, default: "" }
}, { timestamps: true });

const mentorSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    relationship: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip_code: { type: String, default: "" },
    referral_source: { type: String, default: "" },
    proximity: { type: String, default: "" },
    expertise: { type: String, default: "" },
    marital_status: { type: String, default: "" },
    work_status: { type: String, default: "" },
    status: { type: String, default: "" },
    type: { type: String, default: "" },
    screened_date: { type: Date, default: null },
    employer: { type: String, default: "" },
    background_checked: { type: Boolean, default: false },
    trained: { type: Boolean, default: false },
    matched: { type: Boolean, default: false },
    status_notes: { type: String, default: '' }
})


const demographicSchema = new mongoose.Schema({
    hair_color: { type: String, default: "" },
    eye_color: { type: String, default: "" },
    wear_contacts: { type: Boolean, default: false },
    wear_glasses: { type: Boolean, default: false },
    has_children: { type: Boolean, default: false },
    has_legal_history: { type: Boolean, default: false },
    scars_marks_tattoos: { type: String, default: "" },
    weight: { type: String, default: "" },
    race_ethnicity: { type: String, default: "" },
    language: { type: String, default: "" },
    height: { type: String, default: "" },
})

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    user_info: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
    },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    county: { type: String, default: "" },
    date_of_birth: { type: Date, default: null },
    enrollment_status: { type: String, default: null },
    flagged: { type: Boolean, default: false },
    flagged_date: { type: Date, default: null },
    flagged_notes: { type: String, default: null },
    gender: { type: String, default: "" },
    gender_other: { type: String, default: "" },
    guardians: { type: [guardianSchema], default: [] },
    mentors: { type: [mentorSchema], default: [] },
    demographicsDetails: { type: demographicSchema, default: null },
    phone: {
        type: String,
        default: "",

    },
    photo: { type: String, default: null },
    referral_source: { type: String, default: "" },
    referral_source_other: { type: String, default: "" },
    state: { type: String, default: "" },
    statement: { type: String, default: "" },
    zip_code: {
        type: String,
        default: "",
    }
}, { timestamps: true });

export const Student = mongoose.model('Student', studentSchema);