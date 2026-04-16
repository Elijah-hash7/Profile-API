import mongoose, { Schema } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';
import { Profile } from './Profile';

const profileSchema = new Schema({
    _id: { type: String, default: uuidv7 }, 
    name: { type: String, required: true, unique: true, lowercase: true },
    gender: { type: String, required: true },
    gender_probability: { type: Number, required: true },
    sample_size: { type: Number, required: true },
    age: { type: Number, required: true },
    age_group: { type: String, required: true },
    country_id: { type: String, required: true },
    country_probability: { type: Number, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

profileSchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);
