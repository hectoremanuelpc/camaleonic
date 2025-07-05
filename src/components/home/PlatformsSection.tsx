import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';

interface PlatformsSectionProps {
  isVisible: boolean;
}

export const PlatformsSection = ({ isVisible }: PlatformsSectionProps) => {
  const socialPlatforms = [
    { 
      name: 'Instagram', 
      followers: '1.2M', 
      growth: '+12%', 
      color: 'from-pink-500 to-purple-600', 
      icon: <FaInstagram className="w-6 h-6" style={{ color: '#E4405F' }} /> 
    },
    { 
      name: 'Facebook', 
      followers: '856K', 
      growth: '+8%', 
      color: 'from-blue-600 to-blue-800', 
      icon: <FaFacebook className="w-6 h-6" style={{ color: '#1877F2' }} /> 
    },
    { 
      name: 'Twitter - X', 
      followers: '445K', 
      growth: '+15%', 
      color: 'from-blue-400 to-blue-600', 
      icon: <FaXTwitter className="w-6 h-6" style={{ color: '#000000' }} /> 
    },
    { 
      name: 'LinkedIn', 
      followers: '98K', 
      growth: '+22%', 
      color: 'from-blue-700 to-blue-900', 
      icon: <FaLinkedin className="w-6 h-6" style={{ color: '#0A66C2' }} /> 
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <span className="gradient-text">Connect</span> All Your Platforms
          </h3>
          <p className={`text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            Seamless integration with major social networks. Monitor your performance in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-sm border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-500 ${
                isVisible ? 'animate-fade-in-right' : 'opacity-0'
              }`}
              style={{ animationDelay: `${1200 + index * 200}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {platform.growth}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl">
                    {platform.icon}
                  </span>
                  <h4 className="text-xl font-bold text-foreground">{platform.name}</h4>
                </div>
                <p className="text-2xl font-bold gradient-text">{platform.followers}</p>
                <p className="text-sm text-foreground/70">followers</p>
                
                <div className="mt-4 h-2 bg-neutral/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${platform.color} rounded-full transform origin-left transition-transform duration-1000 delay-1000`}
                    style={{ 
                      width: '100%',
                      transform: isVisible ? 'scaleX(0.8)' : 'scaleX(0)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 