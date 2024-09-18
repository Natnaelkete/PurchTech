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
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div> */}

      <section>
        <Header />
      </section>
      <section className="mx-auto max-w-[75rem] relative px-8">
        <Outlet />
      </section>
      <section className="mt-24">
        <Footer />
      </section>
    </div>
  );
}

export default AppLayout;
