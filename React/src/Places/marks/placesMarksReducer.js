const placesMarksReducer = (initialState, action) => {
    switch (action.type) {

        case "Add Mark":

            console.log("Mark place" + action.payload)

            return [...initialState, action.payload]

        case "Del Mark":

            console.log("Delete mark" + action.payload)

            return initialState.filter((mark) => mark.id !== action.payload)

        default:

            return [...initialState]

    }
}

export default placesMarksReducer