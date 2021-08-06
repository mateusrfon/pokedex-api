import axios from "axios";
import { getConnection, getRepository } from "typeorm";
import { init } from "../app";
import Pokemon from "../entities/Pokemon"; 

populate();

async function populate() {
    try {
        await init();
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
        await getConnection().close();
    } catch(err) {
        console.error(err);
    }
}

interface Type {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

/*
    name: string;
    number: number;
    image: string;
    weight: number;
    height: number;
    baseExp: number;
    description: string;
*/