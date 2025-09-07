import React, {type FC } from "react";

interface IProps {};

const Navbar:FC<IProps> = (props) => {
    return (
    <nav className="bg-[#131921] text-white p-2">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
                <div className="flex-shrink-0">
                    {/* <Link to="/">
                        <img
                            src={alurazzonLogo}
                            alt="AluraZon Logo"
                            className="h-8 object-contain"
                        />
                    </Link> */}
                </div>

                <div className="flex-1 flex">
                    <div className="w-full flex">
                        <input
                            type="text"
                            className="w-full px-4 py-1 text-black rounded-l focus:outline-none"
                            placeholder="Buscar en AluraZon"
                        />
                        {/* <button className="bg-[#febd69] px-4 rounded-r hover:bg-[#f3a847]">
                            <MagnifyingGlassIcon className="h-5 w-5 text-black" />
                        </button> */}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:block">
                        <div className="text-xs">Hola. Iniciar sesión</div>
                        <div className="text-sm font-bold">Cuenta y Listas</div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-xs">Devoluciones</div>
                        <div className="text-sm font-bold">& Pedidos</div>
                    </div>
                    {/* <Link to="/cart">
                        <div className="relative">
                            <ShoppingCartIcon className="h-8 w-8" />
                            <span className="absolute -top-1 -right-1 bg-[#f08804] text-xs font-bold px-1.5 rounded-full">
                                {totalItems}
                            </span>
                        </div>
                    </Link> */}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;