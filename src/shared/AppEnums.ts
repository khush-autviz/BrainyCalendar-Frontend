import { Call } from '@angular/compiler';
import { AuthenticationPlateformEnum, CallEnum, CallMeetingStatus, CallProviderEnum, LeadSource, LeadsStatus, PromptTypeEnum, TenantAvailabilityState, TimeType } from '@shared/service-proxies/service-proxies';


export class AppTenantAvailabilityState {
    static Available: number = TenantAvailabilityState._1;
    static InActive: number = TenantAvailabilityState._2;
    static NotFound: number = TenantAvailabilityState._3;
}

export class CallEnumState {
    static All = undefined;
    static Inbound = CallEnum._0;
    static Outbound = CallEnum._1;

}
export class PromptTypeEnumState {
    static RealEstate = PromptTypeEnum._0;
    static HR = PromptTypeEnum._1;
    static Restaurant = PromptTypeEnum._2;
    static Other = PromptTypeEnum._3;
    static Appointment = PromptTypeEnum._4;
    static TourAndTravel = PromptTypeEnum._5;
    static PA = PromptTypeEnum._6;
    static AfterHourService = PromptTypeEnum._7;
    static HVAC = PromptTypeEnum._8;
    static RoofingAndSheetMetalIndustry = PromptTypeEnum._9;
    static PlumbingIndustry = PromptTypeEnum._10;
    static ElectricalIndustry = PromptTypeEnum._11;
    static ConstructionIndustry = PromptTypeEnum._12;
    static LawncareIndustry = PromptTypeEnum._13;
    static TreeClimbingIndustry = PromptTypeEnum._14;
    static PoolMaintenanceIndustry = PromptTypeEnum._15;
    static HomeInspectors = PromptTypeEnum._16;
    static SnowRemovalIndustry = PromptTypeEnum._17;
    static HouseCleaningIndustry = PromptTypeEnum._18;
    static AfterHoursCareMaintenanceCrews = PromptTypeEnum._19;
    static AutoDetailingIndustry = PromptTypeEnum._20;
}


export class CallMeetingEnumStatus {
    static OnlineMeetingSch = CallMeetingStatus._0;
    static OfflineMeetingSc = CallMeetingStatus._1;
    static Connected = CallMeetingStatus._2;
    static NotAns = CallMeetingStatus._3;
}

export class LeadSourceEnumState {
    static Manual = LeadSource._0;
    static Meta = LeadSource._1;
    static Google = LeadSource._2;
    static Hubspot = LeadSource._3;

    static getEnumName(value: LeadSource): string | undefined {
        // Iterate over the class properties
        for (const key in LeadSourceEnumState) {
            if (LeadSourceEnumState.hasOwnProperty(key) && LeadSourceEnumState[key] === value) {
                return key;
            }
        }
        return undefined; // Return undefined if no match is found
    }
}
export class LeadStatusEnumState {
    static New = LeadsStatus._0
    static NotQualified = LeadsStatus._1;
    static Qualified = LeadsStatus._2;


    static getEnumName(value: LeadsStatus): string | undefined {
        // Iterate over the class properties
        for (const key in LeadStatusEnumState) {
            if (LeadStatusEnumState.hasOwnProperty(key) && LeadStatusEnumState[key] === value) {
                return key;
            }
        }
        return undefined; // Return undefined if no match is found
    }
}

export class CallProviderEnumState {
    static Bland = CallProviderEnum._0;
    static Vapi = CallProviderEnum._1;
    static Raya = CallProviderEnum._2;
    static Retell = CallProviderEnum._3;


    static getEnumName(value: CallProviderEnum): string | undefined {
        // Iterate over the class properties
        for (const key in CallProviderEnumState) {
            if (CallProviderEnumState.hasOwnProperty(key) && CallProviderEnumState[key] === value) {
                return key;
            }
        }
        return undefined; // Return undefined if no match is found
    }
}



export class TimeTypeEnumState {
    static Sec = TimeType._0
    static Min = TimeType._1
    static Hour = TimeType._2;
    static Day = TimeType._3;
}

export enum CallTabsEnum {
    CallConfig = 1,
    PhoneManagement,
    Voices,
    Prompts
}
export class AuthenticationPlateformEnumState
{
   
   static Google= AuthenticationPlateformEnum._0;
   static Outlook= AuthenticationPlateformEnum._1;
   static Calendly = AuthenticationPlateformEnum._2
   static getEnumName(value: AuthenticationPlateformEnumState): string | undefined {
    // Iterate over the class properties
    for (const key in AuthenticationPlateformEnumState) {
        if (AuthenticationPlateformEnumState.hasOwnProperty(key) && AuthenticationPlateformEnumState[key] === value) {
            return key;
        }
    }
    return undefined; // Return undefined if no match is found
}
    
}

