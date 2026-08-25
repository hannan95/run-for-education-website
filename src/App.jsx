import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import EventDetails from './components/EventDetails.jsx'
import Registration from './components/Registration.jsx'
import Pricing from './components/Pricing.jsx'
import Donate from './components/Donate.jsx'
import PartnerClubs from './components/PartnerClubs.jsx'
import Sponsors from './components/Sponsors.jsx'
import Ambassadors from './components/Ambassadors.jsx'
import FAQ from './components/FAQ.jsx'
import Updates from './components/Updates.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <EventDetails />
        <Registration />
        <Pricing />
        <Donate />
        <PartnerClubs />
        <Sponsors />
        <Ambassadors />
        <FAQ />
        <Updates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
