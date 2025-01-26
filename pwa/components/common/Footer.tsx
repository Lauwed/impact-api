const Footer = () => {
  return (
    <footer className="border-t border-black p-8">
      <p className="text-sm">
        Initiative by <a href="https://lauradurieux.dev">DevGirl_</a> and "Les codes
        potes" - {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
