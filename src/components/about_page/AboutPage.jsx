import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

const contributors = [
  {
    id: 1,
    name: "Ilenia Ingrassia",
    role: "Frontend Developer",
    image: "/propic/ilenia.jpg",
    github: "https://github.com/ileniai",
    linkedin: "http://linkedin.com/in/ilenia-ingrassia-a43a7019a",
    email: "ilenia.ingrassia91@gmail.com",
  },
  {
    id: 2,
    name: "Fabio Massi",
    role: "Frontend Developer",
    image: "/propic/fabio.jpg",
    github: "https://github.com/timcrocodile",
    linkedin: "https://www.linkedin.com/in/fabio-massi-7b755112a/",
    email: "massibrokercivitanova@gmail.com",
  },
  {
    id: 3,
    name: "Adriana Origlio",
    role: "Frontend Developer",
    image: "/propic/adriana.jpg",
    github: "https://github.com/chibiusagitsukino",
    linkedin: "https://www.linkedin.com/in/adriana-origlio/",
    email: "adrianaoriglio@gmail.com",
  },
  {
    id: 4,
    name: "Alessio Perez",
    role: "Frontend Developer",
    image: "/propic/alessio.jpg",
    github: "https://github.com/alekyari",
    linkedin: "https://www.linkedin.com/in/alessio-perez/",
    email: "1alessio.perez@gmail.com",
  },
  {
    id: 5,
    name: "Luisa Zizzo",
    role: "Frontend Developer",
    image: "/propic/luisa.jpg",
    github: "https://github.com/Luisazizzo",
    linkedin: "https://www.linkedin.com/in/luisa-zizzo/",
    email: "luisa0zizzo@gmail.com",
  },
];

const AboutPage = () => {
  return (
    <div className={styles.AboutPage}>
      <h1>Meet the team</h1>
      <div className={styles.Content}>
        {contributors.map((contributor) => (
          <div className={styles.Contributor} key={contributor.id}>
            <div className={styles.ImageWrapper}>
              <Image
                src={contributor.image}
                width={200}
                height={200}
                alt={contributor.name}
              />
            </div>
            <div className={styles.Info}>
              <h2>{contributor.name}</h2>
              <h3>{contributor.role}</h3>
              <div className={styles.Links}>
                <Link target="_blank" href={contributor.github}>
                  <span>Github</span>
                </Link>
                <Link target="_blank" href={contributor.linkedin}>
                  <span>LinkedIn</span>
                </Link>
                <Link href={`mailto: ${contributor.email}`}>
                  <span>Email</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
