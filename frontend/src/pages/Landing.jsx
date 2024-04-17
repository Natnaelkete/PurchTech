import Features from "../features/sections/Feature";
import Hero from "../features/sections/Hero";

function Landing() {
  return (
    <div>
      <section className="mt-20 ">
        <Hero />
      </section>
      <section className="mt-24 ">
        <Features />
      </section>
    </div>
  );
}

export default Landing;
