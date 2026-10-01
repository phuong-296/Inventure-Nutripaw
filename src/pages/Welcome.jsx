import Navbar from '../components/welcome/Navbar.jsx'
import Hero from '../components/welcome/Hero.jsx'
import StatsBar from '../components/welcome/StatsBar.jsx'
import HowItWorks from '../components/welcome/HowItWorks.jsx'
import WhyChooseUs from '../components/welcome/WhyChooseUs.jsx'
import Newsletter from '../components/welcome/Newsletter.jsx'
import CTASection from '../components/welcome/CTASection.jsx'
import Footer from '../components/welcome/Footer.jsx'

export default function Welcome() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <HowItWorks />
        <WhyChooseUs />
        <Newsletter />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
