import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonService: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
   await this.PokemonService.deleteMany({});

    const  data  = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const PokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segment = url.split('/');
      const no: number = +segment[segment.length - 2];
      PokemonToInsert.push({ name, no });
    }); 
    await this.PokemonService.insertMany(PokemonToInsert);
    return { message: 'pokemons add successfully' };
  }
}
