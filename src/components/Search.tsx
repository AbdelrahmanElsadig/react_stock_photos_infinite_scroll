import React from 'react'
import { FaSearch } from 'react-icons/fa'
const Search = ({ setSearch, search, clickHandler }:
    {
        setSearch: React.Dispatch<React.SetStateAction<string>>,
        search: string,
        clickHandler: (e: any) => void
    }) => {
    return (
        <form action="#" className="w-full md:w-[60%] mt-16 mb-12" onSubmit={(e) => clickHandler(e)}>
            <div className="flex border-b-2 gap-4 px-2 py-2 items-center border-black justify-between">
                <input type="text" className="focus:outline-none w-full text-slate-800 placeholder:text-slate-600
                 bg-transparent text-2xl placeholder:text-2xl" value={search} placeholder='Search'
                    onChange={e => setSearch(e.target.value)} />
                <div onClick={(e) => clickHandler(e)} className="w-fit h-fit cursor-pointer">
                    <FaSearch className='w-6 h-6 cursor-pointer duration-300 transition-all ease-in-out
                 fill-slate-400 hover:fill-slate-600' />
                </div>
            </div>
        </form>
    )
}

export { Search } 
