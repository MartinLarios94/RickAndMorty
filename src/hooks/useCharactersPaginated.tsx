/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {ramAPI} from '../api/RickAndMortyAPI';
import {
  Characters,
  Info,
  InfoEpisode,
  InfoLocation,
  LocationResponse,
  RickAndMortyReponse,
} from '../interfaces/RickAndMortyInterace';

interface HomeScreenProps {
  Characters: Info;
  Locations: InfoLocation;
  Episodes: InfoEpisode;
}

const useRickAndMortyPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState<HomeScreenProps>({
    Characters: {count: 0, pages: 0, next: '', prev: null},
    Locations: {count: 0, pages: 0, next: '', prev: null},
    Episodes: {count: 0, pages: 0, next: '', prev: null},
  });
  const [charactersList, setCharactersList] = useState<Characters[]>([]);

  const nextPageUrl = useRef('https://rickandmortyapi.com/api/character/');

  const getInfo = async () => {
    const characters = ramAPI.get<RickAndMortyReponse>(nextPageUrl.current);
    const locations = ramAPI.get<LocationResponse>(
      'https://rickandmortyapi.com/api/location',
    );
    const episodes = ramAPI.get<LocationResponse>(
      'https://rickandmortyapi.com/api/episode',
    );

    const resp = await Promise.all([characters, locations, episodes]);

    setResultData({
      Characters: resp[0].data.info,
      Locations: resp[1].data.info,
      Episodes: resp[2].data.info,
    });
  };

  const loadCharacters = async () => {
    const response = await ramAPI.get<RickAndMortyReponse>(nextPageUrl.current);
    nextPageUrl.current = response.data.info.next;
    mapMoreCharacters(response.data.results);
  };

  const mapMoreCharacters = (characters: Characters[]) => {
    setCharactersList([...charactersList, ...characters]);
    setIsLoading(false);
  };

  useEffect(() => {
    getInfo();
    loadCharacters();
  }, []);

  return {
    ...resultData,
    isLoading,
    charactersList,
    loadCharacters,
  };
};

export default useRickAndMortyPaginated;
