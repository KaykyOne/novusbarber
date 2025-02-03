import supabase from '../supabase'; // O cliente do Supabase configurado

const getServices = async (id_barbeiro) => {
  const { data: servicos, error } = await supabase
    .from('servicos')
    .select('*')
    .eq('barbeiro_id', id_barbeiro); // Corrigido para buscar os serviços do barbeiro

  if (error) {
    console.error('Erro ao obter serviços:', error.message);
    return []; // Retornar um array vazio em caso de erro
  }

  return servicos || []; // Retorna um array vazio se `servicos` for null
};

// Exportando como named exports
export { getServices };
