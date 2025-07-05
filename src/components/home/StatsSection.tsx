import { Users, TrendingUp, Heart, Zap } from 'lucide-react';

interface StatsSectionProps {
  isVisible: boolean;
}
export const StatsSection = ({ isVisible }: StatsSectionProps) => {
  const stats = [
    { number: '2.5M+', label: 'Total Followers', icon: <Users className="w-6 h-6 text-blue-500 mx-auto" /> },
    { number: '156%', label: 'Monthly Growth', icon: <TrendingUp className="w-6 h-6 text-green-500 mx-auto" /> },
    { number: '89K', label: 'Engagement Rate', icon: <Heart className="w-6 h-6 text-red-500 mx-auto" /> },
    { number: '24/7', label: 'Monitoring', icon: <Zap className="w-6 h-6 text-yellow-500 mx-auto" /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: `${800 + index * 150}ms`,
            transitionProperty: 'opacity, transform'
          }}
        >
          <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${index * 1000}ms` }}>
            {stat.icon}
          </div>
          <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
          <div className="text-foreground/70">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}; 