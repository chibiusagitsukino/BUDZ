import references from "@/utils/references";
import Image from "next/image";
import styles from "./index.module.scss";
import logo from "../../../public/logo/budz.png";
import { useState } from "react";

const Modal_login = ({ setModalIsVisibility }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredential, setWrongCredential] = useState(true);
  const onHandleUsername = (e) => {
    setUserName(e.target.value);
  };

  const onHandlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (userName === references.username && password === references.password) {
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("logged", true),
      // }
      setModalIsVisibility(false)
    } else {
      setWrongCredential(true)
    }
  };

  return (
    <div className={styles.Modal_login}>
      {wrongCredential && <h1>Rieseguiihih laccesso!</h1>}

      <p className={styles.info1}>
        Iscriviti per ricevere brani e podcast illimitati. Non è necessaria
        alcuna carta di credito.
      </p>

      <div className={styles.containerLogin}>
        <Image
          src={logo}
          alt={"logo.png"}
          width={30}
          height={30}
          className={styles.logo}
        />
        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={onHandleUsername}
            value={userName}
            required
          />
          <input
            type="password"
            placeholder="password"
            onChange={onHandlePassword}
            value={password}
            required
          />
          <input type="submit" value="Login" className={styles.inputLogin} />
        </form>
      </div>
      <p className={styles.info2}>
        Per saperne di più su come Budz raccoglie, utilizza, condivide e
        protegge i tuoi dati personali, leggi l{"'"}informativa sulla privacy di
        budz.
      </p>
    </div>
  );
};

export default Modal_login;
