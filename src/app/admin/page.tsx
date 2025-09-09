'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminPanel from '@/components/admin/AdminPanel'

export default function AdminPage() {
  // In a real app, this would check the user's role from authentication
  const [isAdmin] = useState(true) // Mock admin status

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AdminPanel isAdmin={isAdmin} />
    </motion.div>
  )
}
