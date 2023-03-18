import { useState } from 'react';
import Post from './app/Post';

function App() {
    let sampleText =
        'lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
    let postsPerPage = 20;
    let addedPosts = 10;

    const [posts, setPosts] = useState<number[]>([
        ...Array(postsPerPage).keys(),
    ]);

    let postNumber: number = postsPerPage;

    function handleScroll() {
        let isAtBottom =
            document.documentElement.scrollHeight -
                document.documentElement.scrollTop <=
            document.documentElement.clientHeight;

        if (isAtBottom) {
            postNumber += addedPosts;
            setPosts((prevState): number[] => [
                ...prevState,
                ...[...Array(postNumber).keys()],
            ]);
        }
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <div>
            {posts.map((item, i) => (
                <Post key={i} title={'Post ' + (i + 1)} body={sampleText} />
            ))}
        </div>
    );
}

export default App;
