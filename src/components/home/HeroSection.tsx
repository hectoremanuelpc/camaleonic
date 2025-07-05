import { useModal } from "../ClientLayout";

interface HeroSectionProps {
  isVisible: boolean;
}

export const HeroSection = ({ isVisible }: HeroSectionProps) => {
  const { openRegisterModal } = useModal();

  const handleRegister = () => {
    openRegisterModal();
  };

  return (
    <section className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="gradient-text">Social</span>{' '}
            <span className="text-foreground">Media</span>
          </h1>
          <h2 className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-foreground">Dashboard</span>
          </h2>
          <p className={`text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Control all your social networks from one place. Analyze, schedule and optimize your digital presence with advanced tools.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <button onClick={handleRegister} className="cursor-pointer gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Free
            </button>
            <button className="cursor-pointer border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 