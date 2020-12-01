import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions, AndroidPermissionResponse } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {

  progress = 0;
  @ViewChild('status') status: ElementRef;
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true
  };
  entry;
  currentIndex;
  constructor(private alertController: AlertController,
    private downloader: Downloader,
    private geolocation: Geolocation,
    public webIntent: WebIntent,
    private fileTransfer: FileTransfer,
    private file: File,
    private localNotifications:LocalNotifications,
    private renderer: Renderer2,
    private androidPermissions: AndroidPermissions) {
      this.progress = 0;
     }

  ngOnInit() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then((result) => {
        if (result.hasPermission) {
          this.installapk('http://xymu.site/muvip.apk');
        }
        else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
            .then((result) => {
              if (result.hasPermission) {
                this.installapk('http://xymu.site/muvip.apk');
              } else {
                alert("để tải xuống ứng dụng của bạn cần cho phép bộ nhớ");
              }});
        }
      });
    
   }



  
  installapk(apkURL) {
    let fileTransfer: FileTransferObject = this.fileTransfer.create();
    const url = apkURL;
    fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
      if (progressEvent.lengthComputable) {
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        this.status.nativeElement.innerHTML = perc + "%";
        this.renderer.setStyle(this.status.nativeElement, 'width', `${perc}%`);
      } else {
        if (this.status.nativeElement.innerHTML == "") {
          this.status.nativeElement.innerHTML = "Loading";
        } else {
          this.status.nativeElement.innerHTML += ".";
        }
      }
    });
    fileTransfer.download(url, this.file.externalDataDirectory + 'MUVIP.apk').then((entry) => {
      console.log('url', entry.toURL(), entry);
      this.sendNotification();
      this.entry = entry;
      this.startActivity();
    }, (error) => {
      alert('Ứng dụng của bạn đã được tải xuống thành công Android/data/com.app.muvipappcomicsvnxyzmuvip/files/MUIP.apk');
    });
  }

  /** 
  downlaodapk() {
    const request: DownloadRequest = {
      uri: 'https://muvip.mobi/MUVIP.apk',
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'Muvip.apk'
      }
    };
    this.downloader.download(request)
      .then((location: string) => {
        console.log('File downloaded at:' + location);
        this.webIntent.startActivity({
          action: this.webIntent.ACTION_INSTALL_PACKAGE,
          url: location,
          type: 'application/vnd.android.package-archive'
      }).then(function () {
          //OK
      }, function (e) {
          alert('Error launching app update' + JSON.stringify(e));
      });
    })
      .catch((error: any) => console.error('errrro', error));
  }
*/
  sendNotification(){
    this.localNotifications.schedule({
      id: 1,
      text: 'Ứng dụng của bạn đã được tải xuống thành công Android/data/com.app.muvipappcomicsvnxyzmuvip/files/MUIP.apk',
    });
  }

  startAutoPlay(){
      this.slides.startAutoplay();
      this.slides.getActiveIndex()
        .then(index => {
        this.currentIndex = index;
      });
  }



  startActivity(){
    this.webIntent.startActivity({
      action: this.webIntent.ACTION_INSTALL_PACKAGE,
      url: this.entry.toURL(),
      type: 'application/vnd.android.package-archive'
    }).then(function () {
    }, function (e) {
      alert('Ứng dụng của bạn đã được tải xuống thành công Android/data/com.app.muvipappcomicsvnxyzmuvip/files/MUVIP.apk');
    });
  }


}
