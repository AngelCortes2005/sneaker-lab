"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, Heart, LogOut, Settings, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useFavoritesStore } from "@/lib/store/favorites-store";
import { useUserStore } from "@/lib/store/user-store";
import SearchBar from "@/components/SearchBar";
import AuthDialog from "@/components/AuthDialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const itemCount = useCartStore((state) => state.getItemCount());
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const removeItem = useCartStore((state) => state.removeItem);
  const favoriteCount = useFavoritesStore((state) => state.favorites.length);
  const { user, isAuthenticated, logout } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada', {
      description: 'Has cerrado sesión correctamente',
    });
  };

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Categorías", href: "/categorias" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/10`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-4xl"
              >
                <div className="relative bg-gradient-to-r from-blue-600 to-[#7df9ff] rounded-lg p-2">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                SneakerLab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <SearchBar />

              <Link href="/favoritos">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-cyan-400 hidden md:flex relative"
                >
                  <Heart className="w-5 h-5" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-cyan-400 hidden md:flex relative"
                    >
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-black/95 backdrop-blur-xl border-white/10 text-white"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                      <Link href="/pedidos" className="flex items-center w-full">
                        <Package className="w-4 h-4 mr-2" />
                        Mis Pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                      <Settings className="w-4 h-4 mr-2" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="cursor-pointer hover:bg-red-500/10 text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAuthDialog(true)}
                  className="text-white hover:text-cyan-400 hidden md:flex"
                >
                  <User className="w-5 h-5" />
                </Button>
              )}

              {/* Cart */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-cyan-400 relative"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white w-full sm:max-w-lg p-4">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-white">
                      Carrito de Compras
                    </SheetTitle>
                    <SheetDescription className="text-gray-400">
                      {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-8 space-y-4 max-h-[60vh] overflow-y-auto">
                    {items.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400">Tu carrito está vacío</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              width={80} 
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {item.brand}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-cyan-400">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400">
                                Cantidad: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {items.length > 0 && (
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between text-lg font-bold border-t border-white/10 pt-4">
                        <span>Total:</span>
                        <span className="text-cyan-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <Link href="/checkout" className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform">
                          Proceder al Pago
                        </Button>
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <Link href="/favoritos">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white relative"
                    >
                      <Heart className="w-5 h-5" />
                      {favoriteCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {favoriteCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowAuthDialog(true)}
                      className="text-white"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Dialog */}
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
