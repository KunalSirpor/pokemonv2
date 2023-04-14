/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "../styles/Details.module.css";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import Modal from "react-modal";
import client from "../client";
const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($id: String!) {
    pokemon(id: $id) {
      name
      number
      image
      weaknesses
      classification
      resistant
      types
      height {
        maximum
      }
      weight {
        maximum
      }
      maxHP
      maxCP
    }
  }
`;

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

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id },
  });

  const [evolution, setEvolution] = useState(null);

  const handleModalClick = async () => {
    const { data } = await client.query({
      query: GET_EVOLUTION,
      variables: {
        id: id,
      },
    });
    console.log(data);
    if (data.pokemon.evolutions === null) {
      toast.error("No evolution found for this pokemon");
      console.log("No evolution found for this pokemon");
      return;
    }
    setEvolution(data);
  };

  const handleModalClose = () => {
    setEvolution(null);
  };

  useEffect(() => {
    if (loading) {
      toast.loading(
        "Loading",
        { duration: 1000, autoclose: true },
        { toastId: "loading" }
      );
    }
  }, [loading]);

  return (
    <div>
      {loading === true ? (
        <></>
      ) : (
        <>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "3rem",
            }}
          >
            Detailed Info
          </h1>
          <div className={styles.main}>
            <div className={styles.mainCard}>
              <div className={styles.title}>
                <h1>{data.pokemon.name}</h1>
                <h1 style={{ color: "#777" }}>{data.pokemon.number}</h1>
              </div>
              <div>
                <div className={styles.image}>
                  <img src={data.pokemon.image} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={styles.evoButton}
                    onClick={handleModalClick}
                  >
                    Get Evolution
                  </button>
                  <Modal
                    isOpen={evolution === null ? false : true}
                    onRequestClose={handleModalClose}
                    contentLabel="Evolution Modal"
                    className={styles.modalContent}
                    overlayClassName={styles.modalOverlay}
                  >
                    <h2>Evolution Details</h2>
                    {/* {console.log("data", data)} */}
                    <div style={{ display: "flex" }}>
                      <div className={styles.evolImg}>
                        <div>
                          <img
                            src={data.pokemon.image}
                            alt={data.pokemon.name}
                            height={300}
                            width={300}
                          />
                          <h3
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {data.pokemon.name}
                          </h3>
                        </div>
                      </div>
                      {evolution && (
                        <div style={{ display: "flex" }}>
                          {evolution.pokemon.evolutions.map((evolution) => (
                            <div
                              className={styles.evolImg}
                              key={evolution.number}
                            >
                              <div>
                                <img
                                  src={evolution.image}
                                  alt={evolution.name}
                                  height={300}
                                  width={300}
                                />
                                <h3
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {evolution.name}
                                </h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <button onClick={handleModalClose}>Close</button> */}
                  </Modal>
                </div>
                <div className={styles.details}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className={styles.card}>
                      <div className={styles.ok}>
                        <h3
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                          }}
                        >
                          Height
                        </h3>
                        <p style={{ fontFamily: "monospace" }}>
                          {data.pokemon.height.maximum}
                        </p>
                      </div>
                      <div className={styles.ok}>
                        <h3
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                          }}
                        >
                          Weight
                        </h3>
                        <p style={{ fontFamily: "monospace" }}>
                          {data.pokemon.weight.maximum}
                        </p>
                      </div>
                      <div className={styles.ok}>
                        <h3
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                          }}
                        >
                          Max HP
                        </h3>
                        <p style={{ fontFamily: "monospace" }}>
                          {data.pokemon.maxHP}
                        </p>
                      </div>
                      <div className={styles.ok}>
                        <h3
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                          }}
                        >
                          Classification
                        </h3>
                        <p style={{ fontFamily: "monospace" }}>
                          {data.pokemon.classification}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.info}>
                    <h3>Types</h3>
                    <div className={styles.typeContainer}>
                      {data.pokemon.types.map((type) => (
                        <div
                          key={type}
                          className={`${styles.typeBox} ${
                            styles[type.toLowerCase()]
                          }`}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                    <h3>Weakness</h3>
                    <div className={styles.typeContainer}>
                      {data.pokemon.weaknesses.map((weakness) => (
                        <div
                          key={weakness}
                          className={`${styles.typeBox} ${
                            styles[weakness.toLowerCase()]
                          }`}
                        >
                          {/* <span className={styles[weakness.toLowerCase()]}> */}
                          {weakness}
                          {/* </span> */}
                        </div>
                      ))}
                    </div>
                    <h3>Resistant</h3>
                    <div className={styles.typeContainer}>
                      {data.pokemon.resistant.map((res) => (
                        <div
                          key={res}
                          className={`${styles.typeBox} ${
                            styles[res.toLowerCase()]
                          }`}
                        >
                          {res}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
