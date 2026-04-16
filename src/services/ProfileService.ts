import { fetchAgify, fetchGenderize, fetchNationalize } from '../external/apiClient';
import { Profile } from '../models/Profile';
import { AppError } from '../errors/AppError';

const getBestCountry = (countries: any[]): { country_id: string; probability: number } => {
    return countries.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
    );
};

const getAgeGroup = (age: number): string => {
    if (age <= 12) return 'child';
    if (age <= 19) return 'teenager';
    if (age <= 59) return 'adult';
    return 'senior';
};

export const generateProfile = async (name: string): Promise<Partial<Profile>> => {
    try {
        const [agifyData, genderizeData, nationalizeData] = await Promise.all([
            fetchAgify(name),
            fetchGenderize(name),
            fetchNationalize(name)
        ]) as [any, any, any];

        if (genderizeData.gender === null || genderizeData.count === 0) {
            throw new AppError(502, 'Genderize returned an invalid response');
        }

        if (agifyData.age === null) {
            throw new AppError(502, 'Agify returned an invalid response');
        }

        if (!nationalizeData.country || nationalizeData.country.length === 0) {
            throw new AppError(502, 'Nationalize returned an invalid response');
        }

        const bestCountry = getBestCountry(nationalizeData.country);

        return {
            name: name.toLowerCase(),
            gender: genderizeData.gender,
            gender_probability: genderizeData.probability,
            sample_size: genderizeData.count,
            age: agifyData.age,
            age_group: getAgeGroup(agifyData.age),
            country_id: bestCountry.country_id,
            country_probability: bestCountry.probability
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(502, 'Failed to fetch data from external APIs');
    }
};