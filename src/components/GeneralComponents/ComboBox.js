function ComboBox({ valores, selectedValue, setSelectedValue }) {
  const handleChange = (event) => {
    console.log("Selected value:", event.target.value); // Verificar o valor selecionado
    setSelectedValue(event.target.value);
  };

  return (
    <div className="input-group">
      <label htmlFor="combo">Escolha uma opção:</label>
      <select id="combo" value={selectedValue} onChange={handleChange}>
        {/* Option de placeholder */}
        <option value="" disabled>Escolha uma opção</option>
        
        {valores.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComboBox;
