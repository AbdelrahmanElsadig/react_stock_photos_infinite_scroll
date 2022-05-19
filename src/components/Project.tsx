import { Photos } from './Photos';
import { Search } from './Search';
import { InfiniteData, QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query'

const ACCESS_KEY = "frS4pvuZXVojHJwe5yniGI6kUGqht5Kwc-E8_Y2E1Ok";
const MAIN_URL = "https://api.unsplash.com/photos/?client_id=";
const SEARCH_URL = "https://api.unsplash.com/search/photos/?client_id=";


const Project = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState<string>('');
    const [fetchSearch, setFetchSearch] = useState<string>('');

    const formClickHandler = (e: any) => {
        e.preventDefault();
        queryClient.removeQueries('photos', { exact: true })
        setFetchSearch(search);
    }

    const { data,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        status,
        fetchNextPage } = useInfiniteQuery('photos', async ({ pageParam = 0 }: any) => {
            const urlPage = `&page=${pageParam + 1}`;
            const urlQuery = `&query=${fetchSearch}`;

            let url = '';
            if (fetchSearch) url = `${SEARCH_URL}${ACCESS_KEY}${urlPage}${urlQuery}`;
            else url = `${MAIN_URL}${ACCESS_KEY}${urlPage}`;
            const res: any = await axios.get(url);
            if (res.status !== 200) throw new Error();
            return res;
        },
            {
                // refetchOnMount: false,
                // refetchOnWindowFocus: false,
                // refetchInterval: false,
                // refetchIntervalInBackground: false,
                getNextPageParam: (lastPage, pages) => {
                    if (lastPage.total_pages === pages.length) return;
                    return pages.length
                }
            })




    useEffect(() => {
        function eventCallback() {
            if (document.body.scrollHeight <= window.innerHeight + window.scrollY) {
                if (hasNextPage && status !== 'loading') fetchNextPage()
            }
        }
        window.addEventListener('scroll', eventCallback)
        return () => window.removeEventListener('scroll', eventCallback)
    });
    return (
        <div className="container w-[80%] mx-auto flex flex-col gap-4 items-start">
            <Search setSearch={setSearch} search={search}
                clickHandler={formClickHandler} />
            <Photos data={data as InfiniteData<any>} fetchSearch={fetchSearch}
                isFetchingNextPage={isFetchingNextPage} />
        </div>

    )
}

export { Project }
