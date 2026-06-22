import { useState, useCallback } from 'react'

const useModal = (initialData = null) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData]     = useState(initialData)
  const open   = useCallback((payload = null) => { setData(payload); setIsOpen(true) }, [])
  const close  = useCallback(() => { setIsOpen(false); setData(null) }, [])
  const toggle = useCallback(() => setIsOpen(p => !p), [])
  return { isOpen, data, open, close, toggle, setData }
}

export default useModal
