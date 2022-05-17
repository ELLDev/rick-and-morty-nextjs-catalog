import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

export default function CharacterDetails() {
  const {
    query: { name, image, species, status },
  } = useRouter();

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Character Description" />
      </Head>

      <div className={styles.characterDescription}>
        <Image
          src={image as string}
          alt={name as string}
          // layout="responsive"
          width={300}
          height={300}
        />
        <div className={styles.imageWrapper}>
          <span>Name: {name}</span>
          <span>Species: {species}</span>
          <span>Status: {status}</span>
        </div>
      </div>
    </>
  );
}
