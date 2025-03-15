import supabase from '../supabase';

const CreateExceptionFunction = async (excecao) => {

  const excecaoData = excecao.toDatabaseObject();

  const { data, error } = await supabase
    .from("excecoes_disponibilidade")
    .insert([excecaoData])
    .select()
    .single();

  if (error) {
    console.log(`Erro ao inserir Excecao: ${error.message}`);
    return false;
  }

  return data ? true : false;
}

const ListExceptionsFunction = async (id) => {
  const { data, error } = await supabase
    .from("excecoes_disponibilidade") // Primeiro especifica a tabela
    .select("*") // Em seguida, seleciona as colunas
    .eq("barbeiro_id", id); // Aplica o filtro

  if (error) {
    console.log(`Erro ao listar Exceções: ${error.message}`);
    return null;
  }

  return data; // Retorna os dados (um array com os resultados)
};

const DeleteExceptionFunction = async (id_exceção) => {
  const {error} = await supabase
    .from("excecoes_disponibilidade")
    .delete()
    .eq("id", id_exceção);

    if (error) {
      console.log(`Erro ao excluir Exceções: ${error.message}`);
      return null;
    }
  
    return true; 
}


export { CreateExceptionFunction, ListExceptionsFunction, DeleteExceptionFunction };