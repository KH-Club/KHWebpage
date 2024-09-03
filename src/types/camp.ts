export type CampLocation = {
    province : string;
    latitude : number;
    longitude : number;
    schoolName : string;
}

export type CampDirector = {
    name : string;
    surname : string;
    nickname : string;
    faculty : string;
    imgSrc : string;
}

export type CampData = {
    campID : number;
    name : string;
    date : Date;
    location : CampLocation;
    director : CampDirector;
    isMainCamp : boolean;
}

// Note: use only before we have the real data
export type CampRawData = {
    campID: number
    name: string
    location: string
    director: string
    imgSrc: string
}