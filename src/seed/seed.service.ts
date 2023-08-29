import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService { 
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=3')
  const resul =  data.results.forEach( ({name, url}) => {
      const segment = url.split('/');
      const no:number = +segment[segment.length - 2]
      return { name, no }
    })
    return 'add seed data';
  }

}
