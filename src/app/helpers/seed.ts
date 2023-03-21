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
    if (language === 'us') {
        city = data[language].cities[0];
        return city;
    }
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
