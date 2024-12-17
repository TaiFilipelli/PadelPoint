import '../../../styles/animations.css'
import { Poppins } from 'next/font/google'

const pop = Poppins({ subsets: ['latin'], weight: '400' })

export default function AnimatedBar() {
  return (
    <nav className={`${pop.className} top-0 z-50 bg-black text-white wrapper`}>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
        <span className='item text-sm'>PadelPoint Store</span>
        <span className='item text-sm'>3, 6 y 9 CUOTAS SIN INTERÉS!</span>
    </nav>
  )
}