import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import QuickDiagnosticWidget from '../components/landing/QuickDiagnosticWidget';
import EmergencyServicesGrid from '../components/landing/EmergencyServicesGrid';
import MechanicsMapPreview from '../components/landing/MechanicsMapPreview';
import CostEstimatorCalculator from '../components/landing/CostEstimatorCalculator';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import FaqSection from '../components/landing/FaqSection';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickDiagnosticWidget />
      <EmergencyServicesGrid />
      <MechanicsMapPreview />
      <CostEstimatorCalculator />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </div>
  );
};

export default LandingPage;
