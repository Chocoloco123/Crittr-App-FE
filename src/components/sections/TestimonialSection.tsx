'use client'

import { motion } from 'framer-motion'

export default function TestimonialSection() {
  return (
    <section className="px-8 py-16 text-center mx-8 rounded-2xl" style={{ backgroundColor: '#fed7aa' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <blockquote className="text-xl italic max-w-2xl mx-auto mb-6 text-gray-800">
          "This app keeps me on top of my dog's care and helps me treasure every memory."
        </blockquote>
        <p className="font-semibold text-gray-700">— Happy Pet Parent</p>
        <p className="text-sm text-gray-600 mt-2">Backed by vets & loved by pet parents</p>
      </motion.div>
    </section>
  )
}
