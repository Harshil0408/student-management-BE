import mongoose from 'mongoose';

// Subdocument schema for profile_info
const profileInfoSchema = new mongoose.Schema({
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
}, { _id: false });

const applicationStatusSchema = new mongoose.Schema({
    profile_info: { type: profileInfoSchema, default: () => ({}) },
    staff_member_info: { type: String, default: '' },
    status: { type: String, default: null },
    reason: { type: String, default: null },
    reason_other: { type: String, default: null },
    timestamp: { type: String, default: null },

    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },

    staff_member: { type: String, default: null },
}, { timestamps: true });

export const applicationStatus = mongoose.model('applicationStatus', applicationStatusSchema);

applicationStatus.collection.indexes()
    .then(indexes => {
        const badIndex = indexes.find(i => i.key && i.key.student === 1);
        if (badIndex) {
            return applicationStatus.collection.dropIndex("student_1")
                .then(() => console.log("✅ Dropped invalid index student_1"))
                .catch(err => console.error("❌ Failed to drop index:", err));
        }
    })
    .catch(err => {
        console.error("Failed to fetch indexes:", err);
    });
