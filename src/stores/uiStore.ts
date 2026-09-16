import { create } from 'zustand';

// Define os possíveis modais que podem ser abertos
type ModalType = 'novaEntrada' | 'novaSaida' | null;

interface UiState {
  openModal: ModalType;
  showModal: (modal: ModalType) => void;
  hideModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  openModal: null,
  showModal: (modal) => set({ openModal: modal }),
  hideModal: () => set({ openModal: null }),
}));