import { ProfileModel } from '../models/ProfileModel';
import { Profile } from '../models/Profile';

export const saveProfile = async (profileData: Partial<Profile>) => {
    const newProfile = new ProfileModel(profileData);
    return await newProfile.save();
};

export const getProfiles = async () => {
    return await ProfileModel.find();
};

export const getProfileById = async (id: string) => {
    return await ProfileModel.findById(id);
};

export const deleteProfileById = async (id: string) => {
    return await ProfileModel.findByIdAndDelete(id);
};

export const filterProfiles = async (query: any) => {
    const filters: any = {};
    if (query.name) filters.name = { $regex: new RegExp(query.name, 'i') };
    if (query.gender) filters.gender = { $regex: new RegExp(query.gender, 'i') };
    if (query.age_group) filters.age_group = { $regex: new RegExp(query.age_group, 'i') };
    if (query.country_id) filters.country_id = { $regex: new RegExp(query.country_id, 'i') };


    return await ProfileModel.find(filters);
};


export const getProfileByName = async (name: string) => {
    return await ProfileModel.findOne({ name: name.toLowerCase() });
};
