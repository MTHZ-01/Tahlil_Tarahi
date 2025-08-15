const initialState = {
    logo: null,
    navMenoOpen: false,
    navMenoExtended: false,
    EventData: null,
    divisionData: null,
    sliderData: null,
    searchResults: null,


    divDataWithImg: null,
    subDivData: null,

    EventRegistrationStages: {
        decisionToBuy: true,
        chooseSizes: false
    },

    shoppingCartStages: {
        confirm: true,
        chooseAddress: false,
        presonalInformation: false

    },



    buyBasket: {
        totalPrice: 0,
        prodData: [], // Ensure this array is initialized
    
    },

    

    searchPlaceOpen: false,
    searchPlaces: [],


    buyFormData: null,



    personalBuyerInfo: {

        firstName: null,
        lastName: null,
        PhoneNumber: null,
    },


    navBarSmallView: false,

    cityData: null,


    isLoggedIn: false,





    isAuthOpen: false,
    authData: null,


    reduxualMessageBarOpen: false,
    reduxualMessageBar1: null,
    reduxualMessageBar2: null,
    severity: "success",



    // Main menu's first item data:
    firstItemPic: null,
    firstItemDivision: null,
    firstItemSubDivision: null,
    firstItemProd: null,
    // Main menu's second items data:
    secondImageData: null,

    // Main menu's second items data:
    thirdImageData: null,


    searchMenuOpen: false,


    //LuxAlert:
    luxOpen: false,
    luxTitle: null,
    luxContent: null,
    luxSeverity: null,


    articleData: null
}

export default initialState
