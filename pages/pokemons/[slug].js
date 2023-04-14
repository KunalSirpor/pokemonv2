import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "../../components/pokemonCard";
import styles from "../../styles/Pokemons.module.css";
import { gql, useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import client from "../../client";
import { useRouter } from "next/router";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const GET_POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`;

const Pokemons = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (window && window.location) {
      setLoading(false);
      setCurrentPage(window.location.pathname.split("/")[2] - 1);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setPokemonList(data.pokemons);
    }
  }, [data]);

  // Handle page change event
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    router.push("/pokemons/" + (selected + 1), undefined, { shallow: true });
  };

  const startIndex = currentPage * 20;
  const endIndex = startIndex + 20;
  const displayPokemon = pokemonList.slice(startIndex, endIndex);

  return (
    <div>
      <div className={styles.main}>
        {displayPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            number={pokemon.number}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={Math.ceil(pokemonList.length / 20)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        previousClassName={styles.page}
        nextClassName={styles.page}
        activeClassName={styles.active}
      />
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "1" } },
      { params: { slug: "2" } },
      { params: { slug: "3" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const pages = params.slug;
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: {
      first: pages * 200,
    },
  });
  // }

  return {
    props: { data },
    revalidate: 1,
  };
}
export default Pokemons;
