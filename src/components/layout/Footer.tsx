import Link from "next/link";
import { Mail } from "lucide-react";

const productLinks = [
  { label: "Smart Home", href: "/products" },
  { label: "Garden Tech", href: "/products" },
  { label: "Kitchen Automation", href: "/products" },
  { label: "IoT Devices", href: "/products" },
];

const companyLinks = [
  { label: "About Us", href: "/#services" },
  { label: "Our Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
  { label: "Careers", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Warranty", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0a0a0a] pt-0 transition-colors">
      {/* Teal divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
                Neuraforge.
              </span>
            </Link>
            <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
              We bring cutting-edge automation and smart technology to your home
              and industry. Engineering precision into every product and service
              we deliver.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3">
                Stay updated
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (
                    e.currentTarget.elements.namedItem(
                      "email",
                    ) as HTMLInputElement
                  )?.value;
                  if (email)
                    window.location.href = `mailto:hello@neuraforge.com?subject=Newsletter+Signup&body=Please+add+${encodeURIComponent(email)}+to+the+newsletter.`;
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
                />
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-semibold hidden sm:inline">
                    Subscribe
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social + bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-teal-500 hover:border-teal-500/30 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-teal-500 hover:border-teal-500/30 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-teal-500 hover:border-teal-500/30 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-gray-400 dark:text-zinc-600">
              <p>
                &copy; {new Date().getFullYear()} neuraforge. All rights
                reserved.
              </p>
              <span className="hidden sm:inline">·</span>
              <p className="italic text-gray-500 dark:text-zinc-500">
                Built for precision. Engineered for results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
