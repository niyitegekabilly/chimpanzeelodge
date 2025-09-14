import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppReminderModal from '../modals/WhatsAppReminderModal';
import FloatingWhatsAppButton from '../ui/FloatingWhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppReminderModal />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Layout;