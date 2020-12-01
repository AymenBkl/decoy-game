import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ProgressComponent } from 'src/app/progress/progress.component';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {



  constructor(private alertController: AlertController,
              private downloader: Downloader,
              private geolocation: Geolocation,
              public webIntent: WebIntent,
              private fileTransfer: FileTransfer,
              private file: File,
              private modalCntrl: ModalController) { }

  ngOnInit() {
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Xác nhận!',
      message: 'Message <strong>Thông báo !Tải xuống & cài đặt trò chơi !! Huỷ bỏ - Xác nhận</strong>!!!',
      buttons: [
        {
          text: 'Huỷ bỏ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.presentModal();
          }
        }
      ]
    });

    await alert.present();
  }

 async presentModal(){
   
    const modal = await this.modalCntrl.create({
      component: ProgressComponent,
      backdropDismiss: false,
    });

    modal.onDidDismiss()
      .then(data => {
        console.log("dissmiss");
      });

    return modal.present();
   
  }


  
}
