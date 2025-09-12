'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import './about.css'

export default function AboutSection() {
  const stats = [
    { icon: '/images/icons/dog.png', number: '50K+', label: 'Happy Pet Parents' },
    { icon: '/images/icons/heart-pink.png', number: '100K+', label: 'Pets Tracked' },
    { icon: '/images/icons/cat.png', number: '4.9/5', label: 'App Store Rating' },
    { icon: '/images/icons/paw.png', number: '99.9%', label: 'Uptime Guarantee' }
  ]

  const teamValues = [
    {
      title: 'Pet-First Design',
      description: 'Every feature is designed with your pet\'s wellbeing in mind. We understand the unique bond between pets and their families.',
      icon: '/images/icons/paw.png'
    },
    {
      title: 'Veterinary Expertise',
      description: 'Our team includes licensed veterinarians who ensure our health tracking features are accurate and helpful.',
      icon: '/images/icons/stethescope.png'
    },
    {
      title: 'Privacy & Security',
      description: 'Your pet\'s data is encrypted and secure. We never share your information without your explicit consent.',
      icon: '/images/icons/robot.png'
    },
    {
      title: 'Community Driven',
      description: 'Built by pet parents, for pet parents. We listen to our community and continuously improve based on your feedback.',
      icon: '/images/icons/heart-pink.png'
    }
  ]

  return (
    <section id="about" className="px-8 py-16" style={{ backgroundColor: '#FEFBEE' }}>
      <div className="max-w-6xl mx-auto aboutContainer">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 " style={{ color: '#14504E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            About Crittr
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We're passionate pet parents who believe every pet deserves the best care. 
            Crittr was born from our own struggles to keep track of our pets' health, 
            appointments, and precious memories.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white shadow-md">
                <div className="w-12 h-12 relative">
                  <Image 
                    src={stat.icon} 
                    alt={stat.label}
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#14504E' }}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-2xl"
          style={{ backgroundColor: '#fed7aa' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#14504E' }}>
                Our Story
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="mb-6 text-lg">
                  It started with Teddy, my golden retriever. Between vet appointments, 
                  medication schedules, and wanting to capture every adorable moment, I was drowning in sticky notes and scattered photos.
                </p>
                <br/>
                <p className="mb-6 text-lg">
                  I knew there had to be a better way. So I built Crittr - a comprehensive 
                  platform that combines health tracking, memory keeping, and AI-powered 
                  insights to help pet parents like me give our furry family members the 
                  best care possible.
                </p>
                <br/>
                <p className="mb-6 text-lg">
                  Today, Crittr helps thousands of pet parents stay organized, informed, 
                  and connected to their pets' wellbeing. Because every pet deserves to 
                  live their healthiest, happiest life.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full h-full relative">
                  <Image 
                    src="/images/icons/goldenretriever.png" 
                    alt="Teddy the Golden Retriever" 
                    fill 
                    className="object-contain bg-gradient-to-br from-teal-100 to-orange-100" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: '#14504E' }}>
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamValues.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image 
                      src={value.icon} 
                      alt={value.title}
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3" style={{ color: '#14504E' }}>
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold !mb-6" style={{ color: '#14504E' }}>
            Join Our Pet Parent Community
          </h3>
          <p className="text-gray-600 !mb-5 max-w-2xl mx-auto">
            Ready to give your pets the care they deserve? Start your free trial today 
            and join thousands of happy pet parents who trust Crittr.
          </p>
          <button 
            className="text-white px-6 py-3 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
            style={{ backgroundColor: '#2c8d9b' }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#247a85'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c8d9b'}
          >
            Start Your Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  )
}