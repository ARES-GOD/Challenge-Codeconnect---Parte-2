import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginWithEmail, registerWithEmail, selectAuthError, selectAuthStatus } from "../redux/authSlice";

type Mode = "login" | "register";

interface AuthenticationProps {
    onLogin: () => void;
    initialMode?: Mode; 
}

type FormValues = {
    nombre?: string;
    email: string;
    password: string;
    recordar?: boolean;
};

const Authentication: React.FC<AuthenticationProps> = ({ 
    onLogin,
    initialMode = "login",
 }) => {
    const navigate = useNavigate();
    const [registroActive, setRegistroActive] = useState(initialMode === "register");
    const dispatch = useAppDispatch();
    const status =  useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: { email: "", password: "", recordar: false },
        mode: "onSubmit",
    });

    const onSubmit = async (data: FormValues) => {
        try {
            if (registroActive) {
                const res = await dispatch(registerWithEmail({
                    name: data.nombre ?? "",
                    email: data.email,
                    password: data.password
                }));
                if (registerWithEmail.fulfilled.match(res)) {
                    onLogin();
                    navigate("/");
                }
            } else {
                const res = await dispatch(loginWithEmail({
                    email:data.email,
                    password:data.password,
                }));
                if (loginWithEmail.fulfilled.match(res)) {
                    onLogin();
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error en autenticación:", error);
        }
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
                    <img
                        src={
                            registroActive
                                ? "/src/assets/image_Registro.png"
                                : "/src/assets/image_Login.png"
                        }
                        alt="Ilustración"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Columna formulario */}
                <div className="w-[52%] flex items-center">
                    <div className="w-[82%] mx-auto">
                        {/* Títulos */}
                        {registroActive ? (
                            <>
                                <h1 className="text-white text-[22px] font-bold">Registro</h1>
                                <p className="text-gray-300 mt-2 mb-6">¡Hola! Completa tus datos</p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-white text-[22px] font-bold">Login</h1>
                                <p className="text-gray-300 mt-2 mb-6">Inicie tu sesión</p>
                            </>
                        )}

                        {/* FORM (react-hook-form) */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            {/* Nombre solo en registro */}
                            {registroActive && (
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Nombre</label>
                                    <input
                                        {...register("nombre", {
                                            required: "El nombre es obligatorio",
                                            minLength: {
                                                value: 5,
                                                message: "Muy corto (min 5)"
                                            },
                                        })}
                                        className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                        placeholder="Nombre completo"
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    {registroActive ? "Email" : "Email o usuario"}
                                </label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "El email es obligatorio",
                                        pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
                                    })}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder={registroActive ? "Digita tu email" : "usuario123@correo.com"}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    autoComplete={registroActive ? "new-password" : "current-password"}
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                                    })}
                                    className="w-full px-3 py-2 rounded-md bg-[#30363A] text-white placeholder-gray-400 outline-none border border-[#4A545B] focus:border-[#81FE88]"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Recordarme / Olvidé */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300">
                                    <input type="checkbox" {...register("recordar")} className="accent-[#81FE88]" />
                                    Recordarme
                                </label>
                                {!registroActive && (
                                    <a href="#" className="text-gray-300 hover:text-[#81FE88]">
                                        Me olvidé de la contraseña
                                    </a>
                                )}
                            </div>

                            {/* Botón principal */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#81FE88] text-black font-semibold py-2 rounded-md hover:bg-[#6be678] transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? "Enviando..." : registroActive ? "Registrarse →" : "Login →"}
                            </button>
                        </form>

                        {/* Divider “o ingrese con otras cuentas” */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="h-px flex-1 bg-[#3A444B]" />
                            <span className="text-sm text-gray-300">o ingrese con otras cuentas</span>
                            <div className="h-px flex-1 bg-[#3A444B]" />
                        </div>

                        {/* Social buttons (placeholder) */}
                        <div className="flex items-center justify-center gap-6">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#23292D] border border-[#3A444B] text-white hover:border-[#81FE88]"
                                onClick={() => alert("GitHub pendiente")}
                            >
                                <img src="/src/assets/github.svg" alt="GitHub" className="w-5 h-5" />
                                <span>Github</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#23292D] border border-[#3A444B] text-white hover:border-[#81FE88]"
                                onClick={() => alert("Google pendiente")}
                            >
                                <img src="/src/assets/google.svg" alt="Google" className="w-5 h-5" />
                                <span>Gmail</span>
                            </button>
                        </div>

                        {/* Alternar login/registro */}
                        <p className="text-sm text-gray-300 mt-6 text-center">
                            {registroActive ? (
                                <>
                                    ¿Tienes una cuenta?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
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
                                        onClick={() => navigate("/register")}
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
