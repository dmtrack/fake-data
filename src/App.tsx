import { useState } from 'react';
import { getValueRandom } from './app/helpers/seed';
import Post from './app/Post';
import Fakerator from 'fakerator';
import { Language } from './app/types';
import seedRandom, { PRNG } from 'seedrandom';

function App() {
    // let sampleText =
    //     'lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
    // let postsPerPage = 20;
    // let addedPosts = 10;

    // const [posts, setPosts] = useState<number[]>([
    //     ...Array(postsPerPage).keys(),
    // ]);

    // let postNumber: number = postsPerPage;

    // function handleScroll() {
    //     let isAtBottom =
    //         document.documentElement.scrollHeight -
    //             document.documentElement.scrollTop <=
    //         document.documentElement.clientHeight;

    //     if (isAtBottom) {
    //         postNumber += addedPosts;
    //         setPosts((prevState): number[] => [
    //             ...prevState,
    //             ...[...Array(postNumber).keys()],
    //         ]);
    //     }
    // }
    // const data = window.addEventListener('scroll', handleScroll);
    const fakeratorCreator = (seed: number, language: Language) => {
        let region;
        if (language === 'ru') region = 'ru-RU';
        else if (language === 'ge') region = 'ge-GE';
        else if (language === 'us') region = '';
        const fakerator = Fakerator(region);
        // @ts-ignore
        fakerator.seed(seed);
        return fakerator;
    };

    const getPhone = (seed: string, lang: Language) => {
        const fakerator = fakeratorCreator(+seed, lang);
        const address = fakerator.address.street();
        // return lang === 'ru' ? '8' + phone : phone;
        return address;
    };

    console.log(getPhone('123', 'us'));

    return <div>TABLE</div>;
}

// for (var i = 0; i < 10; i++) {
//     console.log({
//         country: fakerator.address.country(),
//         countryCode: fakerator.address.countryCode(),
//         state: fakerator.address.state(),
//         stateAbbr: fakerator.address.stateAbbr(),
//         city: fakerator.address.city(),
//         address: fakerator.address.street(),
//         zip: fakerator.address.postCode(),
//         geoLocation: fakerator.address.geoLocation(),
//     });

export default App;
