// src/controllers/profileController.ts
import { Request, Response } from 'express';
import { generateProfile } from '../services/ProfileService';
import { saveProfile, getProfiles, getProfileById, deleteProfileById, filterProfiles, getProfileByName } from '../repositories/profileRepository';

export const createProfile = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (name === undefined || name === null) {
            return res.status(400).json({
                status: 'error',
                message: 'name is required'
            });
        }
        
        if (typeof name !== 'string') {
            return res.status(422).json({
                status: 'error',
                message: 'name must be a string'
            });
        }

        if (name.trim() === '') {
            return res.status(400).json({
                status: 'error',
                message: 'name is required'
            });
        }

        const existingProfile = await getProfileByName(name);
        if (existingProfile) {
            return res.status(200).json({
                status: 'success',
                message: 'Profile already exists',
                data: existingProfile
            });
        }

        const profileData = await generateProfile(name);

        const savedProfile = await saveProfile(profileData);

        return res.status(201).json({ status: 'success', data: savedProfile });

    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ status: 'error', message: error.message });
    }
};


export const listProfiles = async (req: Request, res: Response) => {
    try {
        
        const profiles = await filterProfiles(req.query);
        return res.status(200).json({
            status: 'success',
            count: profiles.length,
            data: profiles
        });
    } catch (error: any) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    const profile = await getProfileById(req.params.id as string);
    if (!profile) return res.status(404).json({ status: 'error', message: 'Profile not found' });
    return res.status(200).json({ status: 'success', data: profile });
};

export const deleteProfile = async (req: Request, res: Response) => {
    const deleted = await deleteProfileById(req.params.id as string);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Profile not found' });

    return res.status(204).send();
};
