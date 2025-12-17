"use client";

export default function MobileHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
      {/* Ambient background blobs for mobile */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
}
