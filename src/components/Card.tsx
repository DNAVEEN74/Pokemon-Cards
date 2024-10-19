import { useEffect, useState } from "react";

type Types = {
    slot: number,
    type: {
        name: string,
        url: string
    }
}[];

type Abilities = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}[];

type Stats = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}[];

type Sprites = {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female:  string,
    front_default:  string,
    front_female:  string,
    front_shiny:  string,
    front_shiny_female: string,
}

interface CardProps {
    url: string;
}

export default function Card ({ url }: CardProps): React.JSX.Element {
    const [name, setName] = useState<string>('');
    const [PokemonType, setPokemonType] = useState<Types>([]);
    const [abilities, setAbilities] = useState<Abilities>([]);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [baseStats, setBaseStats] = useState<Stats>([]);
    const [images, setImages] = useState<Sprites | null>(null);

    const fetchPokemonDetails = async () => {
        const response = await fetch(url);
        const data = await response.json();

        setName(data.name);
        setPokemonType(data.types);
        setAbilities(data.abilities);
        setHeight(data.height);
        setWeight(data.weight);
        setBaseStats(data.stats);
        setImages(data.sprites);
    }

    useEffect(() => {
        fetchPokemonDetails();
    },[]);

    return (
        <div className="shadow-2xl shadow-gray-500 bg-gray-200 w-full p-4 min-w-80 m-0 rounded-md h-full border-slate-800" id="Pokemon-card">
            <div className="text-2xl font-bold text-center">
                {name ? (
                name.toUpperCase()
                ) : (
                <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                )}
            </div>
            <div className="flex justify-center mb-4">
                {images?.front_default ? (
                <img src={images.front_default} alt={name} id="Pokemon-image" className="size-40"/>
                ) : (
                <div className="h-40 w-40 mt-2 bg-gray-300 animate-pulse rounded-md"></div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div>
                <h4 className="font-semibold">Type:</h4>
                {PokemonType.length ? (
                    <p>{PokemonType[0].type.name}</p>
                ) : (
                    <div className="h-4 w-24 bg-gray-300 animate-pulse rounded-md"></div>
                )}
                </div>
                <div>
                <h4 className="font-semibold">Abilities:</h4>
                {abilities.length ? (
                    <ul className="list-disc list-inside">
                    {abilities.map((item, index) => (
                        <li key={index}>{item.ability.name}</li>
                    ))}
                    </ul>
                ) : (
                    [...Array(2)].map((_, index) => (
                        <div key={index} className="h-4 w-32 mb-1 bg-gray-300 animate-pulse rounded-md"></div>
                    ))
                )}
                </div>
                <div>
                <h4 className="font-semibold">Height:</h4>
                {height ? (
                    <p>{height}</p>
                ) : (
                    <div className="h-4 w-12 bg-gray-300 animate-pulse rounded-md"></div>
                )}
                </div>
                <div>
                <h4 className="font-semibold">Weight:</h4>
                {weight ? (
                    <p>{weight}</p>
                ) : (
                    <div className="h-4 w-12 bg-gray-300 animate-pulse rounded-md"></div>
                )}
                </div>
                <div>
                <h4 className="font-semibold">Base stats:</h4>
                {baseStats.length ? (
                    <ul>
                    {baseStats.slice(0, 3).map((item, index) => (
                        <li key={index} className="mt-1">
                        {item.stat.name}: {item.base_stat}
                        </li>
                    ))}
                    </ul>
                ) : (
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="h-4 w-32 mb-1 bg-gray-300 animate-pulse rounded-md"></div>
                    ))
                )}
                </div>
                <div>
                {baseStats.length ? (
                    <ul className="mt-2">
                    {baseStats.slice(3, 6).map((item, index) => (
                        <li key={index} className="mt-1">
                        {item.stat.name}: {item.base_stat}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className="mt-5">
                        { [...Array(3)].map((_, index) => (
                        <div key={index} className="h-4 w-32 mb-1 bg-gray-300 animate-pulse rounded-md"></div>
                        ))}
                    </div>
                )}
                </div>
            </div>
            </div>

    )
}