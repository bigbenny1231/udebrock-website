import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SherwinPartnership from "@/components/sections/SherwinPartnership";
import Testimonials from "@/components/sections/Testimonials";
import PaymentSection from "@/components/sections/PaymentSection";
import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
      <SherwinPartnership />
      <ContactForm />
      <PaymentSection />
      <Footer />
    </main>
  );
}
