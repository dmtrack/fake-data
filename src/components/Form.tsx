import { FC } from 'react';
import { MenuItem, Select, Slider, TextField, Tooltip } from '@mui/material';
import { Language, IUser } from '../app/types';
import t from '../app/base/translation.json';
import { CSVLink } from 'react-csv';

interface FormProps {
    seed: string;
    setSeed: (seed: string) => void;
    lang: Language;
    setLang: (lang: Language) => void;
    errors: string;
    setErrors: (n: string) => void;
    users: IUser[];
}

export const Form: FC<FormProps> = ({
    seed,
    setSeed,
    lang,
    setLang,
    errors,
    setErrors,
    users,
}) => {
    const csvData = [
        [t['Name'][lang], t['Address'][lang], t['Phone'][lang], 'ID'],
        ...users.map((user) => [user.name, user.address, user.phone, user.id]),
    ];

    const setRandomSeed = () => {
        const randomSeed = String(Math.floor(Math.random() * 100000));
        setSeed(randomSeed);
    };

    const setErrorsHandler = (value: string) => {
        if (value === '.') value = '0.';
        if (isNaN(+value) || +value > 1000) return;
        setErrors(`${value}`);
    };

    const setSeedHandler = (value: string) => {
        if (
            isNaN(+value) ||
            value.includes('.') ||
            value === ' ' ||
            value.length > 14
        )
            return;
        setSeed(value);
    };

    return (
        <div className='flex flex-col'>
            <div className='flex mt-30 mb-10'>
                <div className=' flex justify-center'>
                    <div className='flex flex-col gap-10'>
                        <h1 className='text-2xl flex-wrap px-2  text-gray-600 gap-2'>
                            {t['Generate'][lang]} <span>{t['demo'][lang]}</span>
                            -{t['Users'][lang]}
                        </h1>
                        <Select
                            className='w-30  mb-10'
                            value={lang}
                            onChange={({ target }) =>
                                setLang(target.value as Language)
                            }
                            startAdornment={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='h-12 w-12'>
                                    <path
                                        fillRule='evenodd'
                                        d='M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            }>
                            <MenuItem value='ru'>RU</MenuItem>
                            <MenuItem value='fr'>FR</MenuItem>
                            <MenuItem value='us'>US</MenuItem>
                        </Select>
                    </div>

                    <div className='ml-10'>
                        <div className='my-4'>
                            <Tooltip title='0 - 1000' placement='left'>
                                <TextField
                                    label={t['Number of errors'][lang]}
                                    fullWidth
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                    value={errors}
                                    onChange={(e) =>
                                        setErrorsHandler(e.target.value)
                                    }
                                />
                            </Tooltip>
                            <Slider
                                valueLabelDisplay='auto'
                                step={0.25}
                                min={0}
                                max={10}
                                value={+errors}
                                onChange={(e, newValue) =>
                                    setErrorsHandler(newValue + '')
                                }
                            />
                        </div>

                        <Tooltip
                            title={t['integer (from 0 to 15 symbols)'][lang]}
                            placement='left'>
                            <TextField
                                label={t['Seed'][lang]}
                                value={seed}
                                onChange={(e) => setSeedHandler(e.target.value)}
                            />
                        </Tooltip>

                        <div className='mb-10 text-white mt-7'>
                            <button
                                onClick={setRandomSeed}
                                className='bg-gray-500  rounded px-4 hover:opacity-80 transition-opacity mr-5 mb-2'>
                                {t['Random seed'][lang]}
                            </button>
                            <CSVLink
                                data={csvData}
                                filename='users.csv'
                                className='bg-fuchsia-400 rounded px-4 py-1 hover:opacity-80 transition-opacity'>
                                {t['Download CSV'][lang]}
                            </CSVLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
