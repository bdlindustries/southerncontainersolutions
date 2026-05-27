"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Truck, Phone, PackageOpen, Menu, X, Lock, ArrowRight, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const primaryLinks = [
    { path: '/shop', label: 'Finished Offices' },
    { path: '/raw', label: 'Raw Containers' },
    { path: '/rentals', label: 'Rentals' },
    { path: '/custom-builds', label: 'Custom Builds' },
  ];

  const secondaryLinks = [
    { path: '/delivery', label: 'Delivery' },
    { path: '/about', label: 'About' },
    { path: '/resources', label: 'Resources' },
  ];

  return (
    <>
      <div className="bg-slate-950 text-slate-300 py-2 px-4 md:px-8 text-xs font-medium justify-between items-center hidden lg:flex">
        <div className="flex space-x-6">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-amber-500" /> Covington, Louisiana</span>
          <span className="flex items-center"><Truck className="w-3 h-3 mr-1 text-amber-500" /> Nationwide Delivery</span>
        </div>
        <div className="flex space-x-6">
          <a href="tel:985-250-0708" className="hover:text-white transition-colors flex items-center">
            <Phone className="w-3 h-3 mr-1" /> (985) 250-0708
          </a>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 bg-slate-950 rounded flex items-center justify-center shadow-md">
              <PackageOpen className="w-7 h-7 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-950 leading-none block">SOUTHERN</span>
              <span className="text-[10px] md:text-xs font-bold text-amber-600 tracking-[0.2em] uppercase leading-none mt-1">Container Solutions</span>
            </div>
          </Link>

          <div className="hidden lg:flex space-x-6 items-center font-bold text-sm text-slate-500">
            {primaryLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors pb-1 border-b-2 ${pathname === link.path ? 'text-slate-950 border-amber-500' : 'border-transparent hover:text-slate-950'}`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Desktop Dropdown for Secondary Links */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-slate-950 transition-colors pb-1 border-b-2 border-transparent">
                More <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                {secondaryLinks.map(link => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="px-4 py-2 hover:bg-slate-50 text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-bold text-sm px-2 py-2 rounded transition-colors"
              title="Edit listings and view leads"
            >
              <Lock className="w-4 h-4" />
              Admin
            </Link>
            <Link
              href="/shop"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded font-black text-sm transition-all shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5"
            >
              Buy Online
            </Link>
          </div>

          <button className="lg:hidden text-slate-950 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-2xl absolute w-full z-40">
            {primaryLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-widest">More</div>
            {secondaryLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left font-bold text-slate-700 py-2 border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 w-full font-bold text-slate-600 py-3 border-b border-slate-100"
            >
              <Lock className="w-4 h-4" /> Admin (listings &amp; leads)
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-amber-500 text-slate-950 px-6 py-4 rounded font-black text-base mt-6 flex justify-center items-center"
            >
              Buy Online <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
