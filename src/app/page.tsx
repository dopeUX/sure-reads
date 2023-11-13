import Image from "next/image";
import AppLayout from "./layouts/AppLayout/AppLayout.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen.component";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <AppLayout>
      <HomeScreen />
    </AppLayout>
  );
}
