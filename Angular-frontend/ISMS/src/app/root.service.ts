import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RootService {

  needPageRefresh:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private https: HttpClient, private router: Router) { }

  postUserToRegistry(user: any) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.email + ':' + user.password) });
    console.log(user)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.https.post('https://localhost:8080/auth/saveUserToRegistry', user, { headers: headers });
  }


  UserLogin(user: any) {
    return this.https.post('https://localhost:8080/auth/authenticate', user, { withCredentials: true })
  }


  AdminLogin(user: any) {
    return this.https.post('https://localhost:8080/auth/authenticate', user, { withCredentials: true });
  }

  getAdminACK() {
    return this.https.get("https://localhost:8080/ISMS/AdminACK", { withCredentials: true });
  }

  getUserACK() {
    return this.https.get("https://localhost:8080/ISMS/UserACK", { withCredentials: true });
  }

  AdminAndUserLogout() {
    return this.https.post("https://localhost:8080/ISMS/logout", "");
  }

  LoggedInAdminProfile() {
    return this.https.get("https://localhost:8080/ISMS/adminProfile", { withCredentials: true });
  }

  LoggedInUserProfile(){
    return this.https.get("https://localhost:8080/ISMS/userProfile",{withCredentials:true})
  }

  deleteCookie() {
    return this.https.get("https://localhost:8080/ISMS/delete-cookie", { withCredentials: true });
  }

  getAllUserRegistrationRequests() {
    return this.https.get("https://localhost:8080/ISMS/getAllRequests", { withCredentials: true });
  }

  approveUserRegistrationRequest(element: any) {
    return this.https.post("https://localhost:8080/ISMS/AcceptUserRegistrationRequest", element, { withCredentials: true });
  }

  deleteUserRegistrationRequest(element: any) {
    return this.https.post("https://localhost:8080/ISMS/RejectUserRegistrationRequest", element, { withCredentials: true });
  }

  //upload document
  uploadDocument(formData: any) {
    const httpOptions = {
      withCredentials: true
    };
    return this.https.post('https://localhost:8080/ISMS/uploadDocument', formData, httpOptions);
  }

  getAllDocuments() {
    return this.https.get("https://localhost:8080/ISMS/AllMaterials", { withCredentials: true });
  }

  downloadDocument(element: any) {
    console.log(element.id);
    return this.https.post('https://localhost:8080/ISMS/downloadDocument', { id: element.id }, { withCredentials: true, responseType: 'blob' });
  }

  getDocuemnt(element: any) {
    return this.https.post("https://localhost:8080/ISMS/getDocument", { id: element.id }, { withCredentials: true });
  }

  deleteDocument(element: any) {
    return this.https.post("https://localhost:8080/ISMS/deleteDocument", { id: element.id }, { withCredentials: true })
  }

  getAllPeople() {
    return this.https.get("https://localhost:8080/ISMS/AllPeople", { withCredentials: true });
  }

  saveAnnouncement(announcementObjs: any) {
    return this.https.post("https://localhost:8080/ISMS/MakeAnnouncement", announcementObjs, { withCredentials: true });
  }

  getAllAnnouncements() {
    return this.https.get("https://localhost:8080/ISMS/AllAnnouncements", { withCredentials: true });
  }

  actuatorHttpExchanges() {
    return this.https.get("https://localhost:8080/actuator/httpexchanges", { withCredentials: true });
  }

  actuatorHealth() {
    return this.https.get("https://localhost:8080/actuator/health", { withCredentials: true });
  }

  // profile tab -- admin-dashboard
  saveUserDetails(data: any) {
    return this.https.post("https://localhost:8080/ISMS/saveUserDetails", data, { withCredentials: true })
  }

  pendingMaterialApprovalRequests(){
    return this.https.get("https://localhost:8080/ISMS/pendingMaterialApprovalRequests", {withCredentials:true})
  }

  approvedMaterialApprovedRequests(){
    return this.https.get("https://localhost:8080/ISMS/approvedMaterialApprovedRequests", {withCredentials:true})
  }

  requestToDownloadMaterial(){
    return this.https.get("https://localhost:8080/ISMS/requestToDownloadMaterial",{withCredentials:true})
  }

  isUserInDownloadApprovedList(){
    return this.https.get("https://localhost:8080/ISMS/isUserInDownloadApprovedList",{withCredentials:true})
  }

  isUserInDownloadApprovalWaitingList(){
    return this.https.get("https://localhost:8080/ISMS/isUserInDownloadApprovalWaitingList",{withCredentials:true})
  }

  approveDownloadMaterialRequest(element:any){
    return this.https.post("https://localhost:8080/ISMS/approveDownloadMaterialRequest",element,{withCredentials:true})
  }

  rejectDownloadMaterialRequest(element:any){
    return this.https.post("https://localhost:8080/ISMS/rejectDownloadMaterialRequest",element,{withCredentials:true})
  }

  getAnnouncements(){
    return this.https.get("https://localhost:8080/ISMS/Announcements",{withCredentials:true})
  }

  deleteUser(element:any){
    return this.https.post("https://localhost:8080/ISMS/deleteUser",element,{withCredentials:true})
  }

  deleteAnnouncement(element:any){
    return this.https.post("https://localhost:8080/ISMS/deleteAnnouncement",element,{withCredentials:true})
  }

}
