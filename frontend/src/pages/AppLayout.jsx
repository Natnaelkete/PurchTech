import { Outlet } from "react-router-dom";
import Header from "../features/sections/Header";
import Footer from "../features/sections/Footer";

function AppLayout() {
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
