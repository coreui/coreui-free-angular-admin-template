import { Component } from '@angular/core';
import { InvitationService } from 'src/services/invitationService';
import { EventInfoService } from 'src/services/eventInfoService'
import { Invitation } from 'src/models/Invitation';
import { EventInfo } from 'src/models/EventInfo';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-invitation',
  templateUrl: './edit-invitation.component.html',
  styleUrls: ['./edit-invitation.component.scss']
})
export class EditInvitationComponent {
  invitation = new Invitation;
  events = new Array<EventInfo>();
  code = "";
  color = 'primary';
  // file: File ; 
  constructor(private invitationService: InvitationService, private route: ActivatedRoute, private eventInfoService: EventInfoService) {
    var code = "";

    this.route.params.subscribe((params) => {
      this.code = params["code"];
    });
    this.invitationService.GetSingle(this.code).subscribe(response => {
      this.invitation = response;
      code = this.invitation._id ? this.invitation._id : "";
      this.eventInfoService.GetAll(code).subscribe(response => {
        for (var i = 0; i < response.length; i++) {
          var eventInfo = new EventInfo();
          eventInfo.eventDate = response[i].eventDate;
          eventInfo.eventName = response[i].eventName;
          eventInfo.eventPlace = response[i].eventPlace;
          eventInfo.eventTime = response[i].eventTime;
          eventInfo.invitationCode = response[i].invitationCode;
          eventInfo.eventAddress = response[i].eventAddress;
          eventInfo._id = response[i]._id;
          this.events.push(eventInfo);
        }
      });
    });

  }
  guncelle(dtoInvitation: Invitation, eventsInfo: Array<EventInfo>) {
    dtoInvitation.events = this.events;
    this.invitationService.Update(dtoInvitation).subscribe(response => {
      this.invitation = response;
    });
    console.log(this.events);
    alert('güncellendi');
  }

  onBgImageChange(event:any) {
    const  file = event.target.files[0];
    console.log(file);
  }

  etkinlikEkle() {
    console.log(this.events);
    var dtoEvent = new EventInfo();
    dtoEvent._id = Math.floor(Math.random() * 1000);
    this.events.push(dtoEvent);
  }
  deleteEvent(dtoEvent: EventInfo) {
    this.events.forEach((value, index) => {
      if (value._id == dtoEvent._id) this.events.splice(index, 1);
    });
  }
}
