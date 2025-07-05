import { BarChart2, Clock, MessageSquare } from 'lucide-react';

interface FeaturesSectionProps {
  isVisible: boolean;
}

export const FeaturesSection = ({ isVisible }: FeaturesSectionProps) => {
  const features = [
    {
      title: 'Real-Time Analytics',
      description: 'Detailed metrics and actionable insights to optimize your content',
      icon: <BarChart2 className="w-12 h-12 mx-auto text-primary" />,
      gradient: 'from-primary to-secondary'
    },
    {
      title: 'Smart Scheduling',
      description: 'Publish content at the optimal time for maximum engagement',
      icon: <Clock className="w-12 h-12 mx-auto text-secondary" />,
      gradient: 'from-secondary to-accent'
    },
    {
      title: 'Comment Management',
      description: 'Respond and manage all interactions from one place',
      icon: <MessageSquare className="w-12 h-12 mx-auto text-accent" />,
      gradient: 'from-accent to-highlight'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="gradient-text">Advanced</span> Features
          </h3>
          <p className={`text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Professional tools to maximize your social media impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-500 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${1600 + index * 200}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h4>
              <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              
              <div className="mt-6">
                <div className={`w-16 h-1 bg-gradient-to-r ${feature.gradient} rounded-full mx-auto transform transition-transform duration-1000 delay-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 