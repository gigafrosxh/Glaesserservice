import { Component, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    FormsModule
  ],
  styleUrl: './app.css'
})
export class App {

  titel = signal('');
  desc = signal('-');
  getraenk = signal('-');
  anzahl = signal('');
  absender = signal('');

  ticket = {
    titel: "",
    beschreibung: "",
    absender: ""
  }

  sendData() {
    this.ticket.titel = this.titel();
    this.ticket.beschreibung = this.desc() + ":" + this.getraenk() + "x" + this.anzahl();
    this.ticket.absender = this.absender();
    console.log(this.ticket);


    /*fetch("https://glaeserservice.moxxl.eu/insertTicket.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.ticket)
    })
      .then(res => res.json())
      .then(data => console.log("Antwort:", data))
      .catch(err => console.error("Fehler:", err));*/
  }
}
