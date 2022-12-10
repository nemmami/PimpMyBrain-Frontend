import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  connected: boolean = false;

  ngOnInit(): void {
    this.connected = this.token()
  }

 

  token() {
    if (localStorage.getItem("token") === null) {
      
      return false;
    } else return true;
  }
}