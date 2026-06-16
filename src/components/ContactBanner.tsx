import { ContactCtaButton } from "@/components/ContactCtaButton";

export function ContactBanner() {
  return (
    <section
      className="contact-banner fade-up relative z-10 mt-24"
      style={{ "--stagger": 7 } as React.CSSProperties}
      aria-label="Contact"
    >
      <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-32">
        <h2 className="max-w-xl font-serif text-4xl leading-[1.12] text-ink sm:text-6xl">
          Faisons quelque chose de bien,{" "}
          <em className="italic text-pink">ensemble</em>.
        </h2>
        <ContactCtaButton />
      </div>
    </section>
  );
}
