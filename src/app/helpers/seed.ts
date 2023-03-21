import { fieldType } from './../types';
import data from '../base/base.json';
import seedRandom, { PRNG } from 'seedrandom';
import Fakerator from 'fakerator';
import { IUser, Language } from '../types';

export const getRandomValue = (random: PRNG, array: string[]) => {
    const randomIndex = Math.floor(random() * array.length);
    return array[randomIndex];
};

const fakeCreator = (seed: number, language: Language) => {
    let area;
    if (language === 'ru') area = 'ru-RU';
    else if (language === 'fr') area = 'fr-FR';
    else if (language === 'us') area = 'en-AU';

    const fakerator = Fakerator(area);
    // @ts-ignore
    fakerator.seed(seed);
    return fakerator;
};

const getRandomId = (random: PRNG) => {
    const min = 100000000000;
    const max = 999999999999;
    return `${Math.round(min - 0.5 + random() * (max - min + 1))}`;
};

const getRandomName = (seed: string, language: Language) => {
    const { names } = fakeCreator(+seed, language);
    const random = seedRandom(seed);
    const gender = !!Math.floor(random() * 2) ? 'm' : 'f';
    const genderType = {
        m: `${names.lastNameM()} ${names.firstNameM()}`,
        f: `${names.lastNameF()} ${names.firstNameF()}`,
    };
    if (language !== 'ru') return genderType[gender];
    const surname = {
        m: getRandomValue(random, data.ru.surnameM),
        f: getRandomValue(random, data.ru.surnameF),
    };
    return `${genderType[gender]} ${surname[gender]}`;
};
const getCityWithPrefix = (random: PRNG, city: string, language: Language) => {
    if (language !== 'ru') return city;
    const cityTypes = [
        'г.',
        'Г.',
        'гор.',
        'Город',
        'город',
        'село',
        'деревня',
        '',
    ];
    let type = cityTypes[Math.floor(random() * cityTypes.length)];
    if (!type.includes('.')) {
        type += ' ';
    }
    return type + city;
};

const getRandomStreet = (seed: string, language: Language) => {
    let street;
    const random = seedRandom(seed);
    switch (language) {
        case 'us':
            street = getRandomValue(random, data[language].streets);
            break;
        case 'ru':
            street = getRandomValue(random, data[language].streets);
            break;

        case 'fr':
            street = fakeCreator(+seed, language).address.streetName();
            break;
    }

    return street;
};

const getRandomHouse = (random: PRNG, language: Language) => {
    const houseNumber = Math.floor(random() * 200 + 1);
    if (language !== 'ru') return houseNumber;
    return `дом ${houseNumber}`;
};

const getPhone = (seed: string, language: Language) => {
    const fakerator = fakeCreator(+seed, language);
    const phone = fakerator.phone.number();
    return language !== 'ru' ? phone : '8' + phone;
};

export const fakeUser = (seed: string, language: Language): IUser => {
    const random = seedRandom(seed);
    const fakerator = fakeCreator(+seed, language);
    const id = getRandomId(random);
    const name = getRandomName(seed, language);
    let city;
    if (language !== 'us') {
        city = getCityWithPrefix(random, fakerator.address.city(), language);
    } else {
        city = getRandomValue(random, data[language].cities);
    }
    const street = getRandomStreet(seed, language);
    const state = getRandomValue(random, data[language].states);
    const house = getRandomHouse(random, language);
    const phone = getPhone(seed, language);
    const fullAddress = `${state}, ${city}, ${street}, ${house}`;
    return { id: id, name: name, address: fullAddress, phone: phone };
};

const generateErrors = (
    errors: number,
    user: IUser,
    seed: string,
    language: Language
) => {
    const letters = data[language].letters.split('');
    const userKeys = Object.keys(user) as fieldType[];
    for (let i = 0; i < errors; i++) {
        const random = seedRandom(seed + i);
        if (random() > errors) continue;
        const randomLetter = letters[Math.floor(random() * letters.length)];
        const key = userKeys[Math.floor(random() * userKeys.length)];
        const value = user[key].split('');
        const letterIndex = Math.floor(random() * value.length);
        if (value[letterIndex] === ' ') {
            errors++;
            continue;
        }
        value[letterIndex] = randomLetter;
        user[key] = value.join('');
    }
    return user;
};

export const getPage = (
    customSeed: string,
    language: Language,
    start: number,
    end: number,
    errors: number
): IUser[] => {
    const users = [];
    if (!customSeed) {
        customSeed = '123456789';
    }
    for (let i = start; i < end; i++) {
        const seed = customSeed + i;
        const user = generateErrors(
            errors,
            fakeUser(seed, language),
            seed,
            language
        );
        users.push(user);
    }

    return users;
};
