'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import './FAQSection.scss'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Can I track multiple pets?",
      answer: "Yes! Our Free plan allows up to 2 pets, while Pro and Family plans support unlimited pets. Each pet has their own profile with separate journal entries, health data, and reminders."
    },
    {
      question: "Is my pet's data secure and private?",
      answer: "Absolutely. We use industry-standard encryption to protect your data. Your pet's information is never shared with third parties without your explicit consent. We're GDPR compliant and take privacy seriously."
    },
    {
      question: "Can I export my pet's data?",
      answer: "Yes! You can export your pet's journal entries, health data, and reports in CSV format. This is especially useful for sharing comprehensive health records with your veterinarian."
    },
    {
      question: "How does the AI-powered health insights work?",
      answer: "Our AI analyzes your pet's journal entries, weight trends, medication schedules, and symptoms to provide personalized health insights and care recommendations. The more data you provide, the more accurate the insights become."
    },
    {
      question: "Can I use this app on my mobile device?",
      answer: "Yes! Crittr is fully responsive and works perfectly on smartphones and tablets. You can log activities, add photos, and access all features from any device with a web browser."
    },
    {
      question: "What happens if I cancel my subscription?",
      answer: "You can cancel your subscription anytime. Your data will remain accessible for 30 days after cancellation. After that, your account will be downgraded to the Free plan, and you'll retain access to basic features."
    },
    {
      question: "Do you offer family sharing?",
      answer: "Yes! Our Family plan includes multi-user access, allowing family members to collaborate on pet care. You can assign different roles and permissions to ensure everyone stays informed about your pets' health."
    },
    {
      question: "Can I set up custom reminders?",
      answer: "Absolutely! You can create custom reminders for feeding times, medication schedules, vet appointments, grooming sessions, and any other recurring pet care activities. Reminders can be set for specific times or intervals."
    },
    {
      question: "How do I get support if I need help?",
      answer: "We offer multiple support channels. Free plan users get community support, Pro users get priority email support, and Family plan users get dedicated support. We also have comprehensive documentation and video tutorials."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq-section">
      {/* Subtle background pattern */}
      <div className="faq-background-pattern">
        <div className="faq-pattern-2">💡</div>
        <div className="faq-pattern-3">🤔</div>
      </div>
      
      <div className="faq-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="faq-header"
        >
          <h2 className="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about Crittr
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="faq-item"
              style={{ width: '100%', maxWidth: '100%' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-question-button"
              >
                <span className="faq-question-text">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className={`faq-icon open`} />
                  ) : (
                    <Plus className={`faq-icon closed`} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer"
                  >
                    <div className="faq-answer-content">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
