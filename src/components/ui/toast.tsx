import { Toaster as SonnerToaster, toast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-card border border-border text-foreground shadow-soft-lg rounded-md font-sans",
          title: "text-foreground font-medium",
          description: "text-muted-foreground",
          actionButton: "bg-cta text-cta-foreground rounded-md",
          cancelButton: "bg-secondary text-secondary-foreground rounded-md",
        },
      }}
    />
  );
}

export { toast };
