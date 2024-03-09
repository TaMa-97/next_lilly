import { useState } from 'react'

export const useAccordion = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, toggleAccordion }
}
