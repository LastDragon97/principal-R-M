import { useState, useEffect, type ChangeEvent } from 'react';
import { getCharacters, getCharacterInfo } from '../API/CharacterApi';
import type { Info } from './Types';

export const useCharacters = () => {
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: 'urlnext',
    prev: 'urlprev',
  });
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    page: '1',
    id: '1',
  });
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('No se encontraron resultados');

  const loadCharacterExtraInfo = async (url: string) => {
    return await getCharacterInfo(url);
  };

  const loadCharacters = () => {
    setLoading(true);
    getCharacters(filters)
      .then(({ status, responseJson }) => {
        if (status !== 200) {
          setMessage(responseJson.error);
        }
        setInfo(responseJson.info || {});
        setCharacters(responseJson.results || []);
      })
      .catch((error) => {
        setCharacters([]);
        setMessage(message + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCharacters();
  }, [filters]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, ['page']: page.toString() }));
  }, [page]);

  const updateFilter = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const updatePage = (_: ChangeEvent<unknown, Element>, numberPage: number) => {
    setPage(numberPage);
  };

  return {
    info,
    characters,
    loading,
    filters,
    page,
    message,
    updateFilter,
    updatePage,
    loadCharacterExtraInfo
  };
};
