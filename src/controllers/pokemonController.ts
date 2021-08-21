import { Request, Response } from "express";
import * as sessionService from "../services/sessionService";
import * as pokemonService from "../services/pokemonService";

export async function getAllPokemons(req: Request, res: Response ) {
    //middleware auth
    const token: string = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.sendStatus(401);
    const session = await sessionService.authSession(token);
    if (session === null) return res.sendStatus(401);
    //middleware auth
    
    const pokemons = await pokemonService.getPokemonsCheckingUser(session.userId);

    res.send(pokemons)
}