import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Mail, MapPin, Check } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import { Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FloatingField = ({
  id,
  label,
  type = "text",
  maxLength,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  maxLength?: number;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative border-b border-border/40 focus-within:border-primary/60 transition-colors duration-300 pt-6 pb-2">
    <input
      id={id}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="peer w-full bg-transparent text-foreground text-lg focus:outline-none placeholder-transparent"
    />
    <label
      htmlFor={id}
      className="
        absolute left-0 top-6 text-muted-foreground text-lg pointer-events-none
        transition-all duration-200 ease-out
        peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.22em] peer-focus:uppercase peer-focus:text-primary/80
        peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:tracking-[0.22em] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:text-muted-foreground
      "
    >
      {label}
    </label>
  </div>
);

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:betseessilfie@gmail.com?subject=${subject}&body=${body}`);
      toast.info("Your email client has been opened. Please send the email to complete your message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        toast.success("Message sent! I'll get back to you soon.");
        setTimeout(() => setIsSubmitted(false), 3500);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error — please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <Parallax offset={120} className="absolute -top-32 -right-40 w-[520px] h-[520px]">
        <div className="gradient-orb w-full h-full opacity-35" />
      </Parallax>
      <Parallax offset={-80} className="absolute -bottom-32 -left-40 w-[480px] h-[480px]">
        <div className="gradient-orb w-full h-full opacity-25" />
      </Parallax>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
              ( Contact )
            </p>
          </Reveal>
          <RevealText as="h2" text="LET'S" splitBy="letter" className="mega-headline" />
          <RevealText as="h2" text="GET IN" splitBy="letter" delay={0.15} className="mega-headline" />
          <RevealText as="h2" text="TOUCH." splitBy="letter" delay={0.3} className="mega-headline gradient-text" />

          <Reveal delay={0.5} className="mt-10 space-y-4">
            <a
              href="mailto:betseessilfie@gmail.com"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <Mail size={18} className="text-primary" />
              <span className="text-base md:text-lg group-hover:underline">betseessilfie@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={18} className="text-primary" />
              <span className="text-base md:text-lg">Edmonton, Alberta, Canada &nbsp;| &nbsp; <a href="tel:+15879863055" className="hover:text-primary transition-colors">587-986-3055</a></span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FloatingField
              id="name"
              label="Your Name"
              maxLength={100}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <FloatingField
              id="email"
              label="Your Email"
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />

            {/* Message textarea — floating label */}
            <div className="relative border-b border-border/40 focus-within:border-primary/60 transition-colors duration-300 pt-6 pb-2">
              <textarea
                id="message"
                rows={3}
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=" "
                className="peer w-full bg-transparent text-foreground text-lg focus:outline-none resize-none placeholder-transparent"
              />
              <label
                htmlFor="message"
                className="
                  absolute left-0 top-6 text-muted-foreground text-lg pointer-events-none
                  transition-all duration-200 ease-out
                  peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.22em] peer-focus:uppercase peer-focus:text-primary/80
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:tracking-[0.22em] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:text-muted-foreground
                "
              >
                Your Message
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="gradient-pill mt-4 disabled:opacity-80 disabled:cursor-default min-w-[160px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitted ? (
                  <motion.span
                    key="sent"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} strokeWidth={3} /> Sent!
                  </motion.span>
                ) : isSubmitting ? (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Sending…
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
