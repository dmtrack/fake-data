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

const fakeCreator = (seed: number, language: Language) => {
    let area;
    if (language === 'ru') area = 'ru-RU';
    else if (language === 'de') area = 'de-DE';
    else if (language === 'us') area = '';
    const fake = Fakerator(area);
    // @ts-ignore
    fake.seed(seed);
    return fake;
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
    const prefixTypes = ['город', 'ГОРОД', 'Г.', 'г.', 'гор.', ''];
    let type = prefixTypes[Math.floor(random() * prefixTypes.length)];
    if (!type.includes('.')) {
        type += ' ';
    }
    return type + city;
};

const getRandomStreet = (seed: string, language: Language) => {
    let street;
    const random = seedRandom(seed);
    switch (language) {
        case 'ru' || 'us':
            street = getRandomValue(random, data[language].streets);
        case 'de':
            street = fakeCreator(Number(seed), language).address.streetName();
    }
    return street;
};

const getRandomHouse = (random: PRNG, language: Language) => {
    const houseNumber = Math.floor(random() * 200 + 1);
    if (language !== 'ru') return houseNumber;
    return `дом ${houseNumber}`;
};

const getPhone = (seed: string, language: Language) => {
    const fake = fakeCreator(+seed, language);
    const phone = fake.phone.number();
    return language !== 'ru' ? phone : '8' + phone;
};

export const fakeUser = (seed: string, language: Language): IUser => {
    const random = seedRandom(seed);
    const fake = fakeCreator(+seed, language);
    const id = getRandomId(random);
    const name = getRandomName(seed, language);
    const city = getCityWithPrefix(random, fake.address.city(), language);
    const street = getRandomStreet(seed, language);
    const state = getRandomValue(random, data[language].states);
    const house = getRandomHouse(random, language);
    const phone = getPhone(seed, language);
    const fullAddress = `${state}, ${city}, ${street}, ${house}`;
    return { id: id, name: name, address: fullAddress, phone: phone };
};
