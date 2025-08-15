

const setLogoAction = (data) => {
    return {
        type: "Logo",
        content: data
    }
}

const setNavMenuState = (bool) => {
    // console.log("runs !!!!!!!!!")
    return {
        type: "NavMenu",
        content: bool
    }
}

const setNavMenuExtend = (bool) => {
    return {
        type: "NavMenuExtend",
        content: bool
    }
}

const setProdData = (listOfLists) => {

    var subDiv = []

    // console.log(listOfLists, ":::::::::::::::::::::::::")
    for (let i = 0; i < listOfLists; i++) {
        // console.log(listOfLists[i].subDivisions, ":::::::::::::::::::::::::")
        if (listOfLists[i].subDivisions != "None") {

            subDiv.push(listOfLists[i].subDivisions)
        }
    }

    return {
        type: "prodData",
        content: listOfLists,
        subDiv: listOfLists
    }
}

const setDivisionData = (listOfLists) => {
    return {
        type: "divisionData",
        content: listOfLists
    }
}

const setSliderData = (listOfLists) => {
    return {
        type: "sliderData",
        content: listOfLists
    }
}

const setSearchData = (listOfLists) => {
    return {
        type: "searchData",
        content: listOfLists
    }
}


const setBuyBasket = (listOfLists, price) => {
    return {
        type: "buyBasket",
        content: listOfLists,
        fee: price

    }
}

const setShoppingCartStages = (stages) => {
    return {
        type: "shoppingCart",
        content: stages
    }
}



const delFromShoppingCart = (id) => {
    return {
        type: "delShop",
        content: id
    }
}


const cookieToBasket = (data) => {
    return {
        type: "basketCookie",
        data: data
    }
}

const setSearchPlaceItems = (data) => {
    return {
        type: "searchPlaceSet",
        data: data
    }
}

const clearSearchPlaceItems = () => {
    return {
        type: "searchPlaceClear",
    }
}

const setBuyFormData = data => {
    return {
        type: "setBuyFormData",
        data: data
    }
}

const setPersonalBuyerData = data => {
    return {
        type: "setPersonalBuyerData",
        data: data
    }
}

const setDivDataWithImg = data => {
    return {
        type: "setDivDataWithImg",
        data: data
    }
}
const setNavSmallView = bool => {
    return {
        type: "NavSmallView",
        bool: bool
    }
}
const addToCartDicision = data => {
    return {
        type: "addToCartDicision",
        data: data
    }
}

const setCityValue = data => {
    return {
        type: "setCityValue",
        data: data
    }
}


const setLogInStatus = bool => {
    return {
        type: "setLogInStatus",
        bool: bool

    }
}
const setAuthStatusOpen = bool => {
    return {
        type: "setAuthStatusOpen",
        bool: bool

    }
}
const setAuthStatusData = data => {
    return {
        type: "setAuthStatusData",
        data: data

    }
}



const reduxualBarOpen = (m1, m2, m3 = "success") => {
    return {
        type: "reduxualBarOpen",
        m1: m1,
        m2: m2,
        m3: m3
    }
}
const reduxualBarClose = () => {
    return {
        type: "reduxualBarClose",


    }
}
const clearBuyBasket_Full = () => {
    return {
        type: "clearBuyBasket_Full",

    }
}

const setFirstPicData = data => {
    return {
        type: "setFirstPicData",
        data: data
    }
}

const setSecondPicData = data => {
    return {
        type: "setSecondPicData",
        data: data
    }
}
const setThirdPicData = data => {
    return {
        type: "setThirdPicData",
        data: data
    }

}

const setSearchComponentStatus = content => {
    return {
        type: "searchMenuStatus",
        content: content
    }
}

const setLuxAlert = content => {
    return {
        type: "setLuxAlert",
        content: content
    }
}

const setArticles = content => {
    return {
        type: "setArticles",
        content: content
    }
}



export {
    setArticles,
    setLuxAlert,
    setSearchComponentStatus,
    setThirdPicData,
    setSecondPicData,
    setFirstPicData,
    clearBuyBasket_Full,
    reduxualBarClose,
    reduxualBarOpen,
    setAuthStatusData,
    setAuthStatusOpen,
    setLogInStatus,
    setCityValue,
    addToCartDicision,
    setNavSmallView,
    setDivDataWithImg,
    setPersonalBuyerData,
    setLogoAction,
    setNavMenuState,
    setNavMenuExtend,
    setProdData,
    setDivisionData,
    setSliderData,
    setSearchData,
    setBuyBasket,
    setShoppingCartStages,
    delFromShoppingCart,
    cookieToBasket,
    setSearchPlaceItems,
    clearSearchPlaceItems,
    setBuyFormData
}