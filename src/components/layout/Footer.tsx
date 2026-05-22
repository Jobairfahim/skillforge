import Link from 'next/link';
import { Zap, Share2, GitBranch, Rss, Play, ArrowRight } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Browse Courses', href: '/courses' },
    { label: 'Become an Instructor', href: '/instructor/apply' },
    { label: 'Corporate Training', href: '/enterprise' },
    { label: 'SkillForge for Teams', href: '/teams' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Community', href: '/community' },
    { label: 'Help Center', href: '/help' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partnerships', href: '/partners' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter */}
        <div className="py-12 border-b border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">Get weekly updates on new courses, tutorials & tech trends.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
              />
              <button className="px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap">
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold">Skill<span className="gradient-text">Forge</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The platform where ambition meets expertise. Learn from the best, build the future.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, href: '#' },
                { icon: GitBranch, href: '#' },
                { icon: Rss, href: '#' },
                { icon: Play, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillForge, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-red-500 mx-1">♥</span>
            <span>for learners worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
