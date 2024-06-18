"use client"
import styles from "./page.module.css";
import MainLayout from "./dashboard/mainLayout";
import { useAuth } from "./components/authContext";
import Login from "./components/userLogin";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <main className={styles.main}>
      {user ? <MainLayout /> : <Login />}
    </main>
  );
};

export default Home;