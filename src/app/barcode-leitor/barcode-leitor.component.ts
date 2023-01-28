import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CosmosBluesoftService } from '../servicos/cosmos-bluesoft.service';
import { Bluesoft } from '../bluesoft';

import { MatDialog } from '@angular/material/dialog';
import { BluesoftInfoComponent } from '../bluesoft-info/bluesoft-info.component';



@Component({
  selector: 'app-barcode-leitor',
  templateUrl: './barcode-leitor.component.html',
  styleUrls: ['./barcode-leitor.component.css']
})
export class BarcodeLeitorComponent implements OnInit {

  blueSoft: Bluesoft;

  constructor(
    private formBuild: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceBlueSoft: CosmosBluesoftService,
    private dialog: MatDialog,
  ) {
    this.blueSoft = new Bluesoft();
  }

  formulario: FormGroup | any;

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario() {
    this.formulario = this.formBuild.group({
      code_bar: ['', Validators.required]
    })
  }


  detalhesNcm() {
    if (this.qrResultString) {
      console.log("as");

      this.serviceBlueSoft
        .obterHtmlCosmosBluesoft(this.qrResultString)
        .subscribe(resposta => {
          this.blueSoft = resposta;
          this.abrirInfo();
        }
        )

    } else {
      this.snackBar.open("INFO", "O Código de Barras deve ser informado!", {
        duration: 2000
      });
    }
  }


  abrirInfo() {

    this.dialog.open(BluesoftInfoComponent, {
      width: '400px', height: '450px',
      data: this.blueSoft
    });

  }

  //////////////////////////////////////////////
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];


  hasDevices: boolean = false;
  hasPermission: boolean = false;

  qrResultString: string = '';

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  clearResult(): void {
    this.qrResultString = '';
  }


  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

}
