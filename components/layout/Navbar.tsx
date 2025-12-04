'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElectricBorder from "../ElectricBorder";
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu, Zap, Home, Palette, Image, DollarSign, Mail } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', href: '#' },
    { name: 'Diseñador 3D', href: '#designer'},
    { name: 'Galería', href: '#gallery'},
    { name: 'Precios', href: '#pricing'},
    { name: 'Contacto', href: '#contact'},
  ];

  return (
    <nav className=" bg-black/50 backdrop-blur-lg fixed w-full z-30 top-0 left-0 border-b border-white/10">
      <div className="">
        <div className="relative overflow-hidden">
          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.3}
            thickness={2}
          >
            <div className="">
              <div className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#7df9ff] blur-md opacity-50"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-[#7df9ff] rounded-lg p-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-xl font-black">
                    Sneaker Lab
                  </span>
                </motion.div>

                {/* Desktop Navigation Menu */}
                <div className="hidden md:block">
                  <NavigationMenu>
                    <NavigationMenuList>
                      {menuItems.map((item, index) => (
                        <NavigationMenuItem key={item.name}>
                          <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 text-white"
                              >
                                {item.name}
                              </motion.div>
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    className="relative bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold hover:scale-105 transition-transform"
                  >
                    Comenzar
                  </Button>
                </div>

                {/* Mobile Menu Sheet */}
                <div className="md:hidden">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-white hover:bg-white/10"
                      >
                        <Menu className="w-6 h-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent 
                      side="right" 
                      className="bg-black/95 backdrop-blur-xl border-white/10 text-white"
                    >
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 text-white">
                          <div className="bg-gradient-to-r from-blue-600 to-[#7df9ff] rounded-lg p-2">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          Sneaker Lab
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col gap-4 mt-8">
                        {menuItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link href={item.href}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                          <Button 
                            variant="ghost" 
                            className="w-full text-white hover:bg-white/10"
                          >
                            Iniciar Sesión
                          </Button>
                          <Button 
                            className="w-full bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold"
                          >
                            Comenzar
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;