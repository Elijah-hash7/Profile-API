import { Router } from 'express';
import { createProfile, listProfiles, getProfile, deleteProfile } from '../controllers/profileController';

const router = Router();

router.post('/', createProfile);
router.get('/', listProfiles);
router.get('/:id', getProfile);
router.delete('/:id', deleteProfile);


export default router;
