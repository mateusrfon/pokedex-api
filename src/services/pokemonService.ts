import { getRepository } from "typeorm";
import User from "../entities/User";
import Pokemon from "../entities/Pokemon";

interface PokemonCheck extends Pokemon {
    inMyPokemons: boolean,
}

export async function getPokemonsCheckingUser(userId: number) {
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['pokemons'] });
    const pokemons = await getRepository(Pokemon).find();
    const pokemonsCheck = pokemons.map((item: PokemonCheck) => {
        if (user.pokemons.includes(item)) {
            item.inMyPokemons = true;
        } else {
            item.inMyPokemons = false;
        }
        return item
    });
    return pokemonsCheck
}