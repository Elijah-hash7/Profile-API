// src/external/apiClient.ts
export const fetchAgify = async (name: string) => {
    const res = await fetch(`https://api.agify.io?name=${name}`);
    if (!res.ok) throw new Error('Agify API failed');
    return res.json();
};

export const fetchGenderize = async (name: string) => {
    const res = await fetch(`https://api.genderize.io?name=${name}`);
    if (!res.ok) throw new Error('Genderize API failed');
    return res.json();
};

export const fetchNationalize = async (name: string) => {
    const res = await fetch(`https://api.nationalize.io?name=${name}`);
    if (!res.ok) throw new Error('Nationalize API failed');
    return res.json();
};
