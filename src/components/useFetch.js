import { useEffect, useState } from "react";

export function useFetch() {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const getPokemons = async (url) => {
            const res = await fetch(url)
            const listOfPokemons = await res.json()
            const { results } = listOfPokemons


            const newPokemons = results.map(async (pokemon) => {
                const res = await fetch(pokemon.url)
                const poke = await res.json()
                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other['official-artwork'].front_default
                }
            })
            setPokemons(await Promise.all(newPokemons))
            console.log(await Promise.all(newPokemons))
        }
        getPokemons()

    }, [])
    console.log(pokemons)
}