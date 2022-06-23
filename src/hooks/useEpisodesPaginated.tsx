/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {ramAPI} from '../api/RickAndMortyAPI';
import {
  EpisodeResponse,
  ResultEpisode,
} from '../interfaces/RickAndMortyInterace';

const useEpisodesPaginated = () => {
  const [episodesPaginated, setEpisodesPaginated] = useState<ResultEpisode[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const nextPageUrl = useRef('https://rickandmortyapi.com/api/episode');

  const getEpisodes = async () => {
    if (nextPageUrl.current !== null) {
      const response = await ramAPI.get<EpisodeResponse>(nextPageUrl.current);
      nextPageUrl.current = response.data.info.next;
      mapMoreEpisodes(response.data.results);
    } else {
      setIsEnd(true);
    }
  };

  const mapMoreEpisodes = (episodes: ResultEpisode[]) => {
    setEpisodesPaginated([...episodesPaginated, ...episodes]);
    setIsLoading(false);
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  return {
    isLoading,
    isEnd,
    episodesPaginated,
    getEpisodes,
  };
};

export default useEpisodesPaginated;
