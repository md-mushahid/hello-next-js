import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Card, Col, Pagination, Row } from "antd";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function navigate(id) {
    setIsLoading(true);
    await router.push(`/pokemon/${id}`);
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <h1>Loding...</h1>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>

      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <h3>{pokemon.id}. {pokemon.name}</h3>
            <img
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              alt={pokemon.name}
            />
            <br/>
            <button style={{padding: '5px 10px', fontSize: '14px', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer',}}
             onClick={() => navigate(pokemon.id)} >Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}