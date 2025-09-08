import React, { useState } from "react";

interface AuthenticationProps {
    onLogin: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onLogin }) => {
    const [registroActive, setRegistroActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert("Por favor ingresa email y contraseña");
        onLogin(); // aquí luego integras Firebase si quieres
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#0B1A22] overflow-hidden">
            <img
                src="/src/assets/BackGround.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* CARD */}
            <div className="relative z-10 flex w-[996px] h-[770px] bg-[#171d1f] rounded-2xl shadow-2xl overflow-hidden">
                {/* Columna imagen */}
                <div className="w-[48%] p-8 flex items-center justify-center">
                    {registroActive?
                    <img
                        src="/src/assets/image_Registro.png"
                        alt="Ilustración login"
                        className="w-full h-full object-cover rounded-xl"
                    /> :
                    <img
                        src="/src/assets/image_Login.png"
                        alt="Ilustración login"
                        className="w-full h-full object-cover rounded-xl"
                    />
                }
                    
                </div>

                {/* Columna formulario */}
                <div className="w-[52%] flex items-center">
                    <div className="w-[82%] mx-auto">
                        {/* Títulos */}
                        {registroActive ?
                            (<>
                                <h1 className="text-white text-[22px] font-bold">Registro</h1>
                                <p className="text-gray-300 mt-2 mb-6">
                                    ¡Hola! Completa tus datos </p>
                            </>)
                            :
                            (<>
                                <h1 className="text-white text-[22px] font-bold">Login</h1>
                                <p className="text-gray-300 mt-2 mb-6">
                                    Inicie tu sesión</p>
                            </>
                            )}

                        {/* FORM */}
                        {registroActive ? 
                        (<form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Nombre */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="Nombre completo"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="Digita tu email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Recordarme / Olvidé */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300">
                                    <input type="checkbox" className="accent-[#81FE88]" />
                                    Recordarme
                                </label>
                            </div>

                            {/* Botón principal */}
                            <button
                                type="submit"
                                className="w-full bg-[#81FE88] text-black font-semibold py-2 rounded-md hover:bg-[#6be678] transition-colors"
                            >
                                Registrarse →
                            </button>
                        </form>) 
                        :
                        (<form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Email o usuario
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="usuario123"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Recordarme / Olvidé */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300">
                                    <input type="checkbox" className="accent-[#81FE88]" />
                                    Recordarme
                                </label>
                                <a href="#" className="text-gray-300 hover:text-[#81FE88]">
                                    Me olvidé de la contraseña
                                </a>
                            </div>

                            {/* Botón principal */}
                            <button
                                type="submit"
                                className="w-full bg-[#81FE88] text-black font-semibold py-2 rounded-md hover:bg-[#6be678] transition-colors"
                            >
                                Login →
                            </button>
                        </form>)
                        }

                        {/* Divider “o ingrese con otras cuentas” */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="h-px flex-1 bg-[#3A444B]" />
                            <span className="text-sm text-gray-300">
                                o ingrese con otras cuentas
                            </span>
                            <div className="h-px flex-1 bg-[#3A444B]" />
                        </div>

                        {/* Social buttons */}
                        <div className="flex items-center justify-center gap-6">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#23292D] border border-[#3A444B] text-white hover:border-[#81FE88]"
                                onClick={() => alert("Login con GitHub (pendiente)")}
                            >
                                <img src="/src/assets/github.svg" alt="GitHub" className="w-5 h-5" />
                                <span>Github</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#23292D] border border-[#3A444B] text-white hover:border-[#81FE88]"
                                onClick={() => alert("Login con Google (pendiente)")}
                            >
                                <img src="/src/assets/google.svg" alt="Google" className="w-5 h-5" />
                                <span>Gmail</span>
                            </button>
                        </div>

                        {/* texto para alternar */}
                        <p className="text-sm text-gray-300 mt-6 text-center">
                            {registroActive ? (
                                <>
                                    ¿Tienes una cuenta?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setRegistroActive(false)}
                                        className="text-[#81FE88] hover:underline font-medium"
                                    >
                                        Inicia tu sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    ¿Todavía no tienes una cuenta?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setRegistroActive(true)}
                                        className="text-[#81FE88] hover:underline font-medium"
                                    >
                                        ¡Crea tu registro!
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
