export const postMarkReducer = (initialState, action) => {
    switch (action.type) {
      case "Add Mark":
        return [...initialState, action.payload];
  
      case "Del Mark":
        // Retornarà un nou array amb tots els elements menys el de l'id
        return initialState.filter((mark) => mark.id !== action.payload);

      default:
        return [...initialState];
    }
};