export function LogoImage() {
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-4 border-b border-gray-200">
      {/* Logo */}
      <img
        src="/logo.jpg"
        alt="Company Logo"
        className="w-15 h-15 object-contain"
      />

      {/* Company name */}
      <div className="leading-tight">
        <h1 className="text-lg font-semibold tracking-wide text-gray-900">
          FinEdge
        </h1>
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          Loans & Finance
        </p>
      </div>
    </div>
  );
}
