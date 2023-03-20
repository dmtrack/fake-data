import { useState } from 'react';
import { fakeUser, getName, getRandomStreet } from './app/helpers/seed';
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
    console.log(fakeUser('1235777', 'ru'));
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
