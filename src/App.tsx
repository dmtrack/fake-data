import { Form } from './components/Form';
import { UsersTable } from './components/UsersTable';
import { getPage } from './app/helpers/seed';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Language, IUser } from '../src/app/types';
import { STEP } from '../src/app/helpers/constants';
import './styles.css';

function App() {
    const [seed, setSeed] = useState('1');
    const [lang, setLang] = useState<Language>('ru');
    const [errors, setErrors] = useState('0');
    const [users, setUsers] = useState<IUser[]>([]);
    let loadedPages = useRef<string[]>([]);

    const generatePage = useCallback(
        (start: number, end: number) => {
            const loadingPage = `${start}:${end}`;
            if (!loadedPages.current.includes(loadingPage)) {
                loadedPages.current.push(`${start}:${end}`);
                const currentUsers = getPage(seed, lang, start, end, +errors);
                console.log(currentUsers, 'current');
                setUsers((prev) => [...prev, ...currentUsers]);
                console.log(users, 'newusers');
            }
            console.log(loadedPages, loadingPage);
        },
        [seed, lang, loadedPages, errors]
    );
    console.log(users);

    useEffect(() => {
        setUsers([]);
        loadedPages.current = [];
        generatePage(0, STEP * 2);
    }, [loadedPages, generatePage]);

    return (
        <div className='w-4/5'>
            <div className=' grid grid-cols-1 grid-rows-auto row-gap-2 mt-40'>
                {
                    <Form
                        seed={seed}
                        setSeed={setSeed}
                        lang={lang}
                        setLang={setLang}
                        errors={errors}
                        setErrors={setErrors}
                        users={users}
                    />
                }
                {
                    <UsersTable
                        users={users}
                        lang={lang}
                        generatePage={generatePage}
                    />
                }
            </div>
        </div>
    );
}

export default App;
