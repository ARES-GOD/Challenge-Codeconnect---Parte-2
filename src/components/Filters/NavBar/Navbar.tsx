import { useState, type FC } from "react";
import search from "./Search.png";
import { useAppDispatch } from "../../../hooks/hooks";

interface IProps { };

const Navbar: FC<IProps> = () => {
    const [searchValue, setSearchValue] = useState('');
     const dispatch = useAppDispatch();

    return (
        <div className="relative w-[996px]">
            <div className="flex items-center bg-[#1A1F23] border border-gray-700 rounded-lg px-4 py-3 focus-within:border-blue-500 transition-colors">
                <img className="text-gray-400 w-5 h-5 mr-3" src={search} alt="Icono Busqueda"/>
                <input
                    type="text"
                    placeholder="Digita lo que buscas"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                />
            </div>
        </div>
    );
};

export default Navbar;