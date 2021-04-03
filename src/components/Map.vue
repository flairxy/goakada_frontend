<template>
  <div>
    <div class="container">
      <b-card-group deck class="mb-3">
        <b-card border-variant="light">
          <h4 class="text-center">Parcel request</h4>
          <b-form action="">
            <button
              class="btn btn-sm btn-success"
              @click.prevent="getCurrentLocation($event)"
            >
              <i class="fa fa-location"></i> User current location
            </button>
            <p></p>

            <b-form-group id="input-group-2" label-for="input-2">
              <gmap-autocomplete
                placeholder="Pickup address"
                class="w-80 mr-4 form-control"
                :value="address"
                list="locations"
                style="background-color: rgb(170 169 167 / 16%)"
                @place_changed="updateLocation($event)"
              />
              <datalist id="locations" v-if="location_histories.length > 0">
                <option
                  v-for="location in location_histories"
                  :key="location.id"
                  :value="location.address"
                  @click="updateLocation($event)"
                ></option>
              </datalist>

              <p></p>
              <gmap-autocomplete
              list="locations"
                placeholder="Dropoff address"
                class="w-100 form-control mb-2"
                style="background-color: rgb(170 169 167 / 16%)"
                :value="destination"
                @place_changed="updateDestination($event)"
              />
            </b-form-group>
          </b-form>
        </b-card>
      </b-card-group>

      <gmap-map
        :center="center"
        :zoom="12"
        style="width: 100%; height: 500px"
        ref="map"
      >
        <gmap-marker
          :icon="{
            url: './icon.png',
          }"
          :label="{
            text: 'Your location',
          }"
          :position="position"
        ></gmap-marker>

        <gmap-marker
          :position="destinationPosition"
          :icon="{
            url: './icon.png',
          }"
          :label="{
            text: 'Dropoff',
          }"
        ></gmap-marker>

        <gmap-polyline
          :options="{ strokeColor: '#42db92', strokeWeight: '5' }"
          ,
          :path="paths"
        >
        </gmap-polyline>
      </gmap-map>

      <b-card-group deck class="mb-3">
        <b-card border-variant="light">
          <div class="row">
            <div class="col-6">
              <span class="font-w600">1500,000</span>
            </div>
            <div class="col-6">
              <span class="font-w600">3.3km | 24 mins</span>
            </div>
          </div>
          <div>
            <b-button variant="success" block>Enter Parcel Details</b-button>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { RepositoryFactory } from "../../api/ControllerFactory";
const locationsController = RepositoryFactory.get("LocationsController");
export default {
  data() {
    return {
      center: { lat: 1.33, lng: 103.75 },
      position: { lat: 6.48274, lng: 7.52673 },
      destinationPosition: undefined,
      radius: 50000,
      destination: "",
      address: "",
      paths: [],
      location_histories: [],
    };
  },
  methods: {
    init() {},
    updateLocation: function (place) {
      let center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.center = center;
      this.position = center;
      this.paths = [this.position, this.destinationPosition];
      this.address = place.formatted_address;
      this.storeLocation(this.address);
    },
    updateDestination: function (place) {
      let center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.destinationPosition = center;
      this.paths = [this.position, this.destinationPosition];
      this.destination = place.formatted_address;
      this.storeLocation(this.destination);
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          this.getStreetAddressFrom(lat, long);
          return;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyCtGLFytKf9w5FW9R1804pd6xUSjbs3nU4"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          let center = {
            lat: lat,
            lng: long,
          };
          this.center = center;
          this.position = center;

          let paths = this.paths;
          paths.shift();
          paths.push(center);
          this.address = data.results[0].formatted_address;
          this.storeLocation(this.address);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async storeLocation(address) {
      try {
        let data = {
          address: address,
        };
        let res = await locationsController.storeLocation(data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLocations() {
      try {
        let res = await locationsController.getLocations();
        console.log(res.data);
        this.location_histories = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchLocations();
  },
};
</script>
<style>
.font-w600 {
  font-weight: bolder;
}
</style>
