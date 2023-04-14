import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2rem, 2rem, 2rem, 2rem",
        }}
      >
        <div>
          <h1 className={styles.heading} style={{ fontFamily: "monospace" }}>
            The Pokemon Page
          </h1>
        </div>
        <div
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            height: "480px",
            width: "800px",
          }}
        >
          <Image src="/pikachu.jpg" alt="Pikachu" width={800} height={480} />
        </div>
        <div>
          <Link href="/pokemons">
            <button
              style={{ fontFamily: "monospace" }}
              className={styles.listPokemonButton}
            >
              List all Pokemons
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
