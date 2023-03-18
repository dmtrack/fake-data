import data from '../base/base.json';
import seedRandom, { PRNG } from 'seedrandom';
import Fakerator from 'fakerator';
import { IUser, Language } from '../types';

// const Generator = (seed: string | number, lang: Language) {

// }

export const getRandomValue = (random: PRNG, array: string[]) => {
    const randomIndex = Math.floor(random() * array.length);
    return array[randomIndex];
};

const fakerator = (seed: number, language: Language) => {
    let region;
    if (language === 'ru') region = 'ru-RU';
    else if (language === 'ge') region = 'ge-GE';
    else if (language === 'us') region = '';
    const fakerator = Fakerator(region);
    // @ts-ignore
    fakerator.seed(seed);
    return fakerator;
};

const getRandomId = (random: PRNG) => {
    const min = 100000000000;
    const max = 999999999999;
    return `${Math.round(min - 0.5 + random() * (max - min + 1))}`;
};

const getName = (seed: PRNG, language: Language) => {};

const getRandomStreet = (seed: string, language: Language) => {
    let street;
    const random = seedRandom(seed);
    switch (language) {
        case 'ru':
            street = getRandomValue(random, data[language].streets);
        case 'us':
            street = getRandomValue(random, data[language].streets);
    }
};

export const fakeUser = (seed: string, language: Language): IUser => {
    const random = seedRandom(seed);
    const id = getRandomId(random);
    const street = getRandomStreet(seed, language);

    return { id: id, name: 'user', address: 'Ural', phone: '+79220264686' };
};
