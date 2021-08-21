import {MigrationInterface, QueryRunner} from "typeorm";
import axios from "axios";
import { getConnection, getRepository } from "typeorm";
import { init } from "../app";
import Pokemon from "../entities/Pokemon";

export class Seed1629584505523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const pokemons = await getRepository(Pokemon).find();
            console.log(`Starting length: ${pokemons.length}`);
            if (pokemons.length === 0) {
                const firstGenLeft = 1;
                const firstGenRight = 151;
                
                for (let i = firstGenLeft; i <= firstGenRight; i++) {
                    const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)).data;
                    const newPokemon = getRepository(Pokemon).create();
        
                    newPokemon.name = pokemon.name;
                    newPokemon.number = pokemon.id;
                    newPokemon.image = pokemon.sprites.front_default;
                    newPokemon.weight = pokemon.weight;
                    newPokemon.height = pokemon.height;
                    newPokemon.baseExp = pokemon.base_experience;
                    newPokemon.description = `Pokemon do tipo: ${
                        pokemon.types.map((item: Type) => item.type.name).join(', ')
                    }`;
        
                    const done = await getRepository(Pokemon).save(newPokemon);
                    console.log(`Pokemon: ${done.number}`);
                }            
            }
        } catch(err) {
            console.error(err);
        }

        interface Type {
            slot: number,
            type: {
                name: string,
                url: string
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
