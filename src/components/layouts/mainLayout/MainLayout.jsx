import Sidebar from "@/components/sidebar";
import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.MainLayout}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
