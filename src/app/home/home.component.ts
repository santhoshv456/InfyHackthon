import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { LocationService } from '../_services/location.service';
import { Payload } from '../_models/payload';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentId = 12345;

  schoolMsg: any = {};

  transMsg: any = {};

  homeMsg: any = {};

  schoolPostion = {
    lat: 18.768840,
    long: 84.413040
  };

  transformerPostion = {
    lat: 18.756701,
    long: 84.422302
  }

  homePostion = {
    lat: 18.731279,
    long: 84.355469
  }

  @ViewChild('map', { static: true }) public mapElement: any;

  map: google.maps.Map;

  marker: google.maps.Marker;


  constructor(private location: LocationService) {
  }


  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(20.5937, 78.9629),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.calculateDistance();
    this.findMe();
    interval(1000 * 30).subscribe(x => {
      this.calculateDistance();
    });
  }



  calculateDistance() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        let scohooldis = this.distance(this.schoolPostion.lat, this.schoolPostion.long, position.coords.latitude, position.coords.longitude, 'K');
        console.log("school:", scohooldis);
        this.schoolMsg.distance = scohooldis; this.schoolMsg.place = "school"; this.schoolMsg.studentId = this.studentId;
        console.log(this.schoolMsg);
        // this.location.sendDistance(this.schoolMsg);

        let transFormerDis = this.distance(this.transformerPostion.lat, this.transformerPostion.long, position.coords.latitude, position.coords.longitude, 'K');
        console.log("Tranfformer:", transFormerDis);
        this.transMsg.distance = transFormerDis; this.transMsg.place = "Transformer"; this.transMsg.studentId = this.studentId;
        console.log(this.transMsg);
        // this.location.sendDistance(this.transMsg);

        let homeDis = this.distance(this.homePostion.lat, this.homePostion.long, position.coords.latitude, position.coords.longitude, 'K');
        console.log("Home:", homeDis);
        this.homeMsg.distance = homeDis; this.homeMsg.place = "Home"; this.homeMsg.studentId = this.studentId;
        console.log(this.homeMsg);
        // this.location.sendDistance(this.homeMsg);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  showPosition(position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}
