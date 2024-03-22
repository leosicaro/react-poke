import { useState, useEffect } from 'react'


function Formulario() {

    const [name, setname] = useState('')
    const [resultados, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (name === '') {
            setResults([]);
            return;
        } else {
            setLoading(true);
            fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim}`)

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Pokemon not found');
                    }
                    return response.json();
                })
                .then(data => {
                    setResults([data]);
                    setLoading(false);
                    setError(null);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                    setResults([]);
                });
        }
    }, [name]);

    const handleSearchChange = (event) => {
        setname(event.target.value);
       
    };
    const preventEvent = (e) => {
       
        e.preventDefault()
    };

    return (
        <>
            <div >
                <h1>Buscador Pokemon</h1>
                <form onSubmit={preventEvent}>
                    <input
                        type="text"
                        placeholder="write pokemon name or num"
                        value={name}
                        onChange={handleSearchChange}
                    />
                </form>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                {resultados.length > 0 && (
                    <div>
                        {resultados.map(pokemon => (
                            <div key={pokemon.id}>
                                <h2>{pokemon.name}</h2>
                                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} /> 
                            </div>
                        ))}
                    </div>
                )}
                {name !== '' && resultados.length === 0 && !loading && !error && (
                    <p>No se ha encontrado ningún pokemon</p>
                )}
            </div>
        </>
    )
}

export default Formulario