import { useModal } from "../ClientLayout";

interface CallToActionProps {
  isVisible: boolean;
}

export const CallToAction = ({ isVisible }: CallToActionProps) => {
  const { openRegisterModal } = useModal();

  const handleStartNow = () => {
    openRegisterModal();
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Revolutionize</span> your Social Media?
          </h3>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and businesses already maximizing their digital presence with our dashboard.
          </p>
          <button onClick={handleStartNow} className="gradient-primary text-white px-12 py-6 rounded-2xl text-xl font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl animate-pulse-glow cursor-pointer">
            Start Now - It&apos;s Free
          </button>
        </div>
      </div>
    </section>
  );
}; 