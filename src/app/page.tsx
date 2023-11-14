'use client';
import Image from "next/image";
import AppLayout from "./layouts/AppLayout/AppLayout.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen.component";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import DialogLayout from "./layouts/DialogLayout/DialogLayout.component";

function Home() {
  const showDialog = useSelector((state: RootState) => {
    return state.AppReducer.showDialog;
  });
  return (
    <AppLayout>
      {showDialog && <DialogLayout/>}
      <HomeScreen />
    </AppLayout>
  );
}

export default Home;
