import { create } from "zustand";

type useToastType = {
  mensagem: string;
  tipo: "sucesso" | "erro" | null;
  isOpen: boolean;
  addToast: (mensagem: string, tipo: "sucesso" | "erro") => void;
  closeToast: () => void;
};

const useToastStore = create<useToastType>((set) => ({
  mensagem: "",
  tipo: null,
  isOpen: false,
  addToast: (mensagem: string, tipo: "sucesso" | "erro") => {
    set({ isOpen: true, mensagem, tipo });
    setTimeout(() => {
      set({ isOpen: false });
    }, 3000);
  },
  closeToast: () => set({ isOpen: false }),
}));

export default useToastStore;