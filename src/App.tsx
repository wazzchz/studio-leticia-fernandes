import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ServicesCatalog from './components/ServicesCatalog';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { useStudioSettings } from './hooks/useStudioSettings';

/**
 * Studio Letícia Fernandes — editorial mobile-first composition.
 * Floating glass nav → hero → marquee → catalog → portfolio → reviews → booking → footer.
 */
export default function App() {
  const [selectedService, setSelectedService] = useState('');
  // Número oficial vem da API (GET /api/settings) com fallback local.
  const settings = useStudioSettings();

  const handleBook = useCallback((serviceId: string) => {
    setSelectedService(serviceId);
    requestAnimationFrame(() => {
      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <ServicesCatalog onBook={handleBook} />
        <Portfolio />
        <Testimonials />
        <BookingSection
          preselected={selectedService}
          onSelectService={setSelectedService}
          whatsappNumber={settings.whatsappNumber}
        />
      </main>
      <Footer whatsappDisplay={settings.whatsappDisplay} />
      <WhatsAppFloat whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
