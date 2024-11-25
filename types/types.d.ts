


declare global {

    type Room = {
        $id: string; // ID único da sala
        user_id: string; // ID do usuário associado
        name: string; // Nome da sala
        description: string; // Descrição da sala
        sqft: number; // Tamanho em pés quadrados
        capacity: number; // Capacidade de pessoas
        location: string; // Localização (ex. andar e prédio)
        address: string; // Endereço completo
        amenities: string; // Lista de comodidades (como uma string)
        availability: string; // Horário de disponibilidade
        price_per_hour: number; // Preço por hora
        image: string; // Caminho ou URL da imagem da sala
      };
      
      type User = {
        id: string; // ID do usuário
        name: string; // Nome do usuário
        email: string; // Email do usuário
      }

      type Booking = {
        $id: string,
        room_id: Room,
        user_id: string,
        check_in: string,
        check_out: string
      }
}

export {}