import { Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/Navbar";

const quickLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Applications", href: "#applications" },
  { label: "Technology", href: "#technology" },
  { label: "Traction", href: "#traction" },
  { label: "About Us", href: "#about" },
];

const resources = ["Privacy Policy", "Terms of Service", "Clinical Evidence", "Investor Relations"];

const resourceHrefs = { "Privacy Policy": "#top", "Terms of Service": "#top", "Clinical Evidence": "#top", "Investor Relations": "/admin" };

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="relative border-t border-slate-800/70 bg-[#04060f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px neon-line" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo testid="footer-logo" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              Evidence-backed XR digital therapeutics and immersive spatial learning environments.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-linkedin"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/70 text-slate-400 transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,242,254,0.25)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
          </div>
          <div>
            <h4 className="font-mono-gu text-xs uppercase tracking-[0.2em] text-slate-400">Navigate</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-500 transition-colors duration-300 hover:text-cyan-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-gu text-xs uppercase tracking-[0.2em] text-slate-400">Resources</h4>
            <ul className="mt-5 space-y-3">
              {resources.map((r) => (
                <li key={r}>
                  <a href={resourceHrefs[r]} className="text-sm text-slate-500 transition-colors duration-300 hover:text-cyan-300">
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-gu text-xs uppercase tracking-[0.2em] text-slate-400">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-cyan-400" />
                <a href="mailto:gopal@guniversehealthcare.com" className="transition-colors hover:text-cyan-300">
                  gopal@guniversehealthcare.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-cyan-400" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">© 2026 GUniverse Inc. All rights reserved.</p>
          <p className="font-mono-gu text-xs text-slate-600">Pioneering Spatial Digital Therapeutics</p>
          <a href="/admin" data-testid="footer-admin-link" className="text-xs text-slate-700 transition-colors duration-300 hover:text-cyan-300">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
