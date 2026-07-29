import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import api from '../api/axios';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] =useState();
    const [loading, setLoading] =useState(true);

    useEffect(()=>{
        api
        .get("/user/me")
        .then((res)=>{
            setUser(res.data?.user ?? res.data);
            setLoading(false);
        }).catch((err)=>{
            setUser(null);
            setLoading(false);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[])

    const logout = async () => {
        try {
            await api.get("/auth/logout");
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );  
}

