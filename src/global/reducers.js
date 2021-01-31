export const initialState = {
    countries: [],//all countries and datas 
    country: 'worldwide', //countryName
    countryData: [], //countryDatas
    caseType: 'cases',
    zoom: 2,
    latitude: 51.505,
    longtitude: -0.09,

}

export const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'set/countries':
            return {
                ...state,
                countries: action.countries
            };
        case 'set/country':
            return {
                ...state,
                country: action.country
            }
        case 'set/countryData':
            return {
                ...state,
                countryData: action.countryData
            }
        case 'set/CaseData':
            return {
                ...state,
                caseType: action.caseType
            }
        case 'set/zoom':
            return {
                ...state,
                zoom: action.zoom
            }
        case 'set/latitude':
            return {
                ...state,
                latitude: action.latitude
            }
        case 'set/longtitude':
            return {
                ...state,
                longtitude: action.longtitude
            }
        default:
            return {
                ...state
            }
    }
}