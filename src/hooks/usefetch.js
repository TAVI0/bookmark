import { useEffect, useState } from 'react';
import auth from '../utils/auth';  

export default function usefetch(endpoint = '', dato = '') {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(false);

  // 🔑 lee la base una sola vez
    const API_URL = process.env.REACT_APP_API_URL ?? '';

    useEffect(() => {
        if (dato !== null && dato !== undefined) {
        setLoading(true);

        fetch(`${API_URL}${endpoint}${dato}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.getAccessToken()}`,
            },
        })
            .then(r => r.json())
            .then(json => {
            setData(json);
            setLoading(false);
            })
            .catch(err => {
            console.error('Error al obtener los datos:', err);
            setLoading(false);
            });
        }
    }, [API, endpoint, dato]);   // ← incluye API y endpoint como deps

    return { data, loading };
    }
export {useFetch}