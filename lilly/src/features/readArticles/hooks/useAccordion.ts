import { useEffect } from 'react'

export const useAccordion = () => {
  useEffect(() => {
    const tocHeader = document.getElementById('toc-header')
    const tocContainer = document.querySelector('.toc-accordion')

    const closeAccordion = () => {
      const htmlElement = tocContainer as HTMLElement
      htmlElement.style.height = '0px'
      tocHeader?.classList.remove('open')
    }

    const toggleAccordion = () => {
      const htmlElement = tocContainer as HTMLElement
      if (htmlElement.style.height === '0px' || !htmlElement.style.height) {
        const scrollHeight = htmlElement.scrollHeight
        htmlElement.style.height = `${scrollHeight}px`
        tocHeader?.classList.add('open')
      } else {
        closeAccordion()
      }
    }

    tocHeader?.addEventListener('click', toggleAccordion)

    return () => {
      tocHeader?.removeEventListener('click', toggleAccordion)
    }
  }, [])
}
