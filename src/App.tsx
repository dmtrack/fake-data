import { Form } from './components/Form';
import { UsersTable } from './components/UsersTable';
import { fakeUser } from './app/helpers/seed';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Language, IUser } from '../src/app/types';
import t from '../src/app/base/translation.json';
import { faker } from '@faker-js/faker';

function App() {
    // const [seed, setSeed] = useState('1');
    // const [lang, setLang] = useState<Language>('ru');
    // const [errors, setErrors] = useState('0');
    // const [users, setUsers] = useState<IUser[]>([]);
    // let loadedPages = useRef<string[]>([]);

    // const generatePage = useCallback(
    //     (start: number, end: number) => {
    //         const loadingPage = `${start}:${end}`;
    //         if (!loadedPages.current.includes(loadingPage)) {
    //             loadedPages.current.push(`${start}:${end}`);
    //             const currentUsers = getPage(seed, lang, start, end, +errors);
    //             setUsers((prev) => [...prev, ...currentUsers]);
    //         }
    //     },
    //     [seed, lang, loadedPages, errors]
    // );

    // useEffect(() => {
    //     setUsers([]);
    //     loadedPages.current = [];
    //     generatePage(0, 10 * 2);
    // }, [loadedPages, generatePage]);

    console.log(fakeUser('3344433', 'us'));

    return (
        <div>
            {/* <h1 className='bold text-5xl text-center'>
                {t['Generate'][lang]}{' '}
                <span className='text-sky-600'>{t['demo'][lang]}</span>{' '}
                {t['Users'][lang]}!
            </h1>
            <Form
                seed={seed}
                setSeed={setSeed}
                lang={lang}
                setLang={setLang}
                errors={errors}
                setErrors={setErrors}
                users={users}
            />
            <UsersTable users={users} lang={lang} generatePage={generatePage} /> */}
            task 5
        </div>
    );
}

export default App;
