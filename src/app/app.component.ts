import { Component } from '@angular/core';
import {Response} from '@angular/http';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serversService.getAppName();
 servers = [
   {
     name: 'TestServer',
     capacity: 10,
     id: this.generateId()
   },
   {
     name: 'LiveServer',
     capacity: 100,
     id: this.generateId()
   }
 ];
 onAddServer(name: string) {
   this.servers.push({
    name: name,
    capacity: 50,
    id: this.generateId()
   });
 }
 constructor(private serversService: ServerService) {}
 generateId() {
   return Math.round(Math.random()*10000);
 }
 onSaveServer() {
   this.serversService.storeServers(this.servers).subscribe(
     (response: Response) =>{console.log(response.json());},
     (err)=> {console.error(err);} 
  );
 }
 onGetServer() {
   this.serversService.getServers().subscribe(
     (response: Response) => {
      const data = response.json(); 
      console.log(data); },
     (error) => {console.log(error); }
   );
 }
 onGet() {
   this.serversService.getServersData().subscribe(
     (servers: any[]) => {this.servers = servers;
    console.log(servers);},
     (error) => { console.log(error);}
   );
 }
}
