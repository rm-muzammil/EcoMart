import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">EcoMart</h2>
            <p className="text-sm text-gray-600">
              Your eco-friendly store for sustainable living. Shop smarter, live
              greener.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-600">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-600">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EcoMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
