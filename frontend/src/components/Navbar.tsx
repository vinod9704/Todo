import { CheckSquare, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="glass-card border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-xl blur-lg opacity-50 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-primary to-primary-glow p-3 rounded-xl shadow-lg">
                <CheckSquare className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Organize your life, one task at a time
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by AI
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
