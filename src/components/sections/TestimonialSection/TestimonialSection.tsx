'use client'

import { motion } from 'framer-motion'
import './TestimonialSection.scss'

export default function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="testimonial-content"
      >
        <blockquote className="testimonial-quote">
          "This app keeps me on top of my dog's care and helps me treasure every memory."
        </blockquote>
        <p className="testimonial-author">— Happy Pet Parent</p>
        <p className="testimonial-subtitle">Backed by vets & loved by pet parents</p>
      </motion.div>
    </section>
  )
}
