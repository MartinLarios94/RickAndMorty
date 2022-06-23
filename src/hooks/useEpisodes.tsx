import {useEffect, useState} from 'react';
import {ramAPI} from '../api/RickAndMortyAPI';
import {ResultInfoEpisode} from '../interfaces/RickAndMortyInterace';

interface useEpisodesProps {
  id: number[];
}

const useEpisodes = ({id}: useEpisodesProps) => {
  const [episodes, setEpisodes] = useState<ResultInfoEpisode[]>([]);
  const list = [] as any;

  const getEpisode = async () => {
    for (let index = 0; index < id.length; index++) {
      const urlEpisode = `https://rickandmortyapi.com/api/episode/${id[index]}`;
      const resp = await ramAPI.get<ResultInfoEpisode>(urlEpisode);
      list.push(resp.data);
    }
    setEpisodes(list);
  };

  useEffect(() => {
    getEpisode();
  }, []);

  return {
    episodes,
  };
};

export default useEpisodes;
