import supabase from '../supabase'; // O cliente do Supabase configurado

// Listar serviços por barbeiro
const getServices = async (barbeiroId) => {
  const { data: servicos, error } = await supabase
    .from('servicos')
    .select('*')
    .eq('barbeiro_id', barbeiroId);

  if (error) {
    console.error('Erro ao obter serviços:', error.message);
    return [];
  }

  return servicos || [];
};

// Editar serviço
const updateService = async (servico) => {
  const servicoData = servico.toDatabaseObject();
  const { data, error } = await supabase
    .from('servicos')
    .update([servicoData])
    .eq('id', servico.id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar serviço:', error.message);
    return null;
  }

  return data;
};

// Inserir um novo serviço
const insertService = async (servico) => {
  const servicoData = servico.toDatabaseObject();
  const { data, error } = await supabase
    .from('servicos')
    .insert([servicoData])
    .select()
    .single();

  if (error) {
    console.error('Erro ao inserir serviço:', error.message);
    return null;
  }

  return data;
};


// Excluir serviço
const deleteService = async (id) => {
  const { error } = await supabase
    .from('servicos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao excluir serviço:', error.message);
    return false;
  }

  return true;
};

// Exportando as funções
export { getServices, updateService, deleteService, insertService };
