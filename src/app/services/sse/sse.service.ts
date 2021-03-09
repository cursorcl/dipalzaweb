import { Injectable, NgZone } from "@angular/core"
import { Observable } from "rxjs"
import { SSEMessageModel, ISSEMessageModel } from './sse.message.model';
@Injectable({
  providedIn: "root",
})
export class SseService {
  eventSource: EventSource;
  constructor(private _zone: NgZone) {}

  getServerSentEvent(url: string): Observable<any> {
    return Observable.create((observer) => {
      this.eventSource = this.getEventSource(url)
      this.eventSource.onmessage = (event) => {
        this._zone.run(() => {
          let content: ISSEMessageModel = JSON.parse(event.data);
          const message = new  SSEMessageModel(content.type, content.code, content.title, content.description);
          observer.next(message)
        })
      }
      this.eventSource.onerror = (error) => {
        this._zone.run(() => {
          observer.error(error)
        })

        this.eventSource.onopen = () => {
          console.log("Connection to server opened.")
        }
      }
    })
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url)
  }

  public close() {
    if (this.eventSource === undefined) return;
    
    this.eventSource.close()
  }
}
