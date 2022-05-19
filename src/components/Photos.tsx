import { Spinner } from '@chakra-ui/spinner'
import { InfiniteData } from 'react-query'


const Photos = ({ data, isFetchingNextPage, fetchSearch }:
    { data: InfiniteData<any>, isFetchingNextPage: boolean, fetchSearch: string }) => {
    return (
        <>
            <div className='grid mx-auto grid-cols-1 gap-x-6 mb-16 gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
                {data?.pages ? (
                    <>
                        {data.pages.map((info: any, i: any) => {
                            const props = fetchSearch ? info.data.results : info.data
                            return (
                                <Page key={i} data={props} />
                            )
                        }
                        )}
                    </>
                ) : ''}

            </div>
            {isFetchingNextPage && <Spinner className='text-sky-600 my-16 h-20 w-20 mx-auto' />}
        </>
    )

}


function Photo({ props }: { props: StockPhoto }) {
    return (
        <>
            <div className="relative max-h-80">
                <img src={props.urls.small} alt="" className="w-full h-full object-cover" />
            </div>
        </>
    )
}

function Page({ data }: { data: StockPhoto[] }) {

    return (
        <>
            {
                Array.isArray(data) ? (
                    <>
                        {data.map(stock => {
                            return (
                                <Photo key={stock.id} props={stock} />
                            )
                        }
                        )}
                    </>
                ) : ''
            }
        </>
    )
}

export { Photos }
