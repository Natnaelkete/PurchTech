import { Outlet } from "react-router-dom";
import Header from "../features/sections/Header";
import Footer from "../features/sections/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../slices/authSlice";

function AppLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <div>
      <section>
        <Header />
      </section>
      <section className="mx-auto max-w-[75rem] px-8">
        <Outlet />
      </section>
      <section className="mt-24">
        <Footer />
      </section>
    </div>
  );
}

export default AppLayout;
