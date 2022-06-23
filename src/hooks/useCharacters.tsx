/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {ramAPI} from '../api/RickAndMortyAPI';
import {Characters, CharactersImage} from '../interfaces/RickAndMortyInterace';

interface useCharactersProps {
  id: number[];
  ids?: string;
}

const useCharacters = ({id, ids = ''}: useCharactersProps) => {
  const [characters, setCharacters] = useState<CharactersImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const list = [] as any;

  const getCharacters = async () => {
    for (let index = 0; index < id.length; index++) {
      const urlCharacter = `https://rickandmortyapi.com/api/character/${id[index]}`;
      const resp = await ramAPI.get<Characters>(urlCharacter);
      list.push({
        id: resp.data.id,
        image: resp.data.image,
        name: resp.data.name,
      });
    }
    setCharacters(list);
    setIsLoading(false);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return {
    characters,
    isLoading,
  };
};

export default useCharacters;
