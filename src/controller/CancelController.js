import supabase from '../supabase'; // Cliente do Supabase

const deleteCorte = async (id) => {
    // Tenta excluir o corte
    const { data, error, count } = await supabase
        .from('cortes')
        .delete()
        .eq('id', id)
        .select(); // Adicionando select para forçar o retorno dos dados excluídos

    // Verificar se houve erro
    if (error) {
        console.error('Erro ao excluir corte:', error.message);
        return null; // Retorna null em caso de erro
    }

    console.log('Dados excluídos:', data); // Log para ver se os dados foram excluídos

    // Verificar se algum corte foi excluído
    if (data && data.length > 0) {
        console.log('Corte excluído com sucesso');
    } else {
        console.log('Nenhum corte encontrado para excluir');
    }

    // Retorna uma confirmação de que o corte foi excluído
    return data && data.length > 0;
};

// Exportando a função
export { deleteCorte };
