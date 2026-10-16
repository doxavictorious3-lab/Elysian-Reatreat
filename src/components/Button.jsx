import { Link } from 'react-router-dom'
const styles = {
  primary: 'bg-gold text-charcoal hover:bg-[#c7aa74]',
  dark: 'bg-forest text-ivory hover:bg-[#2c4a3b]',
  outline: 'border border-current hover:bg-white/10',
}
export default function Button({ to, variant = 'primary', className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`
  return to ? <Link to={to} className={cls} {...props}>{children}</Link>
            : <button className={cls} {...props}>{children}</button>
}
