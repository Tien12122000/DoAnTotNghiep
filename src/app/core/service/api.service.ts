import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  subcrip=new Subscription();
  constructor(private httpclient:HttpClient, private route:Router) { }
  api=environment.host;
  post(url: string, body:any){
    let header=new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpclient.post(this.api+ url, body,{headers:header}).pipe(
      map((res)=>{
        return res
      })
    ).pipe(
      catchError((err)=>{
        return this.handleError(err);
      })
    )
  }
  get(url:string){
    let header= new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.httpclient.get(this.api+url,{headers:header}).pipe(
      map(res=>{
        return res;
      })
    ).pipe(
      catchError((err:Response)=>{
        return this.handleError(err);
      })
    )
  }
  put(url:string, body:any){
    let header= new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.httpclient.put(this.api+url,body,{headers:header}).pipe(
      map(res=>{
        return res;
      })
    )
    .pipe(
      catchError((err:Response)=>{
        return this.handleError(err);
      })
    )
  }
  delete(url:string, body:any){
    let header= new HttpHeaders({
      'Content-Type':'application/json',
      body:body
    })
    return this.httpclient.delete(this.api+url,body).pipe(
      map(res=>{
        return res;
      })
    )
    .pipe(
      catchError((err:Response)=>{

        return this.handleError(err);
      })
    )
  }
  handleError(err:any):Observable<never>{
    this.route.navigate(["/error"]);
    return observableThrowError(()=>{
      return err;
    })
  }
}
