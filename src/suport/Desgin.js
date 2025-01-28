import supabase from '../supabase'; // O cliente do Supabase configurado

const getBarbearia = async (id) => {
  const { data: barbearias, error } = await supabase
    .from('barbearias')
    .select('*')
    .eq('id', id);

  if (error) {
    console.error('Erro ao obter cores:', error.message);
    return null;
  }

  // Retornar o primeiro objeto diretamente
  return barbearias && barbearias.length > 0 ? barbearias[0] : null;
};

const getImageUrl = (filePath, storage) => {
  const { data, error } = supabase.storage
    .from(storage)  // Bucket "logos"
    .getPublicUrl(filePath);  // Caminho do arquivo, sem o nome "logos" duas vezes

  if (error) {
    console.error('Erro ao obter URL:', error.message);
    return null;
  }
  return data.publicUrl;
};

const saveColors = (primaryColor, secondaryColor) => {
  localStorage.setItem('cor-primaria', primaryColor);
  localStorage.setItem('cor-secundaria', secondaryColor);
};


const restoreColors = () => {
  const primaryColor = localStorage.getItem('cor-primaria');
  const secondaryColor = localStorage.getItem('cor-secundaria');

  if (primaryColor && secondaryColor) {
    document.documentElement.style.setProperty('--cor-primaria', primaryColor);
    document.documentElement.style.setProperty('--cor-secundaria', secondaryColor);
  }
};

  // Exportando como named exports
  export { getBarbearia, getImageUrl, restoreColors, saveColors };
