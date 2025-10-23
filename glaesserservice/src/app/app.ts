import { Component, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    FormsModule
  ],
  styleUrl: './app.css'
})
export class App {

  desc = signal('-');
  getraenk = signal('-');
  anzahl = signal('');
  absender = signal('');

  ticket = {
    beschreibung: "",
    absender: ""
  }

  sendData() {
    this.ticket.beschreibung = `${this.desc()}: ${this.getraenk()} x ${this.anzahl()}`;
    this.ticket.absender = this.absender();

    fetch("https://glaeserservice.moxxl.eu/api/createTicket.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.ticket)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Antwort:", data);
        if (data.success) {
          alert("Ticket erfolgreich gespeichert! ID: " + data.id);
        } else {
          alert("Fehler beim Speichern: " + (data.error || "unbekannt"));
        }
      })
      .catch(err => console.error(JSON.stringify(this.ticket) + "; Fehler:", err));
  }

}
