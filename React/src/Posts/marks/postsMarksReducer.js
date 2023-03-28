const postsMarksReducer = (initialState,action) => {
  switch (action.type) {

    case "Add Mark":
      
        console.log("Mark post" + action.payload )

        return [ ...initialState, action.payload]

    case "Del Mark":
      
        console.log("Delete mark" + action.payload )
      
        return initialState.filter( (mark) => mark.id !== action.payload)
              
    default:
      
    return [...initialState]
      
  }
}

export default postsMarksReducer