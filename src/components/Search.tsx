'use client'
import React, { useState, memo, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Album } from "@/model/Album";
import { mutate } from "swr";
import axios from "axios";

interface Props {
    urlAlbum: string
}

const Search:React.FC<Props> = ({urlAlbum}) => {
    
    
    const [valueSearch, setValueSearch] = useState<string>('')

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
    }

    async function getData() {
        try {
            const response = await axios.get(urlAlbum)
            return response.data;
        } catch (error) {
            // Xử lý các lỗi xảy ra trong quá trình yêu cầu
            console.error(error);
            throw error; // Ném lỗi để xử lý bởi người gọi
        }
    }

    useEffect(()=>{
        getData().then(data=>{
            if (valueSearch.trim() === ''){
            
                mutate(urlAlbum, data,false)
            }
            else{
                // Tìm kiếm tên theo key word đã nhập
                const result:Album[] = data.filter((item:Album)=> item.title.toLowerCase().includes(valueSearch.toLowerCase()))
                
                // Cập nhật lại dữ liệu trong useSWR trong component Home
                mutate(urlAlbum,result,false)
            }
        })
        
    },[valueSearch])

    return ( 
        <form
            className="w-[70%] h-12 flex items-center border-2 border-cyan-600 relative rounded-[48px]"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <input 
                type='text' 
                value={valueSearch} 
                onChange={(e)=>{setValueSearch(e.target.value)}}
                className="w-[100%] pr-[35px] pl-4 h-10 py-1   mx-4 font-medium text-base text-[#817d7d]"
                placeholder="Enter name of album search"
            />
            <button type="submit" className="h-[80%] absolute right-0 bg-blue-500 rounded-[50%] py-[3px] px-[6px] mr-1 active:scale-75">
                <SearchIcon className="active:scale-90 active:text-blue-700 translate-x-[1px] translate-y-[-2px] text-white"></SearchIcon>
            </button>
        </form>
    );
}

export default memo(Search);