import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import { CartProvider } from '@/components/tienda/cart-context'
import CartDrawer from '@/components/tienda/CartDrawer'
import CartButton from '@/components/tienda/CartButton'

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <Footer />
      <CartButton />
      <CartDrawer />
      <ContactModal />
    </CartProvider>
  )
}
