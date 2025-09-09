'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the magic link authentication work?",
      answer: "Magic link authentication eliminates the need for passwords. When you sign in, we send a secure link to your email address. Click the link and you're automatically signed in. This is more secure than traditional passwords and much more convenient."
    },
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
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Crittr
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors rounded-xl"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400" />
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
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">💬</span>
              <h3 className="text-2xl font-bold text-gray-900">
                Still have questions?
              </h3>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8 py-3 text-lg font-semibold">
                Contact Support
              </button>
              <button className="btn btn-secondary px-8 py-3 text-lg font-semibold">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
