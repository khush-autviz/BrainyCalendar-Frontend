import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CallMeetingEnumStatus, PromptTypeEnumState } from '@shared/AppEnums';

@Injectable()
export class CommonService {
    private analysisDataTrigger = new BehaviorSubject<boolean>(false); 
    analysisDataTriggered$ = this.analysisDataTrigger.asObservable();
    private profilePictureSubject = new BehaviorSubject<string | null>(null);
  profilePicture$ = this.profilePictureSubject.asObservable(); 

    private apiUrl = 'https://restcountries.com/v3.1/all'; // API URL

    countries = [
        {
            "countryName": "Afghanistan",
            "phoneCode": "+93"
        },
        {
            "countryName": "Åland Islands",
            "phoneCode": "+35818"
        },
        {
            "countryName": "Albania",
            "phoneCode": "+355"
        },
        {
            "countryName": "Algeria",
            "phoneCode": "+213"
        },
        {
            "countryName": "American Samoa",
            "phoneCode": "+1684"
        },
        {
            "countryName": "Andorra",
            "phoneCode": "+376"
        },
        {
            "countryName": "Angola",
            "phoneCode": "+244"
        },
        {
            "countryName": "Anguilla",
            "phoneCode": "+1264"
        },
        {
            "countryName": "Antigua and Barbuda",
            "phoneCode": "+1268"
        },
        {
            "countryName": "Argentina",
            "phoneCode": "+54"
        },
        {
            "countryName": "Armenia",
            "phoneCode": "+374"
        },
        {
            "countryName": "Aruba",
            "phoneCode": "+297"
        },
        {
            "countryName": "Australia",
            "phoneCode": "+61"
        },
        {
            "countryName": "Austria",
            "phoneCode": "+43"
        },
        {
            "countryName": "Azerbaijan",
            "phoneCode": "+994"
        },
        {
            "countryName": "Bahamas",
            "phoneCode": "+1242"
        },
        {
            "countryName": "Bahrain",
            "phoneCode": "+973"
        },
        {
            "countryName": "Bangladesh",
            "phoneCode": "+880"
        },
        {
            "countryName": "Barbados",
            "phoneCode": "+1246"
        },
        {
            "countryName": "Belarus",
            "phoneCode": "+375"
        },
        {
            "countryName": "Belgium",
            "phoneCode": "+32"
        },
        {
            "countryName": "Belize",
            "phoneCode": "+501"
        },
        {
            "countryName": "Benin",
            "phoneCode": "+229"
        },
        {
            "countryName": "Bermuda",
            "phoneCode": "+1441"
        },
        {
            "countryName": "Bhutan",
            "phoneCode": "+975"
        },
        {
            "countryName": "Bolivia",
            "phoneCode": "+591"
        },
        {
            "countryName": "Bosnia and Herzegovina",
            "phoneCode": "+387"
        },
        {
            "countryName": "Botswana",
            "phoneCode": "+267"
        },        
        {
            "countryName": "Brazil",
            "phoneCode": "+55"
        },
        {
            "countryName": "British Indian Ocean Territory",
            "phoneCode": "+246"
        },
        {
            "countryName": "British Virgin Islands",
            "phoneCode": "+1284"
        },
        {
            "countryName": "Brunei",
            "phoneCode": "+673"
        },
        {
            "countryName": "Bulgaria",
            "phoneCode": "+359"
        },
        {
            "countryName": "Burkina Faso",
            "phoneCode": "+226"
        },
        {
            "countryName": "Burundi",
            "phoneCode": "+257"
        },
        {
            "countryName": "Cambodia",
            "phoneCode": "+855"
        },
        {
            "countryName": "Cameroon",
            "phoneCode": "+237"
        },
        {
            "countryName": "Canada",
            "phoneCode": "+1"
        },
        {
            "countryName": "Cape Verde",
            "phoneCode": "+238"
        },
        {
            "countryName": "Caribbean Netherlands",
            "phoneCode": "+599"
        },
        {
            "countryName": "Cayman Islands",
            "phoneCode": "+1345"
        },
        {
            "countryName": "Central African Republic",
            "phoneCode": "+236"
        },
        {
            "countryName": "Chad",
            "phoneCode": "+235"
        },
        {
            "countryName": "Chile",
            "phoneCode": "+56"
        },
        {
            "countryName": "China",
            "phoneCode": "+86"
        },
        {
            "countryName": "Christmas Island",
            "phoneCode": "+61"
        },
        {
            "countryName": "Cocos (Keeling) Islands",
            "phoneCode": "+61"
        },
        {
            "countryName": "Colombia",
            "phoneCode": "+57"
        },
        {
            "countryName": "Comoros",
            "phoneCode": "+269"
        },
        {
            "countryName": "Cook Islands",
            "phoneCode": "+682"
        },
        {
            "countryName": "Costa Rica",
            "phoneCode": "+506"
        },
        {
            "countryName": "Croatia",
            "phoneCode": "+385"
        },
        {
            "countryName": "Cuba",
            "phoneCode": "+53"
        },
        {
            "countryName": "Curaçao",
            "phoneCode": "+599"
        },
        {
            "countryName": "Cyprus",
            "phoneCode": "+357"
        },
        {
            "countryName": "Czechia",
            "phoneCode": "+420"
        },
        {
            "countryName": "Denmark",
            "phoneCode": "+45"
        },
        {
            "countryName": "Djibouti",
            "phoneCode": "+253"
        },
        {
            "countryName": "Dominica",
            "phoneCode": "+1767"
        },
        {
            "countryName": "Dominican Republic",
            "phoneCode": "+1809"
        },
        {
            "countryName": "DR Congo",
            "phoneCode": "+243"
        },
        {
            "countryName": "Ecuador",
            "phoneCode": "+593"
        },
        {
            "countryName": "Egypt",
            "phoneCode": "+20"
        },
        {
            "countryName": "El Salvador",
            "phoneCode": "+503"
        },
        {
            "countryName": "Equatorial Guinea",
            "phoneCode": "+240"
        },
        {
            "countryName": "Eritrea",
            "phoneCode": "+291"
        },
        {
            "countryName": "Estonia",
            "phoneCode": "+372"
        },
        {
            "countryName": "Eswatini",
            "phoneCode": "+268"
        },
        {
            "countryName": "Ethiopia",
            "phoneCode": "+251"
        },
        {
            "countryName": "Falkland Islands",
            "phoneCode": "+500"
        },
        {
            "countryName": "Faroe Islands",
            "phoneCode": "+298"
        },
        {
            "countryName": "Fiji",
            "phoneCode": "+679"
        },
        {
            "countryName": "Finland",
            "phoneCode": "+358"
        },
        {
            "countryName": "France",
            "phoneCode": "+33"
        },
        {
            "countryName": "French Guiana",
            "phoneCode": "+594"
        },
        {
            "countryName": "French Polynesia",
            "phoneCode": "+689"
        },
        {
            "countryName": "French Southern and Antarctic Lands",
            "phoneCode": "+262"
        },
        {
            "countryName": "Gabon",
            "phoneCode": "+241"
        },
        {
            "countryName": "Gambia",
            "phoneCode": "+220"
        },
        {
            "countryName": "Georgia",
            "phoneCode": "+995"
        },
        {
            "countryName": "Germany",
            "phoneCode": "+49"
        },
        {
            "countryName": "Ghana",
            "phoneCode": "+233"
        },
        {
            "countryName": "Gibraltar",
            "phoneCode": "+350"
        },
        {
            "countryName": "Greece",
            "phoneCode": "+30"
        },
        {
            "countryName": "Greenland",
            "phoneCode": "+299"
        },
        {
            "countryName": "Grenada",
            "phoneCode": "+1473"
        },
        {
            "countryName": "Guadeloupe",
            "phoneCode": "+590"
        },
        {
            "countryName": "Guam",
            "phoneCode": "+1671"
        },
        {
            "countryName": "Guatemala",
            "phoneCode": "+502"
        },
        {
            "countryName": "Guernsey",
            "phoneCode": "+44"
        },
        {
            "countryName": "Guinea",
            "phoneCode": "+224"
        },
        {
            "countryName": "Guinea-Bissau",
            "phoneCode": "+245"
        },
        {
            "countryName": "Guyana",
            "phoneCode": "+592"
        },
        {
            "countryName": "Haiti",
            "phoneCode": "+509"
        },
        {
            "countryName": "Honduras",
            "phoneCode": "+504"
        },
        {
            "countryName": "Hong Kong",
            "phoneCode": "+852"
        },
        {
            "countryName": "Hungary",
            "phoneCode": "+36"
        },
        {
            "countryName": "Iceland",
            "phoneCode": "+354"
        },
        {
            "countryName": "India",
            "phoneCode": "+91"
        },
        {
            "countryName": "Indonesia",
            "phoneCode": "+62"
        },
        {
            "countryName": "Iran",
            "phoneCode": "+98"
        },
        {
            "countryName": "Iraq",
            "phoneCode": "+964"
        },
        {
            "countryName": "Ireland",
            "phoneCode": "+353"
        },
        {
            "countryName": "Isle of Man",
            "phoneCode": "+44"
        },
        {
            "countryName": "Israel",
            "phoneCode": "+972"
        },
        {
            "countryName": "Italy",
            "phoneCode": "+39"
        },
        {
            "countryName": "Ivory Coast",
            "phoneCode": "+225"
        },
        {
            "countryName": "Jamaica",
            "phoneCode": "+1876"
        },
        {
            "countryName": "Japan",
            "phoneCode": "+81"
        },
        {
            "countryName": "United Kingdom",
            "phoneCode": "+44"
        },
        {
            "countryName": "Jordan",
            "phoneCode": "+962"
        },
        {
            "countryName": "Kazakhstan",
            "phoneCode": "+76"
        },
        {
            "countryName": "Kenya",
            "phoneCode": "+254"
        },
        {
            "countryName": "Kiribati",
            "phoneCode": "+686"
        },
        {
            "countryName": "Kosovo",
            "phoneCode": "+383"
        },
        {
            "countryName": "Kuwait",
            "phoneCode": "+965"
        },
        {
            "countryName": "Kyrgyzstan",
            "phoneCode": "+996"
        },
        {
            "countryName": "Laos",
            "phoneCode": "+856"
        },
        {
            "countryName": "Latvia",
            "phoneCode": "+371"
        },
        {
            "countryName": "Lebanon",
            "phoneCode": "+961"
        },
        {
            "countryName": "Lesotho",
            "phoneCode": "+266"
        },
        {
            "countryName": "Liberia",
            "phoneCode": "+231"
        },
        {
            "countryName": "Libya",
            "phoneCode": "+218"
        },
        {
            "countryName": "Liechtenstein",
            "phoneCode": "+423"
        },
        {
            "countryName": "Lithuania",
            "phoneCode": "+370"
        },
        {
            "countryName": "Luxembourg",
            "phoneCode": "+352"
        },
        {
            "countryName": "Macau",
            "phoneCode": "+853"
        },
        {
            "countryName": "Madagascar",
            "phoneCode": "+261"
        },
        {
            "countryName": "Malawi",
            "phoneCode": "+265"
        },
        {
            "countryName": "Malaysia",
            "phoneCode": "+60"
        },
        {
            "countryName": "Maldives",
            "phoneCode": "+960"
        },
        {
            "countryName": "Mali",
            "phoneCode": "+223"
        },
        {
            "countryName": "Malta",
            "phoneCode": "+356"
        },
        {
            "countryName": "Marshall Islands",
            "phoneCode": "+692"
        },
        {
            "countryName": "Martinique",
            "phoneCode": "+596"
        },
        {
            "countryName": "Mauritania",
            "phoneCode": "+222"
        },
        {
            "countryName": "Mauritius",
            "phoneCode": "+230"
        },
        {
            "countryName": "Mayotte",
            "phoneCode": "+262"
        },
        {
            "countryName": "Mexico",
            "phoneCode": "+52"
        },
        {
            "countryName": "Micronesia",
            "phoneCode": "+691"
        },
        {
            "countryName": "Moldova",
            "phoneCode": "+373"
        },
        {
            "countryName": "Monaco",
            "phoneCode": "+377"
        },
        {
            "countryName": "Mongolia",
            "phoneCode": "+976"
        },
        {
            "countryName": "Montenegro",
            "phoneCode": "+382"
        },
        {
            "countryName": "Montserrat",
            "phoneCode": "+1664"
        },
        {
            "countryName": "Morocco",
            "phoneCode": "+212"
        },
        {
            "countryName": "Mozambique",
            "phoneCode": "+258"
        },
        {
            "countryName": "Myanmar",
            "phoneCode": "+95"
        },
        {
            "countryName": "Namibia",
            "phoneCode": "+264"
        },
        {
            "countryName": "Nauru",
            "phoneCode": "+674"
        },
        {
            "countryName": "Nepal",
            "phoneCode": "+977"
        },
        {
            "countryName": "Netherlands",
            "phoneCode": "+31"
        },
        {
            "countryName": "New Caledonia",
            "phoneCode": "+687"
        },
        {
            "countryName": "New Zealand",
            "phoneCode": "+64"
        },
        {
            "countryName": "Nicaragua",
            "phoneCode": "+505"
        },
        {
            "countryName": "Niger",
            "phoneCode": "+227"
        },
        {
            "countryName": "Nigeria",
            "phoneCode": "+234"
        },
        {
            "countryName": "Niue",
            "phoneCode": "+683"
        },
        {
            "countryName": "Norfolk Island",
            "phoneCode": "+672"
        },
        {
            "countryName": "North Korea",
            "phoneCode": "+850"
        },
        {
            "countryName": "North Macedonia",
            "phoneCode": "+389"
        },
        {
            "countryName": "Northern Mariana Islands",
            "phoneCode": "+1670"
        },
        {
            "countryName": "Norway",
            "phoneCode": "+47"
        },
        {
            "countryName": "Oman",
            "phoneCode": "+968"
        },
        {
            "countryName": "Pakistan",
            "phoneCode": "+92"
        },
        {
            "countryName": "Palau",
            "phoneCode": "+680"
        },
        {
            "countryName": "Palestine",
            "phoneCode": "+970"
        },
        {
            "countryName": "Panama",
            "phoneCode": "+507"
        },
        {
            "countryName": "Papua New Guinea",
            "phoneCode": "+675"
        },
        {
            "countryName": "Paraguay",
            "phoneCode": "+595"
        },
        {
            "countryName": "Peru",
            "phoneCode": "+51"
        },
        {
            "countryName": "Philippines",
            "phoneCode": "+63"
        },
        {
            "countryName": "Pitcairn Islands",
            "phoneCode": "+64"
        },
        {
            "countryName": "Poland",
            "phoneCode": "+48"
        },
        {
            "countryName": "Portugal",
            "phoneCode": "+351"
        },
        {
            "countryName": "Puerto Rico",
            "phoneCode": "+1787"
        },
        {
            "countryName": "Qatar",
            "phoneCode": "+974"
        },
        {
            "countryName": "Republic of the Congo",
            "phoneCode": "+242"
        },
        {
            "countryName": "Réunion",
            "phoneCode": "+262"
        },
        {
            "countryName": "Romania",
            "phoneCode": "+40"
        },
        {
            "countryName": "Russia",
            "phoneCode": "+73"
        },
        {
            "countryName": "Rwanda",
            "phoneCode": "+250"
        },
        {
            "countryName": "Saint Barthélemy",
            "phoneCode": "+590"
        },
        {
            "countryName": "Saint Helena, Ascension and Tristan da Cunha",
            "phoneCode": "+290"
        },
        {
            "countryName": "Saint Kitts and Nevis",
            "phoneCode": "+1869"
        },
        {
            "countryName": "Saint Lucia",
            "phoneCode": "+1758"
        },
        {
            "countryName": "Saint Martin",
            "phoneCode": "+590"
        },
        {
            "countryName": "Saint Pierre and Miquelon",
            "phoneCode": "+508"
        },
        {
            "countryName": "Saint Vincent and the Grenadines",
            "phoneCode": "+1784"
        },
        {
            "countryName": "Samoa",
            "phoneCode": "+685"
        },
        {
            "countryName": "San Marino",
            "phoneCode": "+378"
        },
        {
            "countryName": "São Tomé and Príncipe",
            "phoneCode": "+239"
        },
        {
            "countryName": "Saudi Arabia",
            "phoneCode": "+966"
        },
        {
            "countryName": "Senegal",
            "phoneCode": "+221"
        },
        {
            "countryName": "Serbia",
            "phoneCode": "+381"
        },
        {
            "countryName": "Seychelles",
            "phoneCode": "+248"
        },
        {
            "countryName": "Sierra Leone",
            "phoneCode": "+232"
        },
        {
            "countryName": "Singapore",
            "phoneCode": "+65"
        },
        {
            "countryName": "Sint Maarten",
            "phoneCode": "+1721"
        },
        {
            "countryName": "Slovakia",
            "phoneCode": "+421"
        },
        {
            "countryName": "Slovenia",
            "phoneCode": "+386"
        },
        {
            "countryName": "Solomon Islands",
            "phoneCode": "+677"
        },
        {
            "countryName": "Somalia",
            "phoneCode": "+252"
        },
        {
            "countryName": "South Africa",
            "phoneCode": "+27"
        },
        {
            "countryName": "South Georgia",
            "phoneCode": "+500"
        },
        {
            "countryName": "South Korea",
            "phoneCode": "+82"
        },
        {
            "countryName": "South Sudan",
            "phoneCode": "+211"
        },
        {
            "countryName": "Spain",
            "phoneCode": "+34"
        },
        {
            "countryName": "Sri Lanka",
            "phoneCode": "+94"
        },
        {
            "countryName": "Sudan",
            "phoneCode": "+249"
        },
        {
            "countryName": "Suriname",
            "phoneCode": "+597"
        },
        {
            "countryName": "Svalbard and Jan Mayen",
            "phoneCode": "+4779"
        },
        {
            "countryName": "Sweden",
            "phoneCode": "+46"
        },
        {
            "countryName": "Switzerland",
            "phoneCode": "+41"
        },
        {
            "countryName": "Syria",
            "phoneCode": "+963"
        },
        {
            "countryName": "Taiwan",
            "phoneCode": "+886"
        },
        {
            "countryName": "Tajikistan",
            "phoneCode": "+992"
        },
        {
            "countryName": "Tanzania",
            "phoneCode": "+255"
        },
        {
            "countryName": "Thailand",
            "phoneCode": "+66"
        },
        {
            "countryName": "Timor-Leste",
            "phoneCode": "+670"
        },
        {
            "countryName": "Togo",
            "phoneCode": "+228"
        },
        {
            "countryName": "Tokelau",
            "phoneCode": "+690"
        },
        {
            "countryName": "Tonga",
            "phoneCode": "+676"
        },
        {
            "countryName": "Trinidad and Tobago",
            "phoneCode": "+1868"
        },
        {
            "countryName": "Tunisia",
            "phoneCode": "+216"
        },
        {
            "countryName": "Turkey",
            "phoneCode": "+90"
        },
        {
            "countryName": "Turkmenistan",
            "phoneCode": "+993"
        },
        {
            "countryName": "Turks and Caicos Islands",
            "phoneCode": "+1649"
        },
        {
            "countryName": "Tuvalu",
            "phoneCode": "+688"
        },
        {
            "countryName": "Uganda",
            "phoneCode": "+256"
        },
        {
            "countryName": "Ukraine",
            "phoneCode": "+380"
        },
        {
            "countryName": "United Arab Emirates",
            "phoneCode": "+971"
        },
        {
            "countryName": "United Kingdom",
            "phoneCode": "+44"
        },
        {
            "countryName": "United States",
            "phoneCode": "+1"
        },
        {
            "countryName": "United States Minor Outlying Islands",
            "phoneCode": "+268"
        },
        {
            "countryName": "United States Virgin Islands",
            "phoneCode": "+1340"
        },
        {
            "countryName": "Uruguay",
            "phoneCode": "+598"
        },
        {
            "countryName": "Uzbekistan",
            "phoneCode": "+998"
        },
        {
            "countryName": "Vanuatu",
            "phoneCode": "+678"
        },
        {
            "countryName": "Vatican City",
            "phoneCode": "+379"
        },
        {
            "countryName": "Venezuela",
            "phoneCode": "+58"
        },
        {
            "countryName": "Vietnam",
            "phoneCode": "+84"
        },
        {
            "countryName": "Wallis and Futuna",
            "phoneCode": "+681"
        },
        {
            "countryName": "Western Sahara",
            "phoneCode": "+212//"
        },
        {
            "countryName": "Yemen",
            "phoneCode": "+967"
        },
        {
            "countryName": "Zambia",
            "phoneCode": "+260"
        },
        {
            "countryName": "Zimbabwe",
            "phoneCode": "+263"
        }
    ]

