import { EventInfo } from 'src/models/EventInfo';
import {Image} from 'src/models/Image';
export class Invitation {
    _id?:string;
    bride?: string;
    groom?: string;
    brideFamily?: string;
    date?: string;
    groomFamily?: string;
    header?: string;
    invitationCode?: string;
    invitationText?: string;
    invitationTitle?: string;
    brideImage?: string;
    groomImage?: string;
    events?:Array<EventInfo>
    images?:Array<Image>;
    showInvitation?:boolean;
    showEvents?:boolean;
    showLcv?:boolean;
    constructor() {
    }
}