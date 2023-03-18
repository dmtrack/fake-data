import { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface IItem {
    city: number;
    id: number;
    title: string;
    body: string;
}

interface StringObject {
    [key: string]: string;
}

function Main() {
    // const [count, setCount] = useState(0);
    // const [data, setData] = useState<IItem[]>([]);
    // const URL = import.meta.env.VITE_DATA_URL;
    // useEffect(() => {
    //     getEntities();
    // }, []);
    // let requestCache: StringObject = {};
    // const Row = (index: any, style: any): ReactElement<any, any> | null => {
    //     const item = data[index];
    //     return (
    //         <div
    //             className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
    //             style={style}>
    //             {' '}
    //             {item ? `${item.title}` : 'Loading...'}
    //         </div>
    //     );
    // };
    // const isItemLoaded = (index: number): boolean => !!data[index];
    // const loadMoreItems = (
    //     visibleStartIndex: number,
    //     visibleStopIndex: number
    // ) => {
    //     const key: string = [visibleStartIndex, visibleStopIndex].join(':');
    //     if (requestCache[key]) {
    //         return;
    //     }
    //     const length = visibleStopIndex - visibleStartIndex;
    //     const visibleRange = [...Array(length).keys()].map(
    //         (x) => x + visibleStartIndex
    //     );
    //     const itemsRetrieved = visibleRange.every((index) => !!data[index]);
    //     if (itemsRetrieved) {
    //         requestCache[key] = key;
    //         return;
    //     }
    // //     return fetch(getUrl(length, visibleStartIndex))
    // //         .then((response) => response.json())
    // //         .then((data) =>
    // //             data.records.forEach((city, index) => {
    // //                 items[index + visibleStartIndex] = city.fields;
    // //             })
    // //         );
    // // };
    // const getEntities = async (): Promise<void> => {
    //     try {
    //         const response: AxiosResponse<[]> = await axios.get(
    //             `${URL + '/posts'}`
    //         );
    //         await setData(response.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    // // function rowRenderer(index) {
    // //     return <div key={index}>{data[index].name}</div>;
    // // }
    // return (
    //     <>
    //         <InfiniteLoader
    //             isItemLoaded={isItemLoaded}
    //             itemCount={1000}
    //             loadMoreItems={loadMoreItems}>
    //             {({ onItemsRendered, ref }) => (
    //                 <List
    //                     className='List'
    //                     height={150}
    //                     itemCount={1000}
    //                     itemSize={30}
    //                     onItemsRendered={onItemsRendered}
    //                     ref={ref}
    //                     width={300}>
    //                     {Row}
    //                 </List>
    //             )}
    //         </InfiniteLoader>
    //     </>
    // );
}

export default Main;
