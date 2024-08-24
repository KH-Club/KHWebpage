export type CampLocation = {
    province : string;
    latitude : number;
    longitude : number;
    schoolName : string;
}

export type CampLeader = {
    name : string;
    surname : string;
    nickname : string;
    faculty : string;
    imgSrc : string;
}

export type CampData = {
    campID : number;
    campName : string;
    isMainCamp : boolean;
    campLocation : CampLocation;
    campLeader : CampLeader;
}