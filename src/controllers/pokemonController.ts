import { Request, Response } from "express";
import * as pokemonService from "../services/pokemonService";

export async function getAllPokemons(req: Request, res: Response ) {
    const session = res.locals.session;
    
    const pokemons = await pokemonService.getPokemonsCheckingUser(session.userId);

    res.send(pokemons)
}