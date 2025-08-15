import initialState from "./StateArchitecture"
let Lastid = 0

export default function reducer(state = initialState, action) {
    const cloneState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "Logo":
            cloneState.logo = action.content
            return cloneState

        case "NavMenu":
            cloneState.navMenoOpen = action.content
            return cloneState

        case "NavMenuExtend":
            cloneState.navMenoExtended = action.content
            return cloneState

        case "prodData":
            cloneState.EventData = action.content


            // console.log(action.content)
            cloneState.subDivData = action.subDiv
            return cloneState

        case "divisionData":
            cloneState.divisionData = action.content
            return cloneState

        case "sliderData":
            cloneState.sliderData = action.content
            return cloneState

        case "searchData":
            cloneState.searchResults = action.content
            return cloneState

        case "buyBasket":
            console.log("reducer", { ...action.content, ...{ buyPrice: action.fee } })       
            cloneState.buyBasket.prodData.push({ ...action.content, ...{ buyPrice: action.fee } })
            cloneState.buyBasket.totalPrice += action.fee
            // console.log(cloneState.buyBasket.prodData)
            return cloneState

        case "delShop":

            const buyPrice = cloneState.buyBasket.prodData.filter(i => i.id == action.content)[0].buyPrice
            cloneState.buyBasket.totalPrice -= buyPrice
            cloneState.buyBasket.prodData = cloneState.buyBasket.prodData.filter(i => i.id != action.content)
            // console.log(action.content)
            // console.log(buyPrice)
            // console.log(cloneState.buyBasket)
            return cloneState

        case "shoppingCart":

            cloneState.shoppingCartStages = action.content
            return cloneState

        case "basketCookie":
            console.log("BuyBasketData", action.data)
            cloneState.buyBasket = action.data
            console.log("😁😁😁😁",cloneState.buyBasket)
            return cloneState

        case "searchPlaceSet":

            cloneState.searchPlaceOpen = true
            cloneState.searchPlaces = action.data
            return cloneState

        case "searchPlaceClear":

            cloneState.searchPlaceOpen = false
            cloneState.searchPlaces = []
            return cloneState

        case "setBuyFormData":

            cloneState.buyFormData = action.data
            return cloneState

        case "setPersonalBuyerData":

            cloneState.personalBuyerInfo = action.data
            return cloneState

        case "setDivDataWithImg":

            cloneState.divDataWithImg = action.data
            return cloneState

        case "NavSmallView":
            cloneState.navBarSmallView = action.bool
            return cloneState

        case "addToCartDicision":
            cloneState.AddToCartStages = action.data
            return cloneState

        case "setCityValue":
            cloneState.cityData = action.data
            return cloneState

        case "setLogInStatus":
            cloneState.isLoggedIn = action.bool
            return cloneState

        case "setAuthStatusOpen":
            cloneState.isAuthOpen = action.bool
            return cloneState

        case "setAuthStatusData":
            cloneState.authData = action.data
            return cloneState

        case "reduxualBarOpen":
            cloneState.reduxualMessageBarOpen = true
            cloneState.reduxualMessageBar1 = action.m1
            cloneState.reduxualMessageBar2 = action.m2
            cloneState.severity = action.m3
            return cloneState

        case "reduxualBarClose":
            cloneState.reduxualMessageBarOpen = false
            cloneState.reduxualMessageBar1 = null
            cloneState.reduxualMessageBar2 = null
            cloneState.severity = "success"
            return cloneState

        case "searchMenuStatus":
            cloneState.searchMenuOpen = action.content
            return cloneState


        case "clearBuyBasket_Full":
            cloneState.buyBasket = {
                totalPrice: 0,
                prodData: []
            }
            return cloneState

        case "setFirstPicData":
            const data = action.data
            cloneState.firstItemPic = data.imgUrl
            cloneState.firstItemDivision = data.division
            cloneState.firstItemSubDivision = data.suvDivision
            return cloneState

        case "setSecondPicData":
            cloneState.secondImageData = action.data
            return cloneState

        case "setThirdPicData":
            cloneState.thirdImageData = action.data
            return cloneState

        case "setArticles":
            cloneState.articleData = action.content
            return cloneState


        case "setLuxAlert":
            if (!action.content.open) {
                cloneState.luxOpen = false
                cloneState.luxTitle = null
                cloneState.luxContent = null
                cloneState.luxSeverity = null
                return cloneState
            }
            cloneState.luxOpen = true
            cloneState.luxTitle = action.content.title
            cloneState.luxContent = action.content.content
            cloneState.luxSeverity = action.content.severity
            return cloneState






        default:
            return state
    }

}

