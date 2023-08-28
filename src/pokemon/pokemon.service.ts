import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.PokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handlerException(error);
    }
  }

  findAll() {
    return this.PokemonModel.find();
  }

  async findOne(id: string) {
    let pokemon: Pokemon;

    // search by id
    if (!isNaN(+id)) {
      pokemon = await this.PokemonModel.findOne({ no: id.toLocaleLowerCase() });
    }
    // search by id mongoose object id
    if (isValidObjectId(id)) {
      pokemon = await this.PokemonModel.findById(id);
    }
    // search by name
    if (!pokemon) {
      pokemon = await this.PokemonModel.findOne({
        name: id.toLocaleLowerCase().trim(),
      });
    }

    // not found pokemon
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${id} not found`);
    }

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handlerException(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.PokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon #${id} not found`);
    }

    return { message: `Pokemon #${id} deleted` };
  }

  private handlerException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists exist in the database ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException('Error creating pokemon');
  }
}
