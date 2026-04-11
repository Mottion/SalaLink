import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link } from "react-router";
import SvgComponent from "@/components/logo";
import { Controller } from "@/components/controller";
import { Input } from "@/components/input";
import { useState } from "react";
  
const schema = z.object({
  email: z.email({ message: "Email inválido" }).min(2, { message: "O email deve ter no mínimo 2 caracteres" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const LoginIndex: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-primary flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-2">
            <SvgComponent className="w-7 h-7" />
            <span className="text-2xl font-semibold tracking-tight text-white">
              Sala<span className="text-brand-primary-light">Link</span>
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Gerencie seus espaços de trabalho com simplicidade.
          </h1>
          <p className="text-white/70 text-lg max-w-md">
            Controle reservas, salas e coworking em uma plataforma intuitiva e completa.
          </p>
        </div>
        <p className="text-white/40 text-sm">
          © 2026 SalaLink. Todos os direitos reservados.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex justify-center">
            <div className="flex items-center gap-2">
              <SvgComponent className="w-7 h-7" />
              <span className="text-2xl font-semibold tracking-tight">
                Sala<span className="text-brand-primary-light">Link</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Bem-vindo de volta</h2>
            <p className="text-text-primary-light">Entre com suas credenciais para acessar o sistema.</p>
          </div>
          <FormProvider {...form}>
            <div className="mb-0 space-y-2">
              <Controller form={form} name="email" label="Email" render={({ field }) => (
                <Input {...field} placeholder="seu@gmail.com" />
              )}/>
              <Controller 
                form={form} 
                name="password" 
                label="Senha" 
                oppositeLabelComponent={
                  <Link to="/forgot-password" className="text-brand-primary-light font-normal hover:text-brand-primary-light/80 hover:underline text-sm">Esqueceu sua senha?</Link>
                } 
                render={({ field }) => (
                  <Input {...field} placeholder="********" type={passwordVisible ? "text" : "password"} iconRight={
                    passwordVisible ? 
                      <IconEye className="h-6 w-6 cursor-pointer" onClick={togglePasswordVisibility} /> :
                      <IconEyeOff className="h-6 w-6 cursor-pointer" onClick={togglePasswordVisibility} />
                  } />
                )}
              />
            </div>
          </FormProvider>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/signup" className="font-medium text-brand-primary-light hover:text-brand-primary-light/80 transition-colors hover:underline" >
              Criar conta
            </Link> 
          </p>
        </div>
      </div>
    </div>
  )
}