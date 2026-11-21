import "./style.css";

export const metadata = {
  title: { default: "lewis.md", template: "%s · lewis.md" },
  description: "Personal pages written in Markdown.",
};

export default function Layout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
