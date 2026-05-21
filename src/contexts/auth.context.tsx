'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ao carregar a página, verifica se já tem token salvo
    useEffect(() => {
        const savedToken = Cookies.get('token');
        if (savedToken) {
            setToken(savedToken);
            fetchMe();
        } else {
            setIsLoading(false);
        }
    }, []);

    async function fetchMe() {
        try {
            const { data } = await api.get('/api/v1/auth/me');
            setUser(data);
        } catch {
            Cookies.remove('token');
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email: string, password: string) {
        const { data } = await api.post('/api/v1/auth/login', { email, password });
        Cookies.set('token', data.access_token, { expires: 7 }); // expira em 7 dias
        setToken(data.access_token);
        setUser(data.user);
    }

    function logout() {
        Cookies.remove('token');
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);