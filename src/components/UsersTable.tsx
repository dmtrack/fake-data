import { FC, useRef, useState } from 'react';
import { Language, IUser } from '../app/types';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import t from '../app/base/translation.json';
import { STEP } from '../app/helpers/constants';

interface UsersTableProps {
    users: IUser[];
    lang: Language;
    generatePage: (start: number, end: number) => void;
}

const round10 = (n: number) => {
    return Math.round(n / 10) * 10;
};

export const UsersTable: FC<UsersTableProps> = ({
    users,
    lang,
    generatePage,
}) => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [usersLength, setUsersLength] = useState(users.length);

    const loadUsers = (startIndex: number, stopIndex: number) => {
        startIndex = round10(startIndex) + STEP * 2;
        setUsersLength(users.length);
        if (stopIndex >= users.length - 2) {
            generatePage(startIndex, round10(startIndex) + STEP);
        }
    };
    const Row = ({ index, style }: ListChildComponentProps) => {
        const user = users[index];
        return (
            <div className='grid grid-cols-10 gap-2 border' style={style}>
                <div className='col-span-1  '>{index + 1}</div>
                <div className='col-span-2 text-start '>{user.name}</div>
                <div className='col-span-3'>{user.address}</div>
                <div className='col-span-2 '>{user.phone}</div>
                <div className='col-span-2 '>{user.id}</div>
            </div>
        );
    };

    const isItemLoaded = () => {
        return false;
    };
    // console.log(users);

    return (
        <div className='rounded mb-5' ref={tableContainerRef}>
            <div className='grid grid-cols-10 bg-gray-500 text-white '>
                <div className='col-span-1 '>#</div>
                <div className='col-span-2 '>{t['Name'][lang]}</div>
                <div className='col-span-3 '>{t['Address'][lang]}</div>
                <div className='col-span-2 '>{t['Phone'][lang]}</div>
                <div className='col-span-2 '>ID</div>
            </div>

            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={usersLength < 40 ? 40 : usersLength}
                loadMoreItems={loadUsers}>
                {({ onItemsRendered, ref }) => (
                    <FixedSizeList
                        itemCount={users.length}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        height={700}
                        width={
                            Number(tableContainerRef.current?.offsetWidth) ||
                            800
                        }
                        itemSize={100}>
                        {Row}
                    </FixedSizeList>
                )}
            </InfiniteLoader>
        </div>
    );
};
