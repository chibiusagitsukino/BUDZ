import { HiMenuAlt1 } from "react-icons/hi";
import { BiSearchAlt, BiUserX } from "react-icons/bi";
import styles from "./index.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Tendina_Menu from "../tendina_menu";

const Navbar = ({ title }) => {
  const [inputSearch, setInputSearch] = useState("");
  const [tendina, setTendina] = useState(false);
  const router = useRouter();

  const refreshPage = () => {
    window.location.reload();
  };
  const toggleTendina = () => {
    setTendina((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputSearch.trim()) {
      router.push(`/search_page/${inputSearch.trim()}`);
      setInputSearch("");
    }
  };



  const goHome = () => {
    router.push(`/#`);
   
  };

  const onHandleLogout = () => { if (typeof window !== "undefined") {
      localStorage.removeItem("logged");
    }; router.pathname ==='/' ? refreshPage():goHome()}
    
    
    
    // ;goHome(); refreshPage(); ;}


  return (
    <div className={styles.Navbar}>
      <h1 className={styles.title_home}>{title}</h1>
      <div className={styles.content_icon_navbar}>
        <HiMenuAlt1 onClick={toggleTendina} className={styles.icon_menu} />
      </div>
      <Tendina_Menu onHandleLogout={onHandleLogout} tendina={tendina} />
      <div className={styles.content_icon_input}>
        <BiUserX onClick={onHandleLogout} className={styles.icon_user} />
        <BiSearchAlt className={styles.icon_search} />
        <form onSubmit={onSubmit}>
          <input
            id="ancor"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
