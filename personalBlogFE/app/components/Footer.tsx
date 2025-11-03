export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
        <p>
          © <span suppressHydrationWarning>{currentYear}</span> Personal Blog
        </p>
        <p className="opacity-80">Built with React Router & Vite</p>
      </div>
    </footer>
  );
}


