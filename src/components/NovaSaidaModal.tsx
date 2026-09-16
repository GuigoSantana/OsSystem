import { FormEvent, useState } from 'react';import { useUiStore } from '../stores/uiStore';
import useAuthStore from '../stores/useAuthStore';
import api from '../services/api';
import { Modal } from './Modal';

export function NovaSaidaModal() {
  const { hideModal } = useUiStore();
  const { usuarioId: user} = useAuthStore(); // Precisamos do ID do usuário logado

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  async function handleCriarSaida(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome || !preco || !user){
      // Adicionar feedback para o usuário aqui
      return;
    }

    await api.post('/saidas', {
      nome,
      preco: parseFloat(preco),
      usuarioId: user,
    });

    // TODO: Adicionar lógica para atualizar o dashboard, por exemplo, refazendo a busca de dados.

    hideModal();
  }

  return (
    <Modal title="Registrar Nova Saída" onClose={hideModal}>
      <form onSubmit={handleCriarSaida} className="space-y-3">
        <input name="nome" placeholder="Descrição da saída" onChange={e => setNome(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 h-14 w-full text-sm placeholder-zinc-400" />
        <input type="number" name="preco" placeholder="Valor (R$)" onChange={e => setPreco(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 h-14 w-full text-sm placeholder-zinc-400" />
        <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium hover:bg-lime-400 w-full justify-center">
          Salvar Saída
        </button>
      </form>
    </Modal>
  );
}