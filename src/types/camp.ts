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