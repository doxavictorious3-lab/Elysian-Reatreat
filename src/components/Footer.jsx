
import { Link } from "react-router-dom";

const navigation = [
  { name: "Rooms", path: "/rooms" },
  { name: "Dining", path: "/dining" },
  { name: "Experiences", path: "/experiences" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-[#173D32] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-serif text-2xl tracking-wide text-[#E8D7B5]"
            >
              Elysian Retreat
            </Link>

            <p className="mt-3 text-sm italic text-[#D8C8A9]">
              Where Nature Meets Refined Living.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
              Discover a sanctuary of comfort, exceptional
              hospitality, and memorable experiences.
              Your escape from the ordinary begins here.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold text-[#E8D7B5]">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-[#E8D7B5]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-[#E8D7B5]">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a
                  href="tel:+254743750574"
                  className="hover:text-[#E8D7B5]"
                >
                  +254 743 750 574
                </a>
              </li>

              <li>
                <a
                  href="mailto:doxavictorious3@gmail.com"
                  className="break-words hover:text-[#E8D7B5]"
                >
                  doxavictorious3@gmail.com
                </a>
              </li>

              <li className="leading-6">
                64th Street, Kimbo–Ruiru, Kenya
              </li>
            </ul>
          </div>

          {/* Guest experience */}
          <div>
            <h3 className="mb-5 font-semibold text-[#E8D7B5]">
              Your Next Escape
            </h3>

            <p className="text-sm leading-7 text-gray-300">
              Whether you are planning a relaxing stay,
              a memorable dinner, or a special celebration,
              we look forward to welcoming you.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-block border border-[#D8C8A9] px-5 py-3 text-sm text-[#E8D7B5] transition hover:bg-[#D8C8A9] hover:text-[#173D32]"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>

        {/* Legal and copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Elysian Retreat.
            All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <p>Crafted with care in Kenya.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
