import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditComponent } from "./components/edit/edit.component";
import { MyMessagesComponent } from "./components/my-messages/my-messages.component";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
    {
        path: '', component: ProfileComponent,
        children: [
            { path: '', redirectTo: 'edit', pathMatch: 'full' },
            { path: 'edit', component:  EditComponent },
            { path: 'my-messages', component: MyMessagesComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}