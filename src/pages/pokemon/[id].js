/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
import { useRouter } from "next/router";
import { Spin } from "antd";

export async function getStaticPaths() {
    const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    const pokemon = await resp.json();

    return {
        paths: pokemon.map((pokemon) => ({
            params: { id: pokemon.id.toString() },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    );

    return {
        props: {
            pokemon: await resp.json(),
        },
    };
}

export default function Details({ pokemon }) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function navigate(){
        setIsLoading(true);
        await router.push('/');
        setIsLoading(false)
    }
    
    if(isLoading){
        return(
            <h1>Loding...</h1>
        )
    }
    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <div>
                <button onClick={navigate} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Back to Home</button>
            </div>
            <div className={styles.layout}>
                <div>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name.english}
                    />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(", ")}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({ name, value }) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}