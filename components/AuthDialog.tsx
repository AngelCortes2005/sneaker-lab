'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useUserStore } from '@/lib/store/user-store';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthMode = 'login' | 'register';

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, register } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;

      if (mode === 'login') {
        success = await login(formData.email, formData.password);
        if (success) {
          toast.success('¡Bienvenido de nuevo!', {
            description: 'Has iniciado sesión correctamente',
          });
          onOpenChange(false);
          setFormData({ name: '', email: '', password: '' });
        } else {
          toast.error('Error al iniciar sesión', {
            description: 'Verifica tus credenciales e intenta de nuevo',
          });
        }
      } else {
        success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast.success('¡Cuenta creada!', {
            description: 'Tu cuenta ha sido creada exitosamente',
          });
          onOpenChange(false);
          setFormData({ name: '', email: '', password: '' });
        } else {
          toast.error('Error al crear cuenta', {
            description: 'Por favor verifica los datos e intenta de nuevo',
          });
        }
      }
    } catch (error) {
      toast.error('Error', {
        description: 'Algo salió mal, intenta de nuevo',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === 'login'
              ? 'Ingresa tus credenciales para continuar'
              : 'Completa los datos para crear tu cuenta'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={mode === 'register'}
                    disabled={isLoading}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
              className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? 'Cargando...'
              : mode === 'login'
              ? 'Iniciar Sesión'
              : 'Crear Cuenta'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">O</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={toggleMode}
            className="w-full border-white/10 text-white bg-white/5 hover:scale-105 transition-transform"
          >
            {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}