import React, { useState, useEffect, useRef } from 'react';

const SpidrAirFryerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    spidrPin: ''
  });
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  const cursorRef = useRef(null);

  const friedFoodEmojis = ['🍟', '🍗', '🥓', '🍖', '🥔', '🧅', '🥕', '🌶️', '🥨', '🧄'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Create fried food particles occasionally
      if (Math.random() < 0.08) {
        const randomFood = friedFoodEmojis[Math.floor(Math.random() * friedFoodEmojis.length)];
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: Math.random() * 20 + 15,
          life: 1,
          velocityX: (Math.random() - 0.5) * 3,
          velocityY: (Math.random() - 0.5) * 3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          food: randomFood
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          life: particle.life - 0.015,
          size: particle.size * 0.995,
          rotation: particle.rotation + particle.rotationSpeed
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'costGuess') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const formattedValue = numericValue ? `$${parseInt(numericValue).toLocaleString()}` : '';
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'spidrPin') {
      const numericValue = value.replace(/[^0-9]/g, '');
      let formattedValue = '';
      
      for (let i = 0; i < numericValue.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += '-';
        }
        formattedValue += numericValue[i];
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log('🔥 Air Fryer Form Data Submitted:', formData);
    // Create celebration particles with fried foods
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const randomFood = friedFoodEmojis[Math.floor(Math.random() * friedFoodEmojis.length)];
        setParticles(prev => [...prev, {
          id: Date.now() + Math.random(),
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 300,
          size: Math.random() * 30 + 20,
          life: 1,
          velocityX: (Math.random() - 0.5) * 8,
          velocityY: (Math.random() - 0.5) * 8,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
          food: randomFood
        }]);
      }, i * 30);
    }

    // Reset the form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      costGuess: '',
      spidrPin: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Custom Air Fryer Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 transition-all duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`}
        style={{
          left: cursorPosition.x - 20,
          top: cursorPosition.y - 20,
          width: '40px',
          height: '40px',
        }}
      >
        {/* Air Fryer Body */}
        <div className="relative">
          <div className="w-8 h-10 bg-gradient-to-b from-gray-300 to-gray-600 rounded-lg shadow-lg">
            {/* Air Fryer Window */}
            <div className="absolute top-1 left-1 w-6 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded opacity-80"></div>
            {/* Handle */}
            <div className="absolute -right-1 top-2 w-2 h-3 bg-gray-400 rounded-full"></div>
          </div>
          {/* Steam effect */}
          <div className="absolute -top-2 left-3 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
        </div>
      </div>

      {/* Fried Food Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40 select-none"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: particle.size,
            opacity: particle.life,
            transform: `scale(${particle.life}) rotate(${particle.rotation}deg)`,
            filter: `drop-shadow(0 0 8px rgba(255, 165, 0, ${particle.life * 0.8}))`
          }}
        >
          {particle.food}
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full animate-float-delayed"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden transform hover:scale-105 transition-all duration-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-red-500/50 animate-pulse"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <div className="text-4xl animate-bounce">🍟</div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                🔥 Spidr AirFryer Pro Max 🔥
              </h1>
              <div className="text-orange-100 text-lg drop-shadow overflow-hidden">
                <span className="inline-block">The most revolutionary air fryer that'll make your </span>
                <span className="inline-block text-yellow-300 font-bold">
                  {Array.from("taste buds dance!").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-bounce"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationDuration: '0.6s'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105"
                  placeholder="Your awesome first name"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105"
                  placeholder="Your fabulous last name"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">📱</span>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105"
                  placeholder="(555) 123-4567"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105"
                  placeholder="your@email.com"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </div>
            </div>

            {/* Cost Guess */}
            <div className="group">
              <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                <span className="mr-2">💰</span>
                Guess the Air Fryer's Cost *
              </label>
              <input
                type="text"
                name="costGuess"
                value={formData.costGuess}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105"
                placeholder="$299"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
              <p className="text-sm text-orange-300 mt-2 flex items-center">
                <span className="mr-1">🎯</span>
                How much do you think this magical cooking machine costs?
              </p>
            </div>

            {/* Spidr PIN */}
            <div className="group">
              <label className="block text-sm font-semibold text-orange-400 mb-2 flex items-center">
                <span className="mr-2">🔐</span>
                Very, Very Secret 16-Digit Spidr PIN *
              </label>
              <input
                type="text"
                name="spidrPin"
                value={formData.spidrPin}
                onChange={handleInputChange}
                required
                maxLength="19"
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white placeholder-gray-400 group-hover:border-orange-400 transform hover:scale-105 font-mono text-lg tracking-wider"
                placeholder="####-####-####"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
              <p className="text-sm text-orange-300 mt-2 flex items-center">
                <span className="mr-1">🤫</span>
                Psst... this is top secret! Don't tell anyone!
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-700 hover:via-red-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center text-lg">
                  <span className="mr-2 text-xl">🚀</span>
                  COOK UP MY INTEREST!
                  <span className="ml-2 text-xl">🔥</span>
                </span>
              </button>
            </div>

            {/* Fun Footer */}
            <div className="text-center pt-6 border-t-2 border-gray-700">
              <p className="text-sm text-orange-300 flex items-center justify-center">
                <span className="mr-2">🎉</span>
                Get ready to revolutionize your kitchen game!
                <span className="ml-2">🍳</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SpidrAirFryerForm;