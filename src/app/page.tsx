import Image from "next/image";
import AppLayout from "./layouts/AppLayout/AppLayout.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen.component";

function Home() {
  return (
    <AppLayout>
      <HomeScreen />
    </AppLayout>
  );
}

export default Home;
