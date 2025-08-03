export const links: {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
  },

  { label: "Contact", href: "/contact" },
  {
    label: "Blog",
    href: "/blog",
    submenu: [
      { label: "Latest Posts", href: "/blog/latest" },
      { label: "Categories", href: "/blog/categories" },
    ],
  },
];
