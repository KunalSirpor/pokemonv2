/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "../styles/Pokemons.module.css";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import client from "../client";
import { toast } from "react-hot-toast";

const GET_EVOLUTION = gql`
  query getEvolution($id: String!) {
    pokemon(id: $id) {
      evolutions {
        name
        number
        image
      }
    }
  }
`;

const PokemonCard = ({ id, number, name, image, types }) => {
  const [evolution, setEvolution] = useState(null);

  const handleModalClick = async () => {
    event.preventDefault();
    const { data } = await client.query({
      query: GET_EVOLUTION,
      variables: {
        id: id,
      },
    });
    console.log(data);
    if (data.pokemon.evolutions === null) {
      toast.error("No evolution found for this pokemon");
      return;
    }
    setEvolution(data);
  };

  const handleModalClose = () => {
    setEvolution(null);
  };

  return (
    <div className={styles.main}>
      <Link href={`/details?id=${id}`}>
        <div className={styles.pokemonCardMin}>
          <div className={styles.pokemonCard}>
            {/* <div className={styles.borderTop}></div> */}
            <h2 style={{ marginTop: "-2rem" }}>{name}</h2>
            <p style={{ fontWeight: "bold" }}>#{number}</p>
            <img src={image} alt="pokemon" />
            <div className={styles.typeBubble}>
              {types.map((type) => (
                <span key={type} className={styles[type.toLowerCase()]}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
