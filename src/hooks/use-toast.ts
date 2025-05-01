import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (props: Parameters<typeof sonnerToast>[0]) => sonnerToast(props),
  };
}
