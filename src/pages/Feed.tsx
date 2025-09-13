import React, {type FC } from "react";
import Navbar from "../components/Filters/NavBar/Navbar";
import Tags from "../components/Filters/Tags";

interface IProps {};

const Feed:FC<IProps> = (props) => {
    return <div className="w-[996px]">
    <div className="flex flex-col gap-[16px] mt-1">
        <Navbar></Navbar>
        <Tags></Tags>
    </div>
        
    </div>
};

export default Feed;