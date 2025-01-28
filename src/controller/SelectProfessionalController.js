import supabase from '../supabase'; // O cliente do Supabase configurado

const getProfessional = async (id) => {
  const { data: barbeiros, error } = await supabase
    .from('barbeiros')
    .select('*')
    .eq('barbearia_id', id);

  if (error) {
    console.error('Erro ao obter barbeiros:', error.message);
    return []; // Retornar um array vazio em caso de erro
  }

  // Retornar todos os barbeiros encontrados
  return barbeiros || []; // Garante que sempre será retornado um array
};

// Exportando como named exports
export { getProfessional };
