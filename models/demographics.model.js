import mongoose from "mongoose";

const demographicsSchema = new mongoose.Schema({
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    profile_info: {
        first_name: { type: String, },
        last_name: { type: String, },
        email: { type: String, unique: true }
    },
    hair_color: { type: String, default: "" },
    eye_color: { type: String, default: "" },
    wears_contacts: { type: Boolean, default: false },
    contacts_color: { type: String, default: "" },
    wears_glasses: { type: Boolean, default: false },
    height: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    scars_marks_tattoos: { type: String, default: "" },
    race_ethnicity: { type: String, default: "" },
    language: { type: String, default: "" },
    language_other: { type: String, default: "" },
    has_children: { type: Boolean, default: false },
    has_legal_history: { type: Boolean, default: false },
    legal_history_notes: { type: String, default: "" },
    legal_history_file: { type: String, default: null }
}, { timestamps: true });

export const Demographics = mongoose.model('Demographics', demographicsSchema);
