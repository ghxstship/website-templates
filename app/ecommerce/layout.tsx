import type { Metadata } from "next";
import { CartProvider } from "@/components/ecommerce/CartContext";
import { EcommerceHeader } from "@/components/ecommerce/EcommerceHeader";
import { CartOverlays } from "@/components/ecommerce/CartOverlays";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { ECOM } from "@/lib/ecommerce";

export const metadata: Metadata = {
  title: { default: `${ECOM.name} — Store`, template: `%s — ${ECOM.name}` },
  description: ECOM.heroSub,
};

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <CartProvider>
        <EcommerceHeader brand={ECOM.name} />
        <main>{children}</main>
        <SiteFooter
          brand={ECOM.name}
          tagline={ECOM.heroSub}
          columns={[
            { title: "Shop", links: [
              { label: "All products", href: "/ecommerce/shop" },
              { label: "Apparel", href: "/ecommerce/shop?category=Apparel" },
              { label: "Footwear", href: "/ecommerce/shop?category=Footwear" },
              { label: "Home", href: "/ecommerce/shop?category=Home" },
            ] },
            { title: "Help", links: [
              { label: "Shipping", href: "/ecommerce/account" },
              { label: "Returns", href: "/ecommerce/account" },
              { label: "Size guide", href: "/ecommerce/shop" },
              { label: "Contact", href: "/ecommerce/account" },
            ] },
            { title: "Company", links: [
              { label: "About", href: "/ecommerce" },
              { label: "Sustainability", href: "/ecommerce" },
              { label: "Stores", href: "/ecommerce" },
              { label: "Careers", href: "/career" },
            ] },
          ]}
        />
        <CartOverlays />
      </CartProvider>
    </div>
  );
}
