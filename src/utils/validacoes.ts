export function validarCPF(cpf:string | undefined) {

  if(!cpf) return

  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; // evita 00000000000 etc

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

export const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validarTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/