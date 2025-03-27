import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-3">WedJoy</h3>
            <p className="text-gray-400 text-sm">
              Discover, create, and manage events effortlessly. Join us in shaping the next generation of event experiences.
            </p>
            <div className="flex space-x-3 mt-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition"
                >
                  <span className="text-sm uppercase font-semibold">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              {['Home', 'Events', 'Categories', 'Pricing', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers */}
          <div>
            <h4 className="text-lg font-semibold mb-3">For Organizers</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              {['Create Event', 'Pricing Plans', 'Resources', 'Blog', 'Success Stories', 'Help Center'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Refund Policy', 'Accessibility'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} WedJoy. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            {['Terms', 'Privacy', 'Cookies'].map((policy) => (
              <a key={policy} href={`#${policy.toLowerCase()}`} className="hover:text-white transition">
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
