export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg dark:text-white">OpenRouter</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">© 2026 OpenRouter, Inc</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Product</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Chat</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Rankings</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Models</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Providers</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Enterprise</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Company</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">About</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Announcements</li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-white cursor-pointer">
                Careers
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded">
                  Hiring
                </span>
              </li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Support</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">State of AI</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Works With OR</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Developer</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">API Reference</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">SDK</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Status</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Connect</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Discord</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">GitHub</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">LinkedIn</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">X</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">YouTube</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