    public industries = [
        { Name: "Real Estate", Value: PromptTypeEnumState.RealEstate },
        { Name: "HR Screening Round", Value: PromptTypeEnumState.HR },
        { Name: "Restaurant", Value: PromptTypeEnumState.Restaurant },
        { Name: "Appointment", Value: PromptTypeEnumState.Appointment },
        { Name: "Tour and Travel", Value: PromptTypeEnumState.TourAndTravel },
        { Name: "Personal Assistance", Value: PromptTypeEnumState.PA },
        //{ Name: "Other", Value: PromptTypeEnumState.Other },
        { Name: "After Hour Service", Value: PromptTypeEnumState.AfterHourService },
        { Name: "HVAC (Heating, Ventilation, Air Conditioning & Cooling)", Value: PromptTypeEnumState.HVAC },
        { Name: "Roofing & Sheet Metal Industry", Value: PromptTypeEnumState.RoofingAndSheetMetalIndustry },
        { Name: "Plumbing Industry", Value: PromptTypeEnumState.PlumbingIndustry },
        { Name: "Electrical Industry", Value: PromptTypeEnumState.ElectricalIndustry },
        { Name: "Construction Industry", Value: PromptTypeEnumState.ConstructionIndustry },
        { Name: "Lawncare Industry", Value: PromptTypeEnumState.LawncareIndustry },
        { Name: "Tree-Climbing Industry", Value: PromptTypeEnumState.TreeClimbingIndustry },
        { Name: "Pool Maintenance Industry", Value: PromptTypeEnumState.PoolMaintenanceIndustry },
        { Name: "Home Inspectors", Value: PromptTypeEnumState.HomeInspectors },
        { Name: "Snow Removal Industry", Value: PromptTypeEnumState.SnowRemovalIndustry },
        { Name: "House Cleaning Industry", Value: PromptTypeEnumState.HouseCleaningIndustry },
        { Name: "After Hours Care Maintenance Crews", Value: PromptTypeEnumState.AfterHoursCareMaintenanceCrews },
        { Name: "Auto Detailing Industry", Value: PromptTypeEnumState.AutoDetailingIndustry }
    ];
    
    constructor(private http: HttpClient) {}

    /**
     * Fetch the list of countries.
     * @returns Observable of country data.
     */
    getCountries(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
    public getCallStatusName(callStatus){
        switch(callStatus){
            case CallMeetingEnumStatus.OfflineMeetingSc:
                return "Offline Meeting Schedule"
            case CallMeetingEnumStatus.OnlineMeetingSch:
                return "Online Meeting Schedule"
            case CallMeetingEnumStatus.Connected:
                return "Connected"
            case CallMeetingEnumStatus.NotAns:
                return "Not Answered"
        }
        return "-";

    }
    updateProfilePicture(profilePicture: string): void {
        this.profilePictureSubject.next(profilePicture); 
      }
    
    sendSignals(){
        this.analysisDataTrigger.next(true);
    }
    
    
}
