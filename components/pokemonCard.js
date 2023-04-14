/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "../styles/Pokemons.module.css";
import Modal from "react-modal";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
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
          {/* </Link> */}
          {/* <button className={styles.pokemonCardEvol} onClick={handleModalClick}>
            Evolution
          </button>
          <Modal
            isOpen={evolution === null ? false : true}
            onRequestClose={handleModalClose}
            contentLabel="Evolution Modal"
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
          >
            <h2>Evolution Details</h2>
            <div style={{ display: "flex" }}>
              <div className={styles.evolImg}>
                <div>
                  <img src={image} alt={name} height={300} width={300} />
                  <h3>{name}</h3>
                </div>
              </div>
              {evolution && (
                <div style={{ display: "flex" }}>
                  {evolution.pokemon.evolutions.map((evolution) => (
                    <div className={styles.evolImg} key={evolution.number}>
                      <div>
                        <img
                          src={evolution.image}
                          alt={evolution.name}
                          height={300}
                          width={300}
                        />
                        <h3>{evolution.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal> */}
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
