class ExcecaoDisponibilidade {
    constructor(id, barbeiroId, data, horaInicio, horaFim, tipo, descricao) {
        this.id = id || null; // ID pode ser nulo, pois é gerado automaticamente pelo banco
        this.barbeiroId = barbeiroId;
        this.data = data; // Espera-se que venha no formato 'YYYY-MM-DD'
        this.horaInicio = horaInicio || null; // Pode ser null se não houver horário definido
        this.horaFim = horaFim || null; // Pode ser null se não houver horário definido
        this.tipo = tipo; // "folga", "ajuste", "feriado"
        this.descricao = descricao || null; // Pode ser null
    }

    // Método para converter a instância para um objeto compatível com o banco
    toDatabaseObject() {
        return {
            barbeiro_id: this.barbeiroId,
            data: this.data,
            hora_inicio: this.horaInicio,
            hora_fim: this.horaFim,
            tipo: this.tipo,
            descricao: this.descricao
        };
    }

    // Método estático para criar um objeto ExcecaoDisponibilidade a partir de um banco de dados
    static fromDatabaseObject(dbObject) {
        return new ExcecaoDisponibilidade(
            dbObject.id,
            dbObject.barbeiro_id,
            dbObject.data,
            dbObject.hora_inicio,
            dbObject.hora_fim,
            dbObject.tipo,
            dbObject.descricao
        );
    }
}

export default ExcecaoDisponibilidade;
